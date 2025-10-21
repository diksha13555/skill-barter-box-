import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    // Here you would typically send the feedback to your backend
    toast({
      title: 'Feedback Sent! 🎉',
      description: 'Thank you for helping us improve Skill Barter Box',
    });

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              We'd Love Your <span className="text-neon-orange">Feedback</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Help us make Skill Barter Box even better for you
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glassmorphism p-8 rounded-2xl space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="bg-purple-medium/50 border-purple-light focus:border-neon-orange"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="bg-purple-medium/50 border-purple-light focus:border-neon-orange"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Your Feedback
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you think..."
                rows={6}
                className="bg-purple-medium/50 border-purple-light focus:border-neon-orange resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-neon-orange hover:bg-neon-orange/90 text-purple-dark font-semibold text-lg py-6 glow-orange"
            >
              Send Feedback
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;