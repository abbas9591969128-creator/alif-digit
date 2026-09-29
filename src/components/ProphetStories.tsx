import React, { useState } from "react";
import { PROPHET_STORIES, ProphetStory } from "../data/islamicData";
import { Sparkles, Globe, User, BookOpen, Compass, Languages, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProphetStoriesProps {
  onContextChange: (context: string) => void;
}

export default function ProphetStories({ onContextChange }: ProphetStoriesProps) {
  const [selectedProphetId, setSelectedProphetId] = useState<string>(PROPHET_STORIES[0].id);
  const [lang, setLang] = useState<"english" | "manglish" | "kannada">("english");

  const currentProphet = PROPHET_STORIES.find((p) => p.id === selectedProphetId) || PROPHET_STORIES[0];

  const handleProphetSelect = (id: string) => {
    setSelectedProphetId(id);
    const prophet = PROPHET_STORIES.find((p) => p.id === id);
    if (prophet) {
      onContextChange(`Reading story of Prophet ${prophet.name}`);
    }
  };

  return (
    <div className="space-y-8" id="stories-section">
      {/* Section Header */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-gold font-serif tracking-widest flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-gold" />
            STORIES OF THE PROPHETS (ഖിസസുൽ അൻബിയാഅ്)
          </h2>
          <p className="text-xs text-brand-cream-dim">Detailed accounts of all major Nabis. Switch instantly between English, Manglish, and Kannada scripts.</p>
        </div>

        {/* Global Language Selector */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-xl border border-brand-border/40">
          <Languages className="w-4 h-4 text-brand-cream-dim ml-2 mr-1" />
          {[
            { id: "english", label: "English" },
            { id: "manglish", label: "Manglish" },
            { id: "kannada", label: "ಕನ್ನಡ" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setLang(item.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-serif font-bold tracking-wide transition-all cursor-pointer ${
                lang === item.id
                  ? "bg-brand-gold text-brand-bg shadow-md"
                  : "text-brand-cream-dim hover:text-brand-cream"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Prophet Selector Buttons */}
        <div className="lg:col-span-1 bg-brand-card border border-brand-border rounded-2xl p-4 space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
          <span className="text-[10px] uppercase font-mono tracking-widest text-brand-gold font-bold block mb-2 px-1">SELECT NABI</span>
          {PROPHET_STORIES.map((prophet) => (
            <button
              key={prophet.id}
              onClick={() => handleProphetSelect(prophet.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                selectedProphetId === prophet.id
                  ? "bg-brand-gold/15 border-brand-gold text-brand-gold shadow-md"
                  : "bg-black/20 border-transparent hover:border-brand-border/60 text-brand-cream-dim hover:text-brand-cream"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-black/40 border border-brand-border/40 flex items-center justify-center shrink-0 group-hover:border-brand-gold/50 transition-all">
                  <User className="w-4 h-4 text-brand-gold" />
                </div>
                <span className="text-xs font-serif font-bold block transition-colors group-hover:text-brand-gold">{prophet.name}</span>
              </div>
              <span className="text-xs font-serif text-brand-cream-dim text-right font-medium">{prophet.arabicName.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Right Side: Detailed Story Reader Card */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedProphetId}_${lang}`}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="bg-brand-card border border-brand-border rounded-2xl p-6 md:p-8 shadow-xl flex flex-col justify-between min-h-[460px]"
            >
              <div className="space-y-6">
                
                {/* Story header info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-brand-border/40 pb-4 gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-brand-gold font-bold block">BIOGRAPHY OF PROPHET</span>
                    <h3 className="text-lg font-bold font-serif text-brand-cream flex items-center gap-1.5 mt-0.5">
                      {currentProphet.name} <span className="text-xs font-normal text-brand-cream-dim font-serif">({currentProphet.arabicName})</span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 bg-black/40 border border-brand-border/40 rounded-lg px-2.5 py-1 text-[10px] font-mono text-brand-cream-dim">
                    <Globe className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
                    <span>Script: <strong>{lang.toUpperCase()}</strong></span>
                  </div>
                </div>

                {/* Subtitle / Title banner */}
                <div className="bg-black/30 border border-brand-border/30 p-3.5 rounded-xl">
                  <p className="text-xs text-brand-gold font-serif font-medium flex items-center gap-1.5 leading-relaxed">
                    <Star className="w-4 h-4 text-brand-gold shrink-0" />
                    {currentProphet.englishTitle}
                  </p>
                </div>

                {/* Main Text Content */}
                <div className="text-sm leading-loose text-brand-cream tracking-wide font-serif whitespace-pre-line select-all bg-black/5 p-4 rounded-xl border border-brand-border/20">
                  {lang === "english" && currentProphet.englishText}
                  {lang === "manglish" && currentProphet.manglishText}
                  {lang === "kannada" && currentProphet.kannadaText}
                </div>

              </div>

              {/* Footer detail */}
              <div className="border-t border-brand-border/40 pt-4 mt-8 flex items-center justify-between text-[11px] text-brand-cream-dim/80 font-mono">
                <span>ALIF DIGITAL • STORIES OF NABIS</span>
                <span className="text-[10px] text-brand-gold font-serif font-bold">Read & reflect on their pure legacies</span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
