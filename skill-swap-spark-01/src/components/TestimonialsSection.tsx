import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Graphic Designer',
    text: "Skill Barter Box has been life changing for me. I learned coding while teaching design - it's amazing!",
    rating: 5
  },
  {
    name: 'Mike T.',
    role: 'Software Developer',
    text: "I've always wanted to learn music theory. Through this platform I found someone to teach me while I helped them with programming.",
    rating: 5
  },
  {
    name: 'Lisa M.',
    role: 'Dance Instructor',
    text: "The community here is incredible. I've made lifelong friends and learned so many new skills for free!",
    rating: 5
  },
  {
    name: 'Ahmed R.',
    role: 'Language Teacher',
    text: "I've been using Skill Barter Box for over a year. The gamification keeps me motivated and the people are wonderful.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 relative bg-purple-dark/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Learners Love <span className="text-neon-orange">Skill Barter Box</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glassmorphism p-8 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-full bg-neon-orange flex items-center justify-center font-bold text-purple-dark">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-neon-orange text-neon-orange" />
                ))}
              </div>

              <p className="text-muted-foreground italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;