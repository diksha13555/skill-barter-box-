# 1️⃣ Import libraries
import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

# 2️⃣ Import AI modules (dummy or real from Member 2)
from recommender import recommend_skills
from chatbot import get_response

# 3️⃣ Create Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# 4️⃣ Home route (just to check server is running)
@app.route('/')
def home():
    return "Skill Barter Backend Running"

# 5️⃣ Skill Recommendation Route
@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_skills = data.get('skills', [])
    result = recommend_skills(user_skills)  # call function from recommender.py
    return jsonify(result)

# 6️⃣ Chatbot Route
@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    reply = get_response(message)  # call function from chatbot.py
    return jsonify({'reply': reply})

# 7️⃣ Contact/Feedback Route with SQLite (POST)
@app.route('/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name', '')
    email = data.get('email', '')
    message = data.get('message', '')

    # Save to SQLite
    conn = sqlite3.connect('feedback.db')
    c = conn.cursor()
    c.execute('INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)',
              (name, email, message))
    conn.commit()
    conn.close()

    return jsonify({'status': 'success', 'message': 'Feedback submitted successfully!'})

# 8️⃣ Fetch all feedback (GET)
@app.route('/feedback', methods=['GET'])
def get_feedback():
    conn = sqlite3.connect('feedback.db')
    c = conn.cursor()
    c.execute('SELECT id, name, email, message, timestamp FROM feedback ORDER BY id DESC')
    rows = c.fetchall()
    conn.close()

    feedback_list = []
    for row in rows:
        feedback_list.append({
            "id": row[0],
            "name": row[1],
            "email": row[2],
            "message": row[3],
            "timestamp": row[4]
        })

    return jsonify(feedback_list)

# 9️⃣ Initialize SQLite database
def init_db():
    conn = sqlite3.connect('feedback.db')
    c = conn.cursor()
    c.execute('''
    CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    conn.commit()
    conn.close()

# 10️⃣ Run the app
if __name__ == '__main__':
    init_db()  # create database and table if not exists
    app.run(debug=True, port=5001)  # Changed port to avoid conflicts
