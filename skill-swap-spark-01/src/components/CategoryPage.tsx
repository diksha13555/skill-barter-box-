import { useParams, Link } from 'react-router-dom';
import { User, MessageCircle } from 'lucide-react';

// --- MOCK USER DATABASE ---
// In a real app, you would fetch this from your backend
const MOCK_USERS = [
  { id: 1, name: 'Alice', skills: ['Music', 'Programming'] },
  { id: 2, name: 'Bandru', skills: ['Dance', 'Computers'] },
  { id: 3, name: 'Charlie', skills: ['Art & Design', 'Music'] },
  { id: 4, name: 'David', skills: ['Programming', 'Computers'] },
  { id: 5, name: 'Eve', skills: ['Languages', 'Art & Design'] },
  { id: 6, name: 'Frank', skills: ['Music', 'Dance'] },
  { id: 7, name: 'Grace', skills: ['Programming'] },
  { id: 8, name: 'Heidi', skills: ['Art & Design'] },
  { id: 9, name: 'Ivan', skills: ['Computers', 'Languages'] },
  { id: 10, name: 'Judy', skills: ['Music'] },
];
// ----------------------------

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : 'Unknown';

  // Filter users who have the skill
  const usersWithSkill = MOCK_USERS.filter(user => 
    user.skills.includes(decodedCategoryName)
  );

  return (
    <div className="pt-28 pb-20 container mx-auto px-4 min-h-screen">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Find Learners for <span className="text-neon-orange">{decodedCategoryName}</span>
      </h2>
      <p className="text-xl text-muted-foreground mb-12">
        Connect with {usersWithSkill.length} fellow learners.
      </p>

      {usersWithSkill.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usersWithSkill.map(user => (
            <div 
              key={user.id} 
              className="glassmorphism p-6 rounded-xl flex flex-col justify-between"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-neon-orange/20 border-2 border-neon-orange/50 flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-neon-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.skills.join(', ')}</p>
                </div>
              </div>
              
              <Link to={`/chat/${user.name}`} className="w-full">
                <button
                  className="w-full bg-neon-orange hover:bg-neon-orange/90 text-purple-dark font-semibold py-2 px-4 rounded-lg glow-orange transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat with {user.name}
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-muted-foreground text-center">
          No learners found for this skill category yet.
        </p>
      )}
    </div>
  );
};

export default CategoryPage;