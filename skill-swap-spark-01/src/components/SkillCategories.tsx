import { Link } from 'react-router-dom'; // <-- 1. IMPORT Link
import musicImg from '@/assets/music.jpg';
import danceImg from '@/assets/dance.jpg';
import artImg from '@/assets/art.jpg';
import programmingImg from '@/assets/programming.jpg';
import computersImg from '@/assets/computers.jpg';
import languageImg from '@/assets/language.jpg';

const categories = [
  { name: 'Music', image: musicImg, learners: 2340 },
  { name: 'Dance', image: danceImg, learners: 1890 },
  { name: 'Art & Design', image: artImg, learners: 3120 },
  { name: 'Programming', image: programmingImg, learners: 4560 },
  { name: 'Computers', image: computersImg, learners: 2780 },
  { name: 'Languages', image: languageImg, learners: 3450 },
];

const SkillCategories = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore <span className="text-neon-orange">Inspiring Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Find your passion and connect with fellow learners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            // 2. WRAP THE CARD WITH A LINK
            <Link 
              to={`/category/${encodeURIComponent(category.name)}`} 
              key={category.name}
            >
              <div
                className="group relative overflow-hidden rounded-xl glassmorphism hover-glow h-full" // Removed cursor-pointer, added h-full
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-dark via-purple-dark/50 to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2 text-neon-orange">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-purple-dark bg-purple-medium flex items-center justify-center text-xs"
                        >
                          {i}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm">+{category.learners} learners</span>
                  </div>
                </div>
              </div>
            </Link> // <-- 3. CLOSE THE LINK
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillCategories;