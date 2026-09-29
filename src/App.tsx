import React, { useState } from "react";
import { Sparkles, BookOpen, Compass, Flame, BookMarked, Feather, MessageSquare, AlertCircle, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import QuranReader from "./components/QuranReader";
import SwalathCounter from "./components/SwalathCounter";
import DailyUseful from "./components/DailyUseful";
import ProphetStories from "./components/ProphetStories";
import AiAssistant from "./components/AiAssistant";
import IslamicSpeechGenerator from "./components/IslamicSpeechGenerator";
import CompetitionPortal from "./components/CompetitionPortal";

type TabOption = "quran" | "swalath" | "daily" | "stories" | "assistant" | "speech" | "competition";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabOption>("quran");
  const [currentAiContext, setCurrentAiContext] = useState<string>("Holy Quran Index");

  const handleContextChange = (newContext: string) => {
    setCurrentAiContext(newContext);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream flex flex-col font-sans selection:bg-brand-gold/30 selection:text-brand-gold">
      
      {/* Decorative top border line - solid elegant gold line */}
      <div className="h-1 bg-brand-gold w-full shadow-[0_1px_10px_rgba(196,161,99,0.3)]"></div>

      {/* Primary Navigation / Header bar */}
      <header className="bg-brand-card/90 backdrop-blur-md border-b border-brand-border sticky top-0 z-50 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Typographic Islamic Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-brand-gold flex items-center justify-center rounded-lg shadow-[0_0_12px_rgba(196,161,99,0.15)] bg-black/20">
              <span className="font-serif text-xl font-bold text-brand-gold select-none">أ</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-serif font-bold text-2xl tracking-widest text-brand-gold">
                  ALIF DIGITAL
                </h1>
                <span className="text-[9px] bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-mono px-1.5 py-0.5 rounded tracking-widest font-bold">
                  v1.2
                </span>
              </div>
              <p className="text-[10px] text-brand-cream-dim tracking-wider font-sans uppercase">Complete Quranic & Spiritual Companion</p>
            </div>
          </div>

          {/* Tab buttons */}
          <nav className="flex flex-wrap items-center gap-1.5 bg-slate-200/60 p-1 rounded-xl border border-slate-300/40 w-full md:w-auto">
            {[
              { id: "quran", label: "Quran & Juz", icon: BookOpen },
              { id: "swalath", label: "Swalath Tasbih", icon: Flame },
              { id: "daily", label: "Daily Useful", icon: BookMarked },
              { id: "stories", label: "Prophet Stories", icon: Compass },
              { id: "speech", label: "Islamic Speeches", icon: Feather },
              { id: "competition", label: "Match Registry", icon: Trophy },
              { id: "assistant", label: "Reading AI", icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabOption);
                    handleContextChange(tab.id === "quran" ? "Holy Quran Index" : tab.label);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer font-serif tracking-wider ${
                    activeTab === tab.id
                      ? "bg-brand-gold text-white font-bold shadow-md shadow-brand-gold/20"
                      : "text-brand-cream-dim hover:text-brand-cream hover:bg-white/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

        </div>
      </header>

      {/* Context banner showing real-time AI updates */}
      <div className="bg-brand-card border-b border-brand-border-dim py-2 px-4 text-center text-xs text-brand-gold font-serif tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-gold" />
          <span>Active Reading Context: <strong className="text-brand-cream">{currentAiContext}</strong></span>
        </div>
      </div>

      {/* Main Container Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        
        {/* Animated Slide Transition between main Views */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full"
          >
            {activeTab === "quran" && (
              <QuranReader onContextChange={handleContextChange} />
            )}

            {activeTab === "swalath" && (
              <SwalathCounter onContextChange={handleContextChange} />
            )}

            {activeTab === "daily" && (
              <DailyUseful onContextChange={handleContextChange} />
            )}

            {activeTab === "stories" && (
              <ProphetStories onContextChange={handleContextChange} />
            )}

            {activeTab === "speech" && (
              <IslamicSpeechGenerator onContextChange={handleContextChange} />
            )}

            {activeTab === "competition" && (
              <CompetitionPortal onContextChange={handleContextChange} />
            )}

            {activeTab === "assistant" && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-brand-card border border-brand-border rounded-2xl p-6 shadow-md">
                  <h3 className="text-base font-bold text-brand-gold font-serif tracking-wide flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
                    Interactive Islamic Tutor
                  </h3>
                  <p className="text-xs text-brand-cream-dim leading-relaxed">
                    This advanced AI tutor provides accurate, respectful guidance. You can ask anything about pronunciation, historical origins, translation queries, or Islamic etiquettes. Use the tabs inside to toggle between general reading queries and dedicated Islamic doubt-clearing mode.
                  </p>
                </div>
                <AiAssistant currentContext={currentAiContext} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </main>

      {/* Footer credits bar */}
      <footer className="bg-brand-card/60 border-t border-brand-border py-8 px-4 text-center mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-cream-dim font-serif tracking-wider">
          <div className="flex items-center gap-2">
            <span className="font-bold text-brand-gold">ALIF DIGITAL</span>
            <span>•</span>
            <span>© 2026 Alif Digital. All Rights Reserved.</span>
          </div>
          <div className="text-[10px] text-brand-cream-dim/70">
            Designed respectfully for Islamic education, Quran reciting, and remembrance (Dhikr).
          </div>
        </div>
      </footer>

    </div>
  );
}
