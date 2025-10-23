from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import SkillBarterChatbot

app = Flask(__name__)
CORS(app)  # enable for frontend requests

# Initialize chatbot (set to True if using OpenAI)
bot = SkillBarterChatbot(use_openai=True)

@app.route("/")
def home():
    return jsonify({"message": "SkillBarterBox Chatbot API is running!"})

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        message = data.get("message", "")
        user_context = data.get("context", {})

        response = bot.chat(message, user_context)
        return jsonify(response)

    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": "Something went wrong"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
