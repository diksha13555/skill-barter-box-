import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (user: { name: string; email: string }) => void;
}

const AuthModal = ({ open, onOpenChange, onSuccess }: AuthModalProps) => {
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const { toast } = useToast();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Welcome to Skill Barter Box! 🎉',
      description: 'Your account has been created successfully',
    });

    onSuccess({ name: signupName, email: signupEmail });
    onOpenChange(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Welcome Back! 👋',
      description: 'Successfully logged in',
    });

    onSuccess({ name: 'User', email: loginEmail });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glassmorphism border-neon-orange/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Join <span className="text-neon-orange">Skill Barter Box</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-purple-medium">
            <TabsTrigger value="signup" className="data-[state=active]:bg-neon-orange data-[state=active]:text-purple-dark">
              Sign Up
            </TabsTrigger>
            <TabsTrigger value="login" className="data-[state=active]:bg-neon-orange data-[state=active]:text-purple-dark">
              Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="space-y-4 mt-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="bg-purple-medium/50 border-purple-light focus:border-neon-orange"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="bg-purple-medium/50 border-purple-light focus:border-neon-orange"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="bg-purple-medium/50 border-purple-light focus:border-neon-orange"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-neon-orange hover:bg-neon-orange/90 text-purple-dark font-semibold glow-orange"
              >
                Create Account
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="login" className="space-y-4 mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="bg-purple-medium/50 border-purple-light focus:border-neon-orange"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="bg-purple-medium/50 border-purple-light focus:border-neon-orange"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-neon-orange hover:bg-neon-orange/90 text-purple-dark font-semibold glow-orange"
              >
                Sign In
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;