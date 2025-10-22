from flask import Flask, request, jsonify, render_template_string
from recommender import SkillRecommender
from chatbot import SkillBarterChatbot
import os

app = Flask(__name__)

# Initialize AI modules
recommender = SkillRecommender()
chatbot = SkillBarterChatbot(use_openai=True)  # Set to True with API key

# Simple HTML interface for testing
HTML_TEMPLATE = '''
<!DOCTYPE html>
<html>
<head>
    <title>SkillBarterBox AI Test</title>
    <style>
        body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; }
        .section { margin: 30px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        button { padding: 10px 20px; margin: 5px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 5px; }
        button:hover { background: #0056b3; }
        .result { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px; }
        input, textarea { width: 100%; padding: 8px; margin: 5px 0; }
    </style>
</head>
<body>
    <h1>🎓 SkillBarterBox AI System Test</h1>
    
    <div class="section">
        <h2>1. Add Test Users</h2>
        <button onclick="addTestUsers()">Add Sample Users</button>
        <div id="addResult" class="result"></div>
    </div>
    
    <div class="section">
        <h2>2. Find Matches</h2>
        <input type="text" id="userId" placeholder="Enter user ID (e.g., user001)" value="user001">
        <button onclick="findMatches()">Find Matches</button>
        <div id="matchResult" class="result"></div>
    </div>
    
    <div class="section">
        <h2>3. Chat with AI</h2>
        <textarea id="chatMessage" rows="3" placeholder="Type your message...">How does SkillBarterBox work?</textarea>
        <button onclick="sendChat()">Send Message</button>
        <div id="chatResult" class="result"></div>
    </div>
    
    <div class="section">
        <h2>4. Popular Skills</h2>
        <button onclick="getPopularSkills()">Get Popular Skills</button>
        <div id="skillsResult" class="result"></div>
    </div>

    <script>
        async function addTestUsers() {
            const users = [
                {
                    user_id: "user001",
                    name: "Alice Johnson",
                    skills_to_teach: ["Python", "Machine Learning", "Data Science"],
                    skills_to_learn: ["Web Development", "React", "Node.js"],
                    location: "New York, USA",
                    timezone: "EST"
                },
                {
                    user_id: "user002",
                    name: "Bob Smith",
                    skills_to_teach: ["Web Development", "React", "JavaScript"],
                    skills_to_learn: ["Python", "Data Science", "SQL"],
                    location: "San Francisco, USA",
                    timezone: "PST"
                },
                {
                    user_id: "user003",
                    name: "Carol Williams",
                    skills_to_teach: ["Graphic Design", "Adobe Photoshop"],
                    skills_to_learn: ["Python", "Machine Learning"],
                    location: "London, UK",
                    timezone: "GMT"
                }
            ];
            
            let results = [];
            for (let user of users) {
                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(user)
                });
                const data = await response.json();
                results.push(`Added ${user.name}: ${data.status}`);
            }
            
            document.getElementById('addResult').innerHTML = results.join('<br>');
        }
        
        async function findMatches() {
            const userId = document.getElementById('userId').value;
            const response = await fetch(`/api/matches/${userId}`);
            const data = await response.json();
            
            let html = `<strong>Matches for ${userId}:</strong><br><br>`;
            data.matches.forEach(match => {
                html += `
                    <div style="border-left: 3px solid #007bff; padding-left: 10px; margin: 10px 0;">
                        <strong>${match.name}</strong> (Score: ${match.match_score.toFixed(2)})<br>
                        Can teach you: ${match.can_teach_you.join(', ')}<br>
                        Can learn from you: ${match.can_learn_from_you.join(', ')}<br>
                        Location: ${match.location}
                    </div>
                `;
            });
            
            document.getElementById('matchResult').innerHTML = html;
        }
        
        async function sendChat() {
            const message = document.getElementById('chatMessage').value;
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: message})
            });
            const data = await response.json();
            
            let html = `
                <strong>You:</strong> ${message}<br><br>
                <strong>Bot:</strong> ${data.response}<br><br>
                <strong>Intent:</strong> ${data.intent}<br>
                <strong>Suggestions:</strong> ${data.suggestions.join(', ')}
            `;
            
            document.getElementById('chatResult').innerHTML = html;
        }
        
        async function getPopularSkills() {
            const response = await fetch('/api/skills/popular');
            const data = await response.json();
            
            let html = '<strong>Top Skills:</strong><br><br>';
            data.skills.forEach((skill, index) => {
                html += `${index + 1}. ${skill.name} (${skill.count} users)<br>`;
            });
            
            document.getElementById('skillsResult').innerHTML = html;
        }
    </script>
</body>
</html>
'''

@app.route('/')
def home():
    return render_template_string(HTML_TEMPLATE)

# API Endpoints
@app.route('/api/users', methods=['POST'])
def create_user():
    user_data = request.json
    success = recommender.add_user(user_data)
    
    if success:
        recommender.build_skill_matrix()
        return jsonify({"status": "success", "message": "User added"}), 201
    return jsonify({"status": "error", "message": "Invalid user data"}), 400

@app.route('/api/matches/<user_id>', methods=['GET'])
def get_matches(user_id):
    top_n = request.args.get('top_n', 5, type=int)
    matches = recommender.find_matches(user_id, top_n)
    
    return jsonify({
        "status": "success",
        "user_id": user_id,
        "matches": matches,
        "count": len(matches)
    }), 200

@app.route('/api/skills/popular', methods=['GET'])
def get_popular_skills():
    top_n = request.args.get('top_n', 10, type=int)
    skills = recommender.get_popular_skills(top_n)
    
    return jsonify({
        "status": "success",
        "skills": [{"name": s[0], "count": s[1]} for s in skills]
    }), 200

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    user_context = data.get('user_context', None)
    
    response = chatbot.chat(message, user_context)
    return jsonify(response), 200

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 SkillBarterBox AI Server Starting...")
    print("="*60)
    print("\n📍 Open your browser and go to: http://localhost:5000")
    print("\n✅ Available endpoints:")
    print("   - GET  /                      (Test interface)")
    print("   - POST /api/users             (Add user)")
    print("   - GET  /api/matches/<user_id> (Find matches)")
    print("   - GET  /api/skills/popular    (Popular skills)")
    print("   - POST /api/chat              (Chat with bot)")
    print("\n" + "="*60 + "\n")
    
    app.run(debug=True, port=5000)