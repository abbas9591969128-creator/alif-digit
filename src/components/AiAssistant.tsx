import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, CornerDownLeft, Loader2, RotateCcw, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "model";
  content: string;
}

interface AiAssistantProps {
  currentContext?: string;
  className?: string;
}

export default function AiAssistant({ currentContext, className = "" }: AiAssistantProps) {
  const [mode, setMode] = useState<"reading" | "doubts">("reading");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === "reading") {
      setMessages([
        {
          role: "model",
          content: "Assalamu Alaikum! I am your Alif Digital AI Assistant. How can I assist you today? You can ask me about pronunciation (Tajweed), virtues of Swalath, details about Prophet stories, or historical context of the Quranic pages.",
        },
      ]);
    } else {
      setMessages([
        {
          role: "model",
          content: "Assalamu Alaikum! You are in the Islamic Doubts Mode. Ask me any doubts, rules, jurisprudence (Fiqh) queries, daily etiquettes, or general questions about Islam. I will help clarify with references from the Quran and Sunnah.",
        },
      ]);
    }
  }, [mode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userMessage,
          context: currentContext,
          chatHistory: messages.slice(1), // Exclude greeting
          mode: mode,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, { role: "model", content: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: `⚠️ Error: ${data.error || "Failed to communicate with AI. Please make sure your Gemini API Key is configured in Settings > Secrets."}`,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "⚠️ Network Error: Unable to reach the AI Reading server. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (mode === "reading") {
      setMessages([
        {
          role: "model",
          content: "Chat cleared. Ask me anything about the Holy Quran, Juz, daily prayers, Rathib, Moulid, or stories of the Prophets!",
        },
      ]);
    } else {
      setMessages([
        {
          role: "model",
          content: "Chat cleared. Ask me any general doubts, rules, or questions about Islam!",
        },
      ]);
    }
  };

  const suggestedPrompts = mode === "reading" 
    ? [
        "What is the reward of Swalathun Nariya?",
        "Explain the history of Rathib Al-Haddad",
        "What are some Tajweed tips for Surah Al-Fatihah?",
        "Tell me about Prophet Ibrahim's sacrifice",
      ]
    : [
        "How can I improve my focus (Khushu) in Namaz?",
        "What are the benefits of voluntary night prayers (Tahajjud)?",
        "What is the significance of Jum'ah (Friday) in Islam?",
        "How are minor vs major sins forgiven in Islam?",
      ];

  return (
    <div className={`flex flex-col bg-brand-card border border-brand-border rounded-2xl overflow-hidden shadow-2xl ${className}`} id="ai-assistant-container">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-card via-black/45 to-brand-card px-4 py-3.5 border-b border-brand-border/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-brand-gold/15 text-brand-gold border border-brand-gold/30 rounded-lg">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-brand-gold text-sm tracking-widest">
              {mode === "reading" ? "ALIF READING AI" : "ISLAMIC DOUBTS CLARIFIER"}
            </h3>
            <p className="text-[10px] text-brand-cream-dim">
              {mode === "reading" ? "Interactive Spiritual Companion" : "Islamic Fiqh & Doubt Clarifier"}
            </p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-1.5 hover:bg-brand-gold/10 text-brand-cream-dim hover:text-brand-gold rounded-lg transition-colors cursor-pointer"
          title="Reset conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Mode Selector Switch */}
      <div className="bg-black/40 p-2 border-b border-brand-border/30 flex gap-2">
        <button
          onClick={() => setMode("reading")}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-serif font-bold tracking-wide transition-all cursor-pointer text-center ${
            mode === "reading"
              ? "bg-brand-gold text-brand-bg shadow-sm"
              : "text-brand-cream-dim hover:text-brand-cream bg-black/25 border border-brand-border/20"
          }`}
        >
          📖 Reading Companion
        </button>
        <button
          onClick={() => setMode("doubts")}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-serif font-bold tracking-wide transition-all cursor-pointer text-center ${
            mode === "doubts"
              ? "bg-brand-gold text-brand-bg shadow-sm"
              : "text-brand-cream-dim hover:text-brand-cream bg-black/25 border border-brand-border/20"
          }`}
        >
          ❓ Clarify Islamic Doubts
        </button>
      </div>

      {/* Context banner */}
      {currentContext && mode === "reading" && (
        <div className="bg-black/40 px-4 py-1.5 border-b border-brand-border/30 flex items-center gap-2 text-[11px] text-brand-gold font-mono">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping"></span>
          <span>Reading Context: <strong>{currentContext}</strong></span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[220px] max-h-[400px] bg-black/30 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role !== "user" && (
                <div className="w-8 h-8 rounded-full bg-black/40 border border-brand-border/40 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-brand-gold" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-brand-gold text-brand-bg font-serif font-bold rounded-tr-none shadow-md"
                    : "bg-black/35 border border-brand-border/40 text-brand-cream rounded-tl-none shadow-md font-serif"
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-brand-bg" />
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-start"
            >
              <div className="w-8 h-8 rounded-full bg-black/40 border border-brand-border/40 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-brand-gold" />
              </div>
              <div className="bg-black/35 border border-brand-border/40 text-brand-cream-dim rounded-2xl rounded-tl-none px-4 py-3 text-sm flex items-center gap-2 font-serif">
                <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                <span>Reflecting on Islamic texts...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts (when no chat history besides welcome) */}
      {messages.length === 1 && !isLoading && (
        <div className="px-4 py-2 bg-black/50 border-t border-brand-border/30 flex flex-wrap gap-1.5">
          <p className="text-[10px] text-brand-gold w-full mb-1 flex items-center gap-1 font-sans font-bold tracking-wider">
            <HelpCircle className="w-3 h-3" /> QUICK QUESTIONS:
          </p>
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInput(prompt)}
              className="text-[10px] bg-black/40 hover:bg-brand-gold/15 text-brand-cream-dim hover:text-brand-cream border border-brand-border/40 hover:border-brand-gold/50 px-2 py-1 rounded-lg transition-all text-left cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-brand-card border-t border-brand-border/40 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "reading" ? "Ask AI about pronunciation, rewards, or history..." : "Clarify Islamic doubts, jurisprudence rules, daily etiquettes..."}
          className="flex-1 bg-black/40 border border-brand-border/40 focus:border-brand-gold rounded-xl px-3 py-2 text-sm text-brand-cream placeholder-brand-cream-dim/50 outline-none focus:ring-1 focus:ring-brand-gold/20 transition-all font-serif"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-brand-gold hover:bg-brand-gold-hover disabled:bg-black/45 text-brand-bg font-bold p-2 rounded-xl transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
