
import os
import json
from typing import Dict, List, Optional
import re
import random
from openai import OpenAI


class SkillBarterChatbot:
    """
    Chatbot assistant for SkillBarterBox platform
    Supports both OpenAI API and rule-based fallback responses
    """

    def __init__(self, use_openai: bool = False, api_key: Optional[str] = None):
        """
        Initialize chatbot
        
        Args:
            use_openai: Whether to use OpenAI API (requires API key)
            api_key: OpenAI API key (optional, can use env variable)
        """
        
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        


       
        self.use_openai = use_openai and self.api_key is not None
        self.conversation_history = []

        
        if self.use_openai:
            try:
                self.openai_client = OpenAI(api_key=self.api_key)
                print(" OpenAI API initialized successfully!")
            except Exception as e:
                print(f" Error initializing OpenAI: {e}")
                self.use_openai = False
        else:
            print("Running in rule-based mode (OpenAI disabled).")

        # Intent patterns (unchanged)
        self.intent_patterns = {
            "greeting": [r"hello", r"hi", r"hey", r"good morning", r"good evening"],
            "how_it_works": [r"how.*work", r"how.*use", r"how.*platform", r"explain"],
            "find_match": [r"find.*match", r"find.*user", r"search.*skill", r"looking for", r"connect with", "teach me"],
            "schedule": [r"schedule", r"book.*session", r"calendar", r"availability"],
            "skills": [r"what.*skill", r"which.*skill", r"skill.*offer", r"teach"],
            "pricing": [r"cost", r"price", r"fee", r"payment", r"free"],
            "safety": [r"safe", r"trust", r"verify", r"review", r"rating", r"report user"],
            "help": [r"help", r"support", r"assist", r"problem", r"issue"],
            "profile_management": [r"profile", r"update my skill", r"change my info", r"my account"],
            "troubleshooting": [r"not working", r"can't find", r"match.*show up", r"error"],
            "farewell": [r"bye", r"goodbye", r"see you", r"quit"],
            "thanks": [r"thank you", r"thanks", r"appreciate it"],
        }

        self.responses = {
            "greeting": [
                "Hello {user_name}! Welcome to SkillBarterBox! What would you like to do today?",
                "Hi {user_name}!  Ready to exchange skills? How can I help?",
            ],
            "how_it_works": [
                "SkillBarterBox is simple! Create your profile with skills to teach/learn, and our AI matches you with the perfect partner. 100% free, no payment needed! 🎓",
            ],
            "find_match": [
                "You can find skill partners based on your teaching skills ({skills_to_teach}) and learning goals ({skills_to_learn}).",
            ],
            "schedule": [
                "Scheduling is easy! After finding a match, click 'Schedule Session' and pick your preferred time. 🕓",
            ],
            "skills": [
                "You can exchange any skill! Popular ones include coding, design, music, and languages. What’s your favorite?",
            ],
            "pricing": [
                "SkillBarterBox is completely free! 💸 No fees — it’s all about sharing and learning together.",
            ],
            "safety": [
                "Your safety matters. We verify users and allow you to report or review others for transparency. ",
            ],
            "help": [
                "I'm here to assist! You can ask about matches, scheduling, profiles, or safety guidelines.",
            ],
            "profile_management": [
                "You can update your skills and details in the 'My Profile' section. Would you like to open it?",
            ],
            "troubleshooting": [
                "Sorry you're having trouble! Could you describe the issue more? I can guide you or connect you with support.",
            ],
            "farewell": [
                "Goodbye!  Keep learning and teaching on SkillBarterBox!",
                "See you soon!  Keep growing your skills!",
            ],
            "thanks": [
                "You're most welcome! Anything else I can help with?",
            ],
            "default": [
                "I didn’t quite get that. Can you rephrase? I can help with matches, scheduling, or your profile.",
            ],
        }

    def detect_intent(self, message: str) -> str:
        message_lower = message.lower()
        for intent, patterns in self.intent_patterns.items():
            for pattern in patterns:
                if re.search(pattern, message_lower):
                    return intent
        return "default"

    def get_rule_based_response(self, message: str, user_context: Optional[Dict]) -> str:
        intent = self.detect_intent(message)
        response_template = random.choice(self.responses.get(intent, self.responses["default"]))

        if user_context:
            return response_template.format(
                user_name=user_context.get("user_name", "there"),
                skills_to_teach=", ".join(user_context.get("skills_to_teach", ["any skill"])),
                skills_to_learn=", ".join(user_context.get("skills_to_learn", ["new skills"]))
            )
        else:
            return response_template.format(user_name="there", skills_to_teach="your skills", skills_to_learn="new skills")

    def get_openai_response(self, message: str) -> str:
        """Generate response using OpenAI API"""
        try:
            system_prompt = (
                "You are SkillBarterBox's assistant. "
                "You help users find skill matches, manage profiles, and understand the platform. "
                "Be friendly, brief, and clear."
            )

            self.conversation_history.append({"role": "user", "content": message})
            messages = [{"role": "system", "content": system_prompt}] + self.conversation_history[-10:]

            response = self.openai_client.chat.completions.create(
                model="gpt-4o-mini",  
                messages=messages,
                max_tokens=200,
                temperature=0.7,
            )

            reply = response.choices[0].message.content
            self.conversation_history.append({"role": "assistant", "content": reply})
            return reply

        except Exception as e:
            print(f" OpenAI API error: {e}. Falling back to rule-based response.")
            return self.get_rule_based_response(message, None)

    def chat(self, message: str, user_context: Optional[Dict] = None) -> Dict:
        try:
            if self.use_openai:
                response_text = self.get_openai_response(message)
            else:
                response_text = self.get_rule_based_response(message, user_context)

            intent = self.detect_intent(message)
            suggestions = self._generate_suggestions(intent)
            action = self._get_action_button(intent)

            return {
                "response": response_text,
                "intent": intent,
                "suggestions": suggestions,
                "action": action,
            }

        except Exception as e:
            print(f"Chat error: {e}")
            return {
                "response": "I'm having trouble right now. Please try again later.",
                "intent": "error",
                "suggestions": [],
                "action": None,
            }

    def _generate_suggestions(self, intent: str) -> List[str]:
        suggestion_map = {
            "greeting": ["How does it work?", "Find me a match", "What can I learn?"],
            "how_it_works": ["Find my matches", "Is it free?", "Update profile"],
            "find_match": ["Schedule session", "Safety tips", "View profile"],
            "skills": ["Popular skills", "Add new skills", "See my matches"],
            "thanks": ["Find a match", "Learn more", "Exit"],
        }
        return suggestion_map.get(intent, ["Help", "Main menu"])

    def _get_action_button(self, intent: str) -> Optional[str]:
        action_map = {
            "find_match": "Find Matches",
            "schedule": "View Calendar",
            "skills": "Edit Profile",
            "help": "Contact Support",
            "profile_management": "Go to Profile",
        }
        return action_map.get(intent)

    def reset_conversation(self):
        self.conversation_history = []


if __name__ == "__main__":
    print("=== SkillBarterBox Chatbot (AI Mode) ===\n")


    bot = SkillBarterChatbot(use_openai=True)

    user_context = {
        "user_id": "user123",
        "user_name": "Alex",
        "skills_to_teach": ["Python", "Guitar"],
        "skills_to_learn": ["React", "Photography"],
    }

    test_messages = [
        "Hello!",
        "How does this platform work?",
        "Find me a match for Python",
        "Is it safe?",
        "Thanks!",
        "Bye!",
    ]

    for msg in test_messages:
        print(f"\n User: {msg}")
        response = bot.chat(msg, user_context)
        print(f"🤖 Bot: {response['response']}")
        print(f"Intent: {response['intent']}")
