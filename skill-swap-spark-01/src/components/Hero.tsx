import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero.jpg';

interface HeroProps {
  onJoinClick: () => void;
  onExploreClick: () => void;
}

const Hero = ({ onJoinClick, onExploreClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-purple-dark/80 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Learn and Exchange</span>
            <br />
            <span className="text-neon-orange">Skills Freely</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A community-driven space to exchange creativity and knowledge. 
            Connect with learners worldwide and grow together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onJoinClick}
              size="lg"
              className="bg-neon-orange hover:bg-neon-orange/90 text-purple-dark font-bold text-lg px-8 py-6 glow-orange hover-glow"
            >
              Join Now - It's Free
            </Button>
            
            <Button
              onClick={onExploreClick}
              size="lg"
              variant="outline"
              className="border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-purple-dark font-semibold text-lg px-8 py-6 transition-all"
            >
              Explore Skills
            </Button>
          </div>

          
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;