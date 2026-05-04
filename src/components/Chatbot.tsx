"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hi! I'm the ByteHubble AI assistant. I can help you with database questions, schedule a consultation, or learn about our platform. How can I help you today?",
    timestamp: new Date(),
  },
];

const QUICK_ACTIONS = [
  "Tell me about DB Agents",
  "Schedule a consultation",
  "PostgreSQL help",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate API response — replace with actual API call
    // Example: const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: content }) });
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getPlaceholderResponse(content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-gradient text-white shadow-xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="w-14 h-14 rounded-full overflow-hidden bg-white/10">
            {/* Using static SVG icon instead of external GIF for better performance */}
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="white" fillOpacity="0.2"/>
              <path d="M8 10C8 10 9.5 12 12 12C14.5 12 16 10 16 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="9" cy="9" r="1" fill="white"/>
              <circle cx="15" cy="9" r="1" fill="white"/>
            </svg>
          </div>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 left-4 sm:left-6 z-40 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] rounded-2xl bg-white shadow-2xl border border-gray-100 flex flex-col animate-fade-up overflow-hidden">
          {/* Header */}
          <div className="bg-brand-gradient px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                {/* Using static SVG icon instead of external GIF for better performance */}
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="white" fillOpacity="0.2"/>
                  <path d="M8 10C8 10 9.5 12 12 12C14.5 12 16 10 16 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="9" cy="9" r="1" fill="white"/>
                  <circle cx="15" cy="9" r="1" fill="white"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">ByteHubble Assistant</h3>
                <p className="text-xs text-white/60">AI-powered database support</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80 min-h-[200px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-gray-50 text-dark-accent rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-50 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-dark-accent/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-dark-accent/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-dark-accent/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  onClick={() => sendMessage(action)}
                  className="text-xs px-3 py-1.5 rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about databases..."
                className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-gray-200 bg-background focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-dark-accent"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-brand-gradient text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

/** Placeholder responses — replace with actual API integration */
function getPlaceholderResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("consultation") || lower.includes("schedule") || lower.includes("demo")) {
    return "I'd love to help you schedule a consultation! Please visit our contact page or email us at hello@bytehubble.com. Our team typically responds within 24 hours.";
  }

  if (lower.includes("agent") || lower.includes("db agent")) {
    return "ByteHubble DB Agents are autonomous AI agents that continuously monitor, optimize, and manage your PostgreSQL databases 24/7. They handle everything from query optimization to automated failover. Would you like to learn more about a specific capability?";
  }

  if (lower.includes("postgresql") || lower.includes("postgres")) {
    return "ByteHubble provides enterprise-grade PostgreSQL automation including query optimization, vacuum management, replication monitoring, and more. What specific PostgreSQL challenge are you facing?";
  }

  if (lower.includes("training") || lower.includes("course")) {
    return "We offer world-class training programs including PostgreSQL Mastery (12 weeks), DBA Training (8 weeks), AI-ML for Engineers (10 weeks), and SRE Training (6 weeks). Which program interests you?";
  }

  if (lower.includes("pricing") || lower.includes("cost") || lower.includes("price")) {
    return "Our pricing is customized based on your database infrastructure size and needs. I'd recommend scheduling a consultation so our team can provide a tailored quote. Shall I help you set that up?";
  }

  return "Thanks for your question! For the most accurate answer, I'd recommend scheduling a consultation with our database experts. Is there anything specific about ByteHubble's platform I can help clarify?";
}
