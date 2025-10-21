import { Button } from '@/components/ui/button';
import { Users, BookOpen, Award } from 'lucide-react';

const TeamsSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="glassmorphism rounded-3xl p-12 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-neon-orange">Skill Barter Box</span> for Teams
            </h2>
            <p className="text-xl text-muted-foreground">
              Unlock skill exchange for your entire organization. Empower your team to learn and grow together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-neon-orange/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-neon-orange" />
              </div>
              <h3 className="font-semibold mb-2">Team Collaboration</h3>
              <p className="text-sm text-muted-foreground">Enable cross-functional skill sharing</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-neon-orange/20 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-neon-orange" />
              </div>
              <h3 className="font-semibold mb-2">Unlimited Access</h3>
              <p className="text-sm text-muted-foreground">Access to all skill categories</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-neon-orange/20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-neon-orange" />
              </div>
              <h3 className="font-semibold mb-2">Team Analytics</h3>
              <p className="text-sm text-muted-foreground">Track team progress and growth</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-neon-orange hover:bg-neon-orange/90 text-purple-dark font-bold text-lg px-10 py-6 glow-orange"
            >
              Learn More About Teams
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;