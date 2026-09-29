import React, { useState } from "react";
import { NAMAZ_DUAS, RATHIB_HADDAD, MAJLISUNNOOR, MOULID_ITEMS } from "../data/islamicData";
import { BookMarked, Sun, Moon, Sparkles, ChevronDown, ChevronUp, Star, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DailyUsefulProps {
  onContextChange: (context: string) => void;
}

export default function DailyUseful({ onContextChange }: DailyUsefulProps) {
  const [activeTab, setActiveTab] = useState<"duas" | "rathib" | "majlis" | "moulid">("duas");
  const [activeNamazDuaId, setActiveNamazDuaId] = useState<string>(NAMAZ_DUAS[0].id);
  const [expandedRathibId, setExpandedRathibId] = useState<string | null>(null);
  const [selectedMoulidId, setSelectedMoulidId] = useState<string>("manqoos");

  const selectTabHandler = (tab: "duas" | "rathib" | "majlis" | "moulid") => {
    setActiveTab(tab);
    onContextChange(`Daily Useful Section: ${tab.toUpperCase()}`);
  };

  const currentMoulid = MOULID_ITEMS.find((m) => m.id === selectedMoulidId) || MOULID_ITEMS[0];

  return (
    <div className="space-y-8" id="daily-section">
      {/* Tab Navigation Header */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-4 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-brand-gold font-serif tracking-widest flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-brand-gold" />
              DAILY SPIRITUAL COMPANION
            </h2>
            <p className="text-xs text-brand-cream-dim">Essential litanies, rathibs, post-prayer duas, and classical Moulids for daily practice.</p>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-black/40 p-1.5 rounded-xl border border-brand-border/40">
            {[
              { id: "duas", label: "Namaz Duas" },
              { id: "rathib", label: "Rathib Haddad" },
              { id: "majlis", label: "Majlisunnoor" },
              { id: "moulid", label: "All Moulids" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => selectTabHandler(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-serif font-bold tracking-wide transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-brand-gold text-brand-bg shadow-md"
                    : "text-brand-cream-dim hover:text-brand-cream"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-5 md:p-8 shadow-xl min-h-[460px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: NAMAZ DUAS */}
          {activeTab === "duas" && (
            <motion.div
              key="duas"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              {/* Left Selector List */}
              <div className="md:col-span-4 space-y-2">
                <span className="text-xs text-brand-cream-dim font-serif font-semibold block mb-2">Select Prayer Supplication</span>
                {NAMAZ_DUAS.map((dua) => (
                  <button
                    key={dua.id}
                    onClick={() => {
                      setActiveNamazDuaId(dua.id);
                      onContextChange(`Dua: ${dua.title}`);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      activeNamazDuaId === dua.id
                        ? "bg-brand-gold/15 border-brand-gold text-brand-gold"
                        : "bg-black/20 border-transparent hover:border-brand-border/60 text-brand-cream-dim hover:text-brand-cream"
                    }`}
                  >
                    <span className="text-xs font-serif font-bold block truncate">{dua.title}</span>
                  </button>
                ))}
              </div>

              {/* Right Supplication View Card */}
              <div className="md:col-span-8 space-y-6 bg-black/30 border border-brand-border/40 rounded-2xl p-6">
                {NAMAZ_DUAS.map((dua) => {
                  if (dua.id !== activeNamazDuaId) return null;
                  return (
                    <div key={dua.id} className="space-y-6">
                      <div className="flex items-center gap-2 border-b border-brand-border/40 pb-3">
                        <span className="p-1.5 bg-brand-gold/15 text-brand-gold border border-brand-gold/30 rounded-lg">
                          <Award className="w-4 h-4" />
                        </span>
                        <h3 className="font-bold font-serif text-brand-gold text-sm tracking-wide">{dua.title}</h3>
                      </div>

                      <div className="space-y-4">
                        <p className="text-2xl leading-loose text-right font-serif text-slate-100 font-semibold" dir="rtl">
                          {dua.arabicText}
                        </p>
                        <div className="pt-4 border-t border-brand-border/40">
                          <span className="text-[10px] uppercase font-mono text-brand-cream-dim tracking-widest font-bold">Pronunciation Transliteration</span>
                          <p className="text-xs text-brand-gold font-serif mt-1 leading-relaxed italic">{dua.transliteration}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 2: RATHIB HADDAD */}
          {activeTab === "rathib" && (
            <motion.div
              key="rathib"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-brand-border/40 pb-3">
                <div>
                  <h3 className="font-bold font-serif text-brand-gold text-sm tracking-wider">Rathib Al-Haddad (രാത്തീബ് അൽ ഹദ്ദാദ്)</h3>
                  <p className="text-[11px] text-brand-cream-dim">Step-by-step recitation formulated by Qutb Al-Irshad Al-Habib Abdullah Al-Haddad.</p>
                </div>
                <span className="text-[10px] bg-brand-gold/15 border border-brand-gold/30 text-brand-gold px-3.5 py-1 rounded-full font-mono font-bold tracking-widest">
                  9 CORE LITANIES
                </span>
              </div>

              <div className="space-y-3">
                {RATHIB_HADDAD.map((step, idx) => (
                  <div key={step.id} className="bg-black/20 border border-brand-border/40 rounded-xl overflow-hidden transition-all">
                    <button
                      onClick={() => setExpandedRathibId(expandedRathibId === step.id ? null : step.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-black/40 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-lg bg-black/40 border border-brand-gold/30 flex items-center justify-center font-mono font-bold text-xs text-brand-gold">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-brand-cream">{step.title}</h4>
                          <span className="text-[10px] text-brand-gold font-mono font-bold">{step.count}</span>
                        </div>
                      </div>
                      {expandedRathibId === step.id ? <ChevronUp className="w-4 h-4 text-brand-cream-dim" /> : <ChevronDown className="w-4 h-4 text-brand-cream-dim" />}
                    </button>

                    <AnimatePresence>
                      {expandedRathibId === step.id && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden bg-black/30 border-t border-brand-border/40"
                        >
                          <div className="p-4 space-y-4">
                            <p className="text-xl md:text-2xl leading-loose text-right font-serif text-slate-100 font-semibold" dir="rtl">
                              {step.arabicText}
                            </p>
                            <div className="pt-3 border-t border-brand-border/30">
                              <span className="text-[9px] uppercase font-mono text-brand-cream-dim tracking-widest font-bold">Recitation Spelling</span>
                              <p className="text-xs text-brand-cream italic leading-relaxed font-serif mt-1">{step.transliteration}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: MAJLISUNNOOR */}
          {activeTab === "majlis" && (
            <motion.div
              key="majlis"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-brand-border/40 pb-3">
                <div>
                  <h3 className="font-bold font-serif text-brand-gold text-sm tracking-wider">Majlisunnoor (മജ്‌ലിസുന്നൂർ)</h3>
                  <p className="text-[11px] text-brand-cream-dim">Spiritual hymn gathering invoking blessings through the companions of Badr & Uhud.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MAJLISUNNOOR.map((part) => (
                  <div key={part.id} className="bg-black/20 border border-brand-border/50 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3 border-b border-brand-border/40 pb-2">
                        <h4 className="text-xs font-bold font-serif text-brand-gold tracking-wide">{part.title}</h4>
                        <span className="text-[9px] font-mono text-brand-cream-dim font-bold">{part.count}</span>
                      </div>
                      <p className="text-lg leading-loose text-right font-serif text-slate-100 font-semibold line-clamp-6" dir="rtl">
                        {part.arabicText}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-brand-border/40 mt-auto">
                      <span className="text-[9px] uppercase font-mono text-brand-cream-dim block font-bold">Recitation Guide</span>
                      <p className="text-[11px] text-brand-cream italic line-clamp-3 leading-relaxed mt-1 font-serif">{part.transliteration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: ALL MOULIDS */}
          {activeTab === "moulid" && (
            <motion.div
              key="moulid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Moulid Selection Row */}
              <div className="flex flex-col md:flex-row items-center justify-between border-b border-brand-border/40 pb-3 gap-3">
                <div>
                  <h3 className="font-bold font-serif text-brand-gold text-sm tracking-wider">Classical Moulid Recitations</h3>
                  <p className="text-[11px] text-brand-cream-dim">Select any traditional Moulid textbook to read chapters & praises.</p>
                </div>
                <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-xl border border-brand-border/40 w-full md:w-auto">
                  {MOULID_ITEMS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedMoulidId(m.id);
                        onContextChange(`Reading Moulid: ${m.name}`);
                      }}
                      className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg text-[10px] font-bold font-serif uppercase tracking-wider transition-all cursor-pointer ${
                        selectedMoulidId === m.id
                          ? "bg-brand-gold text-brand-bg"
                          : "text-brand-cream-dim hover:text-brand-cream"
                      }`}
                    >
                      {m.id === "manqoos" ? "Manqoos" : m.id === "sharafal_anam" ? "Sharafal Anam" : "Barzanji"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Displaying chapters of selected Moulid */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-brand-gold font-serif tracking-wider flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-brand-gold animate-spin-slow" /> {currentMoulid.name} Text Chapters
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentMoulid.chapters.map((chapter, i) => (
                    <div key={i} className="bg-black/20 border border-brand-border/40 rounded-2xl p-5 space-y-4 flex flex-col">
                      <div className="border-b border-brand-border/30 pb-2">
                        <span className="text-[10px] font-mono font-bold text-brand-gold uppercase">CHAPTER {i + 1}</span>
                        <h5 className="text-xs font-bold font-serif text-brand-cream mt-0.5">{chapter.title}</h5>
                      </div>
                      
                      <p className="text-xl leading-loose text-right font-serif text-slate-100 font-semibold flex-1 whitespace-pre-line" dir="rtl">
                        {chapter.arabicText}
                      </p>

                      <div className="pt-3 border-t border-brand-border/30 mt-4">
                        <span className="text-[9px] uppercase font-mono text-brand-cream-dim block font-bold">Spelling Transliteration</span>
                        <p className="text-xs text-brand-cream italic leading-relaxed font-serif mt-1 whitespace-pre-line">{chapter.transliteration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
