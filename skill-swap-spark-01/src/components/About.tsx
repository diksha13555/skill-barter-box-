import { Users, Sparkles, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Skill Barter System',
    description: 'Exchange your expertise for new knowledge. Teach coding while learning dance, or share art skills for music lessons.',
  },
  {
    icon: Sparkles,
    title: 'Gamified Learning',
    description: 'Earn badges, track progress, and maintain learning streaks. Make your skill journey rewarding and fun.',
  },
  {
    icon: TrendingUp,
    title: 'Smart Matching',
    description: 'Our AI-powered system connects you with the perfect skill partners based on your interests and goals.',
  },
];

const About = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why <span className="text-neon-orange">Skill Barter Box?</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We believe everyone has something valuable to teach and endless potential to learn. 
            Our platform makes knowledge exchange accessible, engaging, and completely free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glassmorphism p-8 rounded-xl hover-glow text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-orange/20 mb-6">
                <feature.icon className="w-8 h-8 text-neon-orange" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="glassmorphism p-12 rounded-2xl text-center">
          <h3 className="text-3xl font-bold mb-4">
            Join <span className="text-neon-orange">10,000+</span> Learners Worldwide
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Start your skill exchange journey today. No credit card required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <span>✓ 100% Free Forever</span>
            <span>✓ No Hidden Fees</span>
            <span>✓ Safe & Secure</span>
            <span>✓ Global Community</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;