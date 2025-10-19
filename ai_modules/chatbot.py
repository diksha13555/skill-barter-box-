

import os
import json
from typing import Dict, List, Optional
import re
import random


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
        self.use_openai = use_openai
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.conversation_history = []
        
        if self.use_openai and self.api_key:
            try:
                import openai
                self.openai_client = openai.OpenAI(api_key=self.api_key)
                print("OpenAI API initialized successfully")
            except ImportError:
                print("OpenAI package not found. Install with: pip install openai")
                self.use_openai = False
            except Exception as e:
                print(f"Error initializing OpenAI: {e}")
                self.use_openai = False
        else:
            self.use_openai = False
        
        # MODIFIED: Expanded intent patterns for more questions
        self.intent_patterns = {
            "greeting": [r"hello", r"hi", r"hey", r"good morning", r"good evening"],
            "how_it_works": [r"how.*work", r"how.*use", r"how.*platform", r"explain"],
            "find_match": [r"find.*match", r"find.*user", r"search.*skill", r"looking for", r"connect with", "teach me"],
            "schedule": [r"schedule", r"book.*session", r"calendar", r"availability"],
            "skills": [r"what.*skill", r"which.*skill", r"skill.*offer", r"teach"],
            "pricing": [r"cost", r"price", r"fee", r"payment", r"free"],
            "safety": [r"safe", r"trust", r"verify", r"review", r"rating", r"report user"],
            "help": [r"help", r"support", r"assist", r"problem", r"issue"],
            # NEW: Added new intents for more comprehensive answers
            "profile_management": [r"profile", r"update my skill", r"change my info", r"my account"],
            "troubleshooting": [r"not working", r"can't find", r"match.*show up", r"error"],
            "farewell": [r"bye", r"goodbye", r"see you", r"quit"],
            "thanks": [r"thank you", r"thanks", r"appreciate it"],
        }
        
        # MODIFIED: Expanded responses, with placeholders for personalization
        self.responses = {
            "greeting": [
                "Hello {user_name}! Welcome to SkillBarterBox! 🎓 I'm here to help you. What's on your mind?",
                "Hi there, {user_name}! Ready to discover amazing skill exchange opportunities? How can I assist?",
            ],
            "how_it_works": [
                "SkillBarterBox is simple! 1. Create your profile with skills to teach/learn. 2. Our AI matches you with users. 3. Schedule sessions and start learning! No fees, just mutual growth.",
            ],
            "find_match": [
                "To find your perfect match, head to the 'Find Matches' page. Our AI will suggest users based on your skills to teach ({skills_to_teach}) and skills to learn ({skills_to_learn}).",
            ],
            "schedule": [
                "Scheduling is easy! Once connected, click 'Schedule Session' on a user's profile, pick a time that works for both, and it's added to your calendar. 📅",
            ],
            "skills": [
                "You can teach or learn anything! Popular skills include: 💻 Tech, 🎨 Creative, 🗣️ Languages, and 💼 Business. What are you interested in?",
            ],
            "pricing": [
                "SkillBarterBox is 100% FREE! 🎉 We believe in the power of community and skill exchange. You learn by teaching, and teach by learning. Everyone wins!",
            ],
            "safety": [
                "Your safety is our priority. We have a user verification system, ratings/reviews after each session, and a 'Report User' feature if you encounter any issues. 🛡️",
            ],
            "help": [
                "I'm here to help! You can ask me about finding matches, scheduling, managing your profile, or any other platform features. What do you need help with?",
            ],
            # NEW: Responses for the new intents
            "profile_management": [
                "You can update your skills, name, and other information in the 'My Profile' section. Would you like me to take you there?",
            ],
            "troubleshooting": [
                "I'm sorry to hear you're having trouble. Could you please describe the issue in more detail? You can also visit our Help Center or contact support for direct assistance.",
            ],
            "farewell": [
                "Goodbye! Happy learning, and feel free to reach out anytime.",
                "See you later! Come back soon to continue your skill exchange journey."
            ],
            "thanks": [
                "You're welcome! I'm here to help if you have any more questions.",
                "My pleasure! Is there anything else I can assist you with?"
            ],
            "default": [
                "I'm not sure I understand. Could you rephrase? I can help with finding matches, scheduling sessions, or managing your profile.",
            ],
        }
    
    def detect_intent(self, message: str) -> str:
        """Detect user intent from message using pattern matching"""
        message_lower = message.lower()
        
        for intent, patterns in self.intent_patterns.items():
            for pattern in patterns:
                if re.search(pattern, message_lower):
                    return intent
        
        return "default"
    
    # MODIFIED: Function now accepts user_context for personalization
    def get_rule_based_response(self, message: str, user_context: Optional[Dict]) -> str:
        """Generate response using rule-based system and personalize it"""
        intent = self.detect_intent(message)
        
        # Choose a random response template for the detected intent
        response_template = random.choice(self.responses.get(intent, self.responses["default"]))
        
        # Personalize the response using user_context
        if user_context:
            response = response_template.format(
                user_name=user_context.get("user_name", "there"),
                skills_to_teach=", ".join(user_context.get("skills_to_teach", ["any skill"])),
                skills_to_learn=", ".join(user_context.get("skills_to_learn", ["new skills"]))
            )
        else:
            # Fallback for when no context is provided
            response = response_template.format(
                user_name="there",
                skills_to_teach="your skills",
                skills_to_learn="new skills"
            )
            
        return response
    
    def get_openai_response(self, message: str) -> str:
        """Generate response using OpenAI API"""
        try:
            system_prompt = """You are a helpful assistant for SkillBarterBox, a skill exchange platform. 
            Key features: 100% free, AI-powered matching, community-driven learning.
            Be friendly, concise, and helpful."""

            self.conversation_history.append({"role": "user", "content": message})
            
            messages = [{"role": "system", "content": system_prompt}] + self.conversation_history[-10:]
            
            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=200,
                temperature=0.7
            )
            
            assistant_message = response.choices[0].message.content
            self.conversation_history.append({"role": "assistant", "content": assistant_message})
            return assistant_message
            
        except Exception as e:
            print(f"OpenAI API error: {e}. Falling back to rule-based response.")
            return self.get_rule_based_response(message, None) # Pass None for context on fallback
    
    def chat(self, message: str, user_context: Optional[Dict] = None) -> Dict:
        """
        Main chat function - processes user message and returns response
        """
        try:
            if self.use_openai and self.api_key:
                response_text = self.get_openai_response(message)
            else:
                # MODIFIED: Pass user_context to the rule-based function
                response_text = self.get_rule_based_response(message, user_context)
            
            intent = self.detect_intent(message)
            suggestions = self._generate_suggestions(intent, user_context)
            action = self._get_action_button(intent)
            
            return {
                "response": response_text,
                "intent": intent,
                "suggestions": suggestions,
                "action": action
            }
            
        except Exception as e:
            print(f"Chat error: {e}")
            return {
                "response": "I'm having trouble right now. Please try again or contact support.",
                "intent": "error",
                "suggestions": [],
                "action": None
            }
    
    def _generate_suggestions(self, intent: str, user_context: Optional[Dict]) -> List[str]:
        """Generate follow-up suggestions based on intent"""
        suggestion_map = {
            "greeting": ["How does SkillBarterBox work?", "Help me find matches", "What skills can I learn?"],
            "how_it_works": ["Find my matches", "Is it really free?", "How do I update my profile?"],
            "find_match": ["How do I schedule a session?", "Tell me about safety.", "View my profile"],
            "schedule": ["How do calendar reminders work?", "Can I reschedule?", "Contact Support"],
            "skills": ["Find matches for my skills", "Add new skills to my profile", "See popular skills"],
            "pricing": ["How do you ensure safety?", "Start learning now", "Find matches"],
            # NEW: Suggestions for new intents
            "profile_management": ["Find matches", "How does scheduling work?", "Is it safe?"],
            "thanks": ["How does this work?", "Find me a match", "Tell me about safety"],
        }
        
        return suggestion_map.get(intent, ["How can you help?", "Main menu"])
    
    def _get_action_button(self, intent: str) -> Optional[str]:
        """Return action button based on intent"""
        action_map = {
            "find_match": "Find Matches",
            "schedule": "View Calendar",
            "skills": "Edit Profile",
            "help": "Contact Support",
            # NEW: Actions for new intents
            "profile_management": "Go to Profile",
            "safety": "Read Safety Guidelines"
        }
        
        return action_map.get(intent)
    
    def reset_conversation(self):
        """Clear conversation history"""
        self.conversation_history = []


# Example usage and testing
if __name__ == "__main__":
    print("=== SkillBarterBox Chatbot Test ===\n")
    
    bot = SkillBarterChatbot(use_openai=False)
    
    # NEW: Define a sample user context for personalized responses
    sample_context = {
        "user_id": "user123",
        "user_name": "Alex",
        "skills_to_teach": ["Python", "Guitar"],
        "skills_to_learn": ["React", "Photography"]
    }
    
    # MODIFIED: Expanded test messages to check new functionality
    test_messages = [
        "Hi there!",
        "How do I find a match?",
        "How do I update my skills?",
        "Is it safe to report a user?",
        "That's not working for me",
        "thanks so much",
        "bye",
    ]
    
    for msg in test_messages:
        print(f"User: {msg}")
        # MODIFIED: Pass the context to the chat function
        response = bot.chat(msg, user_context=sample_context)
        print(f"Bot: {response['response']}")
        print(f"Intent: {response['intent']}")
        if response['suggestions']:
            print(f"Suggestions: {', '.join(response['suggestions'])}")
        if response['action']:
            print(f"Action: [{response['action']}]")
        print("-" * 50)