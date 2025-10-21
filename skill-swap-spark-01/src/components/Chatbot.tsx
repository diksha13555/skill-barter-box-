import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your Skill Barter assistant. I can help you find the perfect skill exchange partner. What would you like to learn?",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');

  // 1. Make the function async to wait for the API call
  const handleSend = async () => {
    if (!input.trim()) return;

    // 2. Save the current input to a variable
    const currentInput = input;

    const userMessage: Message = {
      // 3. Use a unique ID (like Date.now())
      id: Date.now(),
      text: currentInput,
      sender: 'user',
    };

    // 4. Add user message immediately & clear input
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // 5. This is the new part: Call your LIVE AI server
    try {
      
      // --- THIS IS THE UPDATED LINE ---
      const response = await fetch('https://skill-barter-3rvd.onrender.com/api/chat', {
      // --- THIS IS THE UPDATED LINE ---

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }), // Send the user's message
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const aiData = await response.json();

      // Create bot response from the AI's answer
      const botResponse: Message = {
        id: Date.now() + 1, // Another unique ID
        text: aiData.response, // Use the AI's response
        sender: 'bot',
      };
      
      setMessages((prev) => [...prev, botResponse]);

    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      // Show an error message in the chat
      const errorResponse: Message = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting to the AI. Please try again.",
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorResponse]);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-neon-orange hover:bg-neon-orange/90 text-purple-dark shadow-lg glow-orange z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] glassmorphism border border-neon-orange/30 rounded-2xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-light">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon-orange flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-dark" />
              </div>
              <div>
                <h3 className="font-semibold">Skill Barter Assistant</h3>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-purple-light"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-neon-orange text-purple-dark'
                        : 'bg-purple-medium text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-purple-light">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="bg-purple-medium/50 border-purple-light focus:border-neon-orange"
              />
              <Button
                onClick={handleSend}
                className="bg-neon-orange hover:bg-neon-orange/90 text-purple-dark"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;