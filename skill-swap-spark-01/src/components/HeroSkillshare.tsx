import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface HeroSkillshareProps {
  onJoinClick: () => void;
}

const HeroSkillshare = ({ onJoinClick }: HeroSkillshareProps) => {
  const benefits = [
    'Thousands of skill exchanges, Register free',
    'Taught by creative and expert learners',
    'Learning Paths to help you achieve your goals',
    'Get access to exclusive community'
  ];

  const stats = [
    { value: '7,000+', label: 'classes' },
    { value: '20k+', label: 'members' },
    { value: '500+', label: 'skills' },
    { value: '4.8★★★★★', label: '4,000+ reviews' }
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Skill Exchange</span>
              <br />
              <span className="text-neon-orange">Made Easy</span>
            </h1>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neon-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-purple-dark" />
                  </div>
                  <p className="text-lg text-foreground">{benefit}</p>
                </div>
              ))}
            </div>

            <Button
              onClick={onJoinClick}
              size="lg"
              className="bg-neon-orange hover:bg-neon-orange/90 text-purple-dark font-bold text-lg px-10 py-6 glow-orange hover-glow"
            >
              Start Learning for Free
            </Button>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="glassmorphism p-4 rounded-lg text-center">
                  <div className="font-bold text-neon-orange mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Featured Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="glassmorphism rounded-xl overflow-hidden hover-glow cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-purple-medium to-purple-dark p-6 flex items-center justify-center">
                  <span className="text-6xl">🎸</span>
                </div>
                <div className="p-4">
                  <div className="text-xs text-neon-orange mb-1">Music</div>
                  <h3 className="font-semibold text-sm">Guitar Basics</h3>
                </div>
              </div>
              <div className="glassmorphism rounded-xl overflow-hidden hover-glow cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-purple-medium to-purple-dark p-6 flex items-center justify-center">
                  <span className="text-6xl">💻</span>
                </div>
                <div className="p-4">
                  <div className="text-xs text-neon-orange mb-1">Tech</div>
                  <h3 className="font-semibold text-sm">Web Development</h3>
                </div>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="glassmorphism rounded-xl overflow-hidden hover-glow cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-purple-medium to-purple-dark p-6 flex items-center justify-center">
                  <span className="text-6xl">🎨</span>
                </div>
                <div className="p-4">
                  <div className="text-xs text-neon-orange mb-1">Art</div>
                  <h3 className="font-semibold text-sm">Digital Design</h3>
                </div>
              </div>
              <div className="glassmorphism rounded-xl overflow-hidden hover-glow cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-purple-medium to-purple-dark p-6 flex items-center justify-center">
                  <span className="text-6xl">💃</span>
                </div>
                <div className="p-4">
                  <div className="text-xs text-neon-orange mb-1">Dance</div>
                  <h3 className="font-semibold text-sm">Hip Hop Moves</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkillshare;