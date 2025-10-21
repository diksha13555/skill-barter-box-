import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trophy, Medal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

interface ScoreboardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const countries = ['Global', 'United States', 'United Kingdom', 'India', 'Canada', 'Australia'];

const leaderboardData = [
  { rank: 1, name: 'Sarah Chen', country: 'United States', points: 2840, exchanges: 45 },
  { rank: 2, name: 'Mike Anderson', country: 'United Kingdom', points: 2650, exchanges: 42 },
  { rank: 3, name: 'Priya Sharma', country: 'India', points: 2520, exchanges: 38 },
  { rank: 4, name: 'James Wilson', country: 'Canada', points: 2390, exchanges: 36 },
  { rank: 5, name: 'Emma Davis', country: 'Australia', points: 2280, exchanges: 34 },
  { rank: 6, name: 'Carlos Rodriguez', country: 'United States', points: 2150, exchanges: 31 },
  { rank: 7, name: 'Yuki Tanaka', country: 'Japan', points: 2040, exchanges: 29 },
  { rank: 8, name: 'Sophie Martin', country: 'United Kingdom', points: 1920, exchanges: 27 },
  { rank: 9, name: 'Ahmed Hassan', country: 'Egypt', points: 1850, exchanges: 25 },
  { rank: 10, name: 'Lisa Brown', country: 'Canada', points: 1780, exchanges: 23 },
];

const ScoreboardModal = ({ open, onOpenChange }: ScoreboardModalProps) => {
  const [selectedCountry, setSelectedCountry] = useState('Global');

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-neon-orange" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl glassmorphism border-neon-orange/30 max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            <Trophy className="inline-block w-8 h-8 text-neon-orange mr-2" />
            Global <span className="text-neon-orange">Leaderboard</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="bg-purple-medium/50 border-purple-light">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent className="bg-purple-medium border-purple-light">
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {leaderboardData.map((user, index) => (
            <div
              key={user.rank}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                index < 3
                  ? 'bg-gradient-to-r from-purple-medium to-purple-light border border-neon-orange/30 hover-glow'
                  : 'bg-purple-medium/50 hover:bg-purple-medium'
              }`}
            >
              <div className="w-12 flex justify-center">
                {getMedalIcon(user.rank)}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.country}</p>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-neon-orange">{user.points}</div>
                <div className="text-xs text-muted-foreground">{user.exchanges} exchanges</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-purple-medium/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            Keep exchanging skills to climb the leaderboard! 🚀
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScoreboardModal;