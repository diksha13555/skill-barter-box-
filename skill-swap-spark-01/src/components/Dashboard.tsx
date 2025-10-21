import { Award, BookOpen, Users, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface DashboardProps {
  user: { name: string; email: string };
}

const Dashboard = ({ user }: DashboardProps) => {
  const userSkills = [
    { name: 'Programming', level: 85, exchanges: 12 },
    { name: 'Music Production', level: 70, exchanges: 8 },
    { name: 'Digital Art', level: 60, exchanges: 5 },
  ];

  const learningGoals = [
    { name: 'Web Development', progress: 65 },
    { name: 'Guitar Basics', progress: 40 },
    { name: 'Photography', progress: 25 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="glassmorphism p-8 rounded-2xl mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="text-neon-orange">{user.name}!</span>
          </h1>
          <p className="text-muted-foreground">Keep up the great learning momentum 🚀</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glassmorphism p-6 rounded-xl hover-glow">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-neon-orange" />
              <span className="text-3xl font-bold text-neon-orange">25</span>
            </div>
            <p className="text-sm text-muted-foreground">Total Exchanges</p>
          </div>

          <div className="glassmorphism p-6 rounded-xl hover-glow">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-neon-orange" />
              <span className="text-3xl font-bold text-neon-orange">18</span>
            </div>
            <p className="text-sm text-muted-foreground">Learning Partners</p>
          </div>

          <div className="glassmorphism p-6 rounded-xl hover-glow">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-neon-orange" />
              <span className="text-3xl font-bold text-neon-orange">12</span>
            </div>
            <p className="text-sm text-muted-foreground">Badges Earned</p>
          </div>

          <div className="glassmorphism p-6 rounded-xl hover-glow">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-neon-orange" />
              <span className="text-3xl font-bold text-neon-orange">847</span>
            </div>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Your Skills */}
          <div className="glassmorphism p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Your Skills</h2>
            <div className="space-y-6">
              {userSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-neon-orange">{skill.exchanges} exchanges</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          <div className="glassmorphism p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Learning Goals</h2>
            <div className="space-y-6">
              {learningGoals.map((goal) => (
                <div key={goal.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{goal.name}</span>
                    <span className="text-neon-orange">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Badges */}
        <div className="glassmorphism p-8 rounded-2xl mt-8">
          <h2 className="text-2xl font-bold mb-6">Recent Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['First Exchange', 'Week Streak', 'Skill Master', 'Helpful Partner'].map((badge) => (
              <div key={badge} className="text-center p-4 bg-purple-medium rounded-lg">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-neon-orange/20 flex items-center justify-center">
                  <Award className="w-8 h-8 text-neon-orange" />
                </div>
                <p className="text-sm font-semibold">{badge}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;