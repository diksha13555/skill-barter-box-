
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict, Tuple, Optional
import json


class SkillRecommender:
    """
    Recommender system for matching users based on skills they want to learn
    and skills they can teach.
    """
    
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            max_features=100,
            ngram_range=(1, 2),
            stop_words='english'
        )
        self.users_db = []
        self.skill_matrix = None
        self.user_ids = []
        
    def preprocess_skills(self, skills: List[str]) -> str:
        """Convert list of skills to a single string for vectorization"""
        return ' '.join([skill.lower().strip() for skill in skills])
    
    def add_user(self, user_data: Dict) -> bool:
        """
        Add a user to the recommendation system
        
        Input format:
        {
            "user_id": "unique_user_id",
            "name": "User Name",
            "skills_to_teach": ["Python", "Machine Learning", "Data Science"],
            "skills_to_learn": ["Web Development", "React", "Node.js"],
            "location": "New York, USA",
            "timezone": "EST",
            "availability": ["Monday 6-8PM", "Wednesday 7-9PM"]
        }
        
        Returns: True if successful, False otherwise
        """
        try:
            required_fields = ["user_id", "skills_to_teach", "skills_to_learn"]
            if not all(field in user_data for field in required_fields):
                return False
            
            self.users_db.append(user_data)
            self.user_ids.append(user_data["user_id"])
            return True
        except Exception as e:
            print(f"Error adding user: {e}")
            return False
    
    def build_skill_matrix(self):
        """Build TF-IDF matrix from user skills"""
        if len(self.users_db) == 0:
            return
        
        # Combine all skills into documents
        skill_documents = []
        for user in self.users_db:
            teach_skills = self.preprocess_skills(user["skills_to_teach"])
            learn_skills = self.preprocess_skills(user["skills_to_learn"])
            # Weight teaching skills more heavily
            combined = f"{teach_skills} {teach_skills} {learn_skills}"
            skill_documents.append(combined)
        
        self.skill_matrix = self.vectorizer.fit_transform(skill_documents)
    
    def find_matches(self, user_id: str, top_n: int = 5) -> List[Dict]:
        """
        Find top N matching users for skill exchange
        
        Input: user_id (string), top_n (int, default=5)
        
        Output format:
        [
            {
                "user_id": "matched_user_id",
                "name": "Matched User",
                "match_score": 0.85,
                "matching_skills": ["Python", "Machine Learning"],
                "can_teach_you": ["Python", "Machine Learning"],
                "can_learn_from_you": ["Web Development"],
                "location": "Boston, USA",
                "timezone": "EST"
            },
            ...
        ]
        """
        try:
            if user_id not in self.user_ids:
                return []
            
            # Rebuild matrix if needed
            if self.skill_matrix is None:
                self.build_skill_matrix()
            
            user_idx = self.user_ids.index(user_id)
            user_data = self.users_db[user_idx]
            
            # Calculate similarity scores
            user_vector = self.skill_matrix[user_idx]
            similarities = cosine_similarity(user_vector, self.skill_matrix)[0]
            
            # Get top matches (excluding self)
            similar_indices = np.argsort(similarities)[::-1][1:top_n+1]
            
            matches = []
            for idx in similar_indices:
                if similarities[idx] < 0.1:  # Minimum threshold
                    continue
                
                matched_user = self.users_db[idx]
                
                # Find overlapping skills
                can_teach_you = self._find_overlap(
                    matched_user["skills_to_teach"],
                    user_data["skills_to_learn"]
                )
                
                can_learn_from_you = self._find_overlap(
                    user_data["skills_to_teach"],
                    matched_user["skills_to_learn"]
                )
                
                matching_skills = list(set(can_teach_you + can_learn_from_you))
                
                if len(matching_skills) == 0:
                    continue
                
                match_result = {
                    "user_id": matched_user["user_id"],
                    "name": matched_user.get("name", "Anonymous"),
                    "match_score": float(similarities[idx]),
                    "matching_skills": matching_skills,
                    "can_teach_you": can_teach_you,
                    "can_learn_from_you": can_learn_from_you,
                    "location": matched_user.get("location", "Not specified"),
                    "timezone": matched_user.get("timezone", "Not specified")
                }
                
                matches.append(match_result)
            
            return matches
            
        except Exception as e:
            print(f"Error finding matches: {e}")
            return []
    
    def _find_overlap(self, list1: List[str], list2: List[str]) -> List[str]:
        """Find overlapping skills between two lists (case-insensitive)"""
        list1_lower = [s.lower().strip() for s in list1]
        list2_lower = [s.lower().strip() for s in list2]
        
        overlap = []
        for skill in list1:
            if skill.lower().strip() in list2_lower:
                overlap.append(skill)
        
        return overlap
    
    def get_skill_suggestions(self, partial_skill: str, top_n: int = 5) -> List[str]:
        """
        Suggest skills based on partial input (autocomplete feature)
        
        Input: partial_skill (string), top_n (int)
        Output: List of suggested skill strings
        """
        all_skills = set()
        for user in self.users_db:
            all_skills.update([s.lower() for s in user["skills_to_teach"]])
            all_skills.update([s.lower() for s in user["skills_to_learn"]])
        
        partial_lower = partial_skill.lower()
        suggestions = [s for s in all_skills if partial_lower in s]
        
        return sorted(suggestions)[:top_n]
    
    def get_popular_skills(self, top_n: int = 10) -> List[Tuple[str, int]]:
        """
        Get most popular skills in the platform
        
        Output: List of (skill_name, count) tuples
        """
        skill_counts = {}
        for user in self.users_db:
            for skill in user["skills_to_teach"] + user["skills_to_learn"]:
                skill_lower = skill.lower().strip()
                skill_counts[skill_lower] = skill_counts.get(skill_lower, 0) + 1
        
        sorted_skills = sorted(skill_counts.items(), key=lambda x: x[1], reverse=True)
        return sorted_skills[:top_n]


# Example usage and testing
if __name__ == "__main__":
    # Initialize recommender
    recommender = SkillRecommender()
    
    # Sample users
    users = [
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
    
    # Add users
    for user in users:
        recommender.add_user(user)
    
    # Build skill matrix
    recommender.build_skill_matrix()
    
    # Find matches for Alice
    print("=== Matches for Alice (user001) ===")
    matches = recommender.find_matches("user001", top_n=3)
    print(json.dumps(matches, indent=2))
    
    # Get popular skills
    print("\n=== Popular Skills ===")
    popular = recommender.get_popular_skills(top_n=5)
    for skill, count in popular:
        print(f"{skill}: {count} users")