import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CalendarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CalendarModal = ({ open, onOpenChange }: CalendarModalProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  ];

  const handleSchedule = (time: string) => {
    toast({
      title: 'Session Scheduled! 📅',
      description: `Your skill exchange is set for ${date?.toLocaleDateString()} at ${time}`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl glassmorphism border-neon-orange/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Schedule Your <span className="text-neon-orange">Skill Exchange</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Select Date</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border border-purple-light bg-purple-medium/30"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-3">Available Time Slots</h3>
            <div className="grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  onClick={() => handleSchedule(time)}
                  variant="outline"
                  className="border-purple-light hover:bg-neon-orange hover:text-purple-dark hover:border-neon-orange transition-all"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-purple-medium/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            💡 Tip: Choose a time that works for both you and your learning partner
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;