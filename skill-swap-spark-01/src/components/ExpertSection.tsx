// --- 1. IMPORT YOUR IMAGES HERE ---
import marquesImg from '@/assets/tech.jpg';
import simoneImg from '@/assets/computers.jpg'; 
import aaronImg from '@/assets/graphic.jpg';
import amelieImg from '@/assets/fashion.jpg';
import aliImg from '@/assets/programming.jpg';
import candiceImg from '@/assets/photography.jpg';

const experts = [
  { name: 'Marques Brownlee', skill: 'Tech Reviews & Content', image: marquesImg },
  { name: 'Simone Giertz', skill: 'Robotics & Making', image: simoneImg },
  { name: 'Aaron Draplin', skill: 'Graphic Design', image: aaronImg },
  { name: 'Amelie Solange', skill: 'Fashion Design', image: amelieImg },
  { name: 'Ali Abdaal', skill: 'Productivity & Business', image: aliImg },
  { name: 'Candice Baylor', skill: 'Photography', image: candiceImg }
];

const ExpertSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Learn from <span className="text-neon-orange">Skill Exchange Experts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with talented individuals ready to share their knowledge and learn from you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <div
              key={expert.name}
              className="group glassmorphism rounded-2xl overflow-hidden hover-glow cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{expert.name}</h3>
                <p className="text-neon-orange text-sm">{expert.skill}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertSection;