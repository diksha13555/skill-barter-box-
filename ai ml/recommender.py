from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import SkillBarterChatbot
from recommender import SkillRecommender

app = Flask(__name__)
CORS(app)

# Initialize both systems
chatbot = SkillBarterChatbot(use_openai=True)
recommender = SkillRecommender()

# Preload sample users (you can later load from DB)
sample_users = [
    {
        "user_id": "user001",
        "name": "Alice Johnson",
        "skills_to_teach": ["Python", "Machine Learning", "Data Science"],
        "skills_to_learn": ["Web Development", "React", "Node.js"],
        "location": "New York, USA",
        "timezone": "EST"
    },
    {
        "user_id": "user002",
        "name": "Bob Smith",
        "skills_to_teach": ["Web Development", "React", "JavaScript"],
        "skills_to_learn": ["Python", "Data Science", "SQL"],
        "location": "San Francisco, USA",
        "timezone": "PST"
    },
    {
        "user_id": "user003",
        "name": "Carol Williams",
        "skills_to_teach": ["Graphic Design", "Adobe Photoshop", "UI/UX"],
        "skills_to_learn": ["Python", "Machine Learning"],
        "location": "London, UK",
        "timezone": "GMT"
    }
]

for user in sample_users:
    recommender.add_user(user)
recommender.build_skill_matrix()


@app.route("/")
def home():
    return jsonify({"message": "SkillBarterBox API is running!"})


@app.route("/chat", methods=["POST"])
def chat():
    """Chatbot endpoint"""
    data = request.json
    message = data.get("message", "")
    user_context = data.get("context", {})
    response = chatbot.chat(message, user_context)
    return jsonify(response)


@app.route("/add_user", methods=["POST"])
def add_user():
    """Add a new user to the recommender"""
    data = request.json
    success = recommender.add_user(data)
    if success:
        recommender.build_skill_matrix()
        return jsonify({"status": "success", "message": "User added successfully"})
    else:
        return jsonify({"status": "error", "message": "Invalid user data"}), 400


@app.route("/find_matches/<user_id>", methods=["GET"])
def find_matches(user_id):
    """Find skill matches for a given user"""
    matches = recommender.find_matches(user_id)
    return jsonify(matches)


@app.route("/popular_skills", methods=["GET"])
def popular_skills():
    """Get the most popular skills"""
    popular = recommender.get_popular_skills(top_n=10)
    return jsonify(popular)


@app.route("/suggest_skills", methods=["GET"])
def suggest_skills():
    """Autocomplete for skill names"""
    partial = request.args.get("q", "")
    suggestions = recommender.get_skill_suggestions(partial)
    return jsonify(suggestions)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
