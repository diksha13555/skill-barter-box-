import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SkillCategories from '@/components/SkillCategories';
import ExpertSection from '@/components/ExpertSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import TeamsSection from '@/components/TeamsSection';
import FAQSection from '@/components/FAQSection';
import FeedbackForm from '@/components/FeedbackForm';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import Dashboard from '@/components/Dashboard';
import Chatbot from '@/components/Chatbot';
import ScoreboardModal from '@/components/ScoreboardModal';
import CalendarModal from '@/components/CalendarModal';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isScoreboardOpen, setIsScoreboardOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen">
      <Navigation
        onAuthClick={() => setIsAuthModalOpen(true)}
        onScoreboardClick={() => setIsScoreboardOpen(true)}
        onCalendarClick={() => setIsCalendarOpen(true)}
        isAuthenticated={!!user}
        onLogout={handleLogout}
      />

      {user ? (
        <Dashboard user={user} />
      ) : (
        <>
          <Hero
            onJoinClick={() => setIsAuthModalOpen(true)}
            onExploreClick={() => {
              const element = document.getElementById('categories');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <div id="categories">
            <SkillCategories />
          </div>
          <ExpertSection />
          <TestimonialsSection />
          <TeamsSection />
          <FAQSection />
          <FeedbackForm />
        </>
      )}

      <Footer />

      <Chatbot />

      <AuthModal
        open={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
        onSuccess={handleAuthSuccess}
      />

      <ScoreboardModal
        open={isScoreboardOpen}
        onOpenChange={setIsScoreboardOpen}
      />

      <CalendarModal
        open={isCalendarOpen}
        onOpenChange={setIsCalendarOpen}
      />
    </div>
  );
};

export default Index;