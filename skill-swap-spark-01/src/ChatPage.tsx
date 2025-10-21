import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import Navigation from '@/components/Navigation'; // Adjust path if needed

// Mock auth hook - replace with your app's real auth
const useAuth = () => ({ isAuthenticated: true, onLogin: () => {}, onLogout: () => {} });

const ChatPage = () => {
    const { partnerName } = useParams<{ partnerName: string }>();
    const decodedPartnerName = partnerName ? decodeURIComponent(partnerName) : 'Anonymous';
    
    // Replace with your real auth
    const { isAuthenticated, onLogin, onLogout } = useAuth();

    // In a real app, this would use useState and connect to a WebSocket (Socket.IO)
    const mockMessages = [
        { sender: decodedPartnerName, text: 'Hey! Glad you reached out. How can I help with Music?' },
        { sender: 'You', text: 'Hi! I saw you have skills in Music. I wanted to learn.' },
        { sender: decodedPartnerName, text: 'Awesome! I can definitely help with that. What are you interested in?' },
    ];

    return (
        <>
            <Navigation 
              isAuthenticated={isAuthenticated}
              onAuthClick={onLogin}
              onScoreboardClick={() => {}}
              onCalendarClick={() => {}}
              onLogout={onLogout}
            />
            <div className="pt-24 pb-8 container mx-auto px-4 flex flex-col h-screen">
                <div className="mb-4">
                    <Link to={`/category/Music`} className="inline-flex items-center gap-2 text-neon-orange hover:text-neon-orange/80 mb-4">
                       <ArrowLeft className="w-4 h-4" />
                       Back to Learners
                    </Link>
                    <h2 className="text-3xl font-bold text-white">
                        Chat with <span className="text-neon-orange">{decodedPartnerName}</span>
                    </h2>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-grow glassmorphism rounded-xl p-6 overflow-y-auto mb-4">
                    <div className="flex flex-col gap-4">
                        {mockMessages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.sender === 'You' ? 'bg-neon-orange text-purple-dark' : 'bg-purple-light/20 text-white'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Input */}
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-grow bg-purple-medium/50 border border-purple-light focus:border-neon-orange transition-colors rounded-lg px-4 py-3 text-white placeholder-purple-light/70"
                    />
                    <button className="bg-neon-orange hover:bg-neon-orange/90 text-purple-dark font-bold p-3 rounded-lg glow-orange transition-all">
                        <Send className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatPage;
