import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-purple-light/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-neon-orange flex items-center justify-center font-bold text-purple-dark">
                SB
              </div>
              <span className="text-lg font-bold text-neon-orange">
                Skill Barter Box
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering learners to exchange skills and knowledge freely across the globe.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-neon-orange transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-neon-orange transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-neon-orange transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-neon-orange transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-neon-orange transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-neon-orange transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-neon-orange transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-neon-orange transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-purple-medium hover:bg-neon-orange text-foreground hover:text-purple-dark transition-all flex items-center justify-center"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-purple-medium hover:bg-neon-orange text-foreground hover:text-purple-dark transition-all flex items-center justify-center"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-purple-medium hover:bg-neon-orange text-foreground hover:text-purple-dark transition-all flex items-center justify-center"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-purple-medium hover:bg-neon-orange text-foreground hover:text-purple-dark transition-all flex items-center justify-center"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-purple-medium hover:bg-neon-orange text-foreground hover:text-purple-dark transition-all flex items-center justify-center"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-light/30 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Skill Barter Box. All rights reserved. Made with ❤️ for learners worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;