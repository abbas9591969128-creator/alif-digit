import React, { useState, useEffect } from "react";
import { SWALATH_ITEMS, SwalathItem } from "../data/islamicData";
import { Flame, RefreshCw, Layers, Sparkles, Check, ChevronRight, Bookmark, History, Calendar, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SwalathCounterProps {
  onContextChange: (context: string) => void;
}

interface CountHistoryItem {
  id: string;
  swalathName: string;
  count: number;
  target: number;
  timestamp: string;
}

export default function SwalathCounter({ onContextChange }: SwalathCounterProps) {
  const [selectedSwalath, setSelectedSwalath] = useState<SwalathItem>(SWALATH_ITEMS[0]);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [history, setHistory] = useState<CountHistoryItem[]>([]);
  const [streak, setStreak] = useState(0);

  // Initialize and load from local storage
  useEffect(() => {
    const savedCount = localStorage.getItem(`swalath_count_${selectedSwalath.id}`);
    if (savedCount) setCount(parseInt(savedCount, 10));

    const savedHistory = localStorage.getItem("swalath_history");
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedStreak = localStorage.getItem("swalath_streak");
    if (savedStreak) setStreak(parseInt(savedStreak, 10));
    else {
      // Set a random start streak for beautiful visualization, say 5
      setStreak(5);
      localStorage.setItem("swalath_streak", "5");
    }
  }, [selectedSwalath]);

  const selectSwalathHandler = (item: SwalathItem) => {
    setSelectedSwalath(item);
    onContextChange(`Reciting ${item.name}`);
    const savedCount = localStorage.getItem(`swalath_count_${item.id}`);
    setCount(savedCount ? parseInt(savedCount, 10) : 0);
  };

  // Web Audio API custom click synthesizer (zero-external dependency click sound)
  const playClickSound = () => {
    if (!audioEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      // Slightly higher pitch for target hit
      const isTargetHit = (count + 1) % target === 0;
      osc.frequency.setValueAtTime(isTargetHit ? 880 : 523, audioCtx.currentTime); // C5 or A5
      
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.error("Audio synth error:", e);
    }
  };

  const handleIncrement = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    localStorage.setItem(`swalath_count_${selectedSwalath.id}`, nextCount.toString());
    playClickSound();

    // If device supports vibration, give subtle feedback
    if (navigator.vibrate) {
      navigator.vibrate(12);
    }
  };

  const handleReset = () => {
    if (count > 0) {
      // Save to history before reset
      const newHistoryItem: CountHistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        swalathName: selectedSwalath.name.split(" (")[0],
        count: count,
        target: target,
        timestamp: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const updatedHistory = [newHistoryItem, ...history].slice(0, 10); // Keep last 10
      setHistory(updatedHistory);
      localStorage.setItem("swalath_history", JSON.stringify(updatedHistory));

      // Update streak
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      localStorage.setItem("swalath_streak", nextStreak.toString());
    }

    setCount(0);
    localStorage.setItem(`swalath_count_${selectedSwalath.id}`, "0");
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("swalath_history");
  };

  const progressPercentage = Math.min((count / target) * 100, 100);

  return (
    <div className="space-y-8" id="swalath-section">
      {/* Page Title */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-gold font-serif tracking-widest flex items-center gap-2">
            <Flame className="w-5 h-5 text-brand-gold" />
            SWALATH SANCTUARY & TASBIH
          </h2>
          <p className="text-xs text-brand-cream-dim">Recite high-virtue Swalaths and keep track of your salutations with the sensory counter.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-black/40 px-3.5 py-1.5 rounded-xl border border-brand-border/40">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-ping"></span>
            <span className="text-[10px] uppercase font-mono text-brand-gold tracking-widest font-bold">Recitation Streak:</span>
            <span className="text-xs font-bold text-brand-cream">{streak} days</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Useful Swalath Catalogue Column (Left) */}
        <div className="lg:col-span-4 bg-brand-card border border-brand-border rounded-2xl p-4 max-h-[600px] overflow-y-auto space-y-4 custom-scrollbar">
          <div className="border-b border-brand-border/40 pb-2">
            <span className="text-xs text-brand-cream font-serif font-semibold tracking-wider">Select Swalath to Count</span>
          </div>

          <div className="space-y-2">
            {SWALATH_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => selectSwalathHandler(item)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedSwalath.id === item.id
                    ? "bg-brand-gold/15 border-brand-gold text-brand-gold shadow-md"
                    : "bg-black/20 border-transparent hover:border-brand-border/60 text-brand-cream-dim hover:text-brand-cream"
                }`}
              >
                <h4 className="text-sm font-semibold text-brand-cream mb-0.5 group-hover:text-brand-gold transition-colors">{item.name}</h4>
                <p className="text-[11px] text-brand-cream-dim/70 line-clamp-2 leading-relaxed">{item.benefits}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Sensory Tapper/Tasbih Counter Column (Middle) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-between bg-brand-card border border-brand-border rounded-2xl p-6 md:p-8 shadow-xl min-h-[500px]">
          
          {/* Target presets */}
          <div className="w-full flex items-center justify-between border-b border-brand-border/40 pb-4 mb-4">
            <span className="text-xs text-brand-cream font-serif font-medium">Goal Target</span>
            <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-lg border border-brand-border/30">
              {[33, 100, 313, 1000, 4444].map((t) => (
                <button
                  key={t}
                  onClick={() => setTarget(t)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all cursor-pointer font-bold ${
                    target === t
                      ? "bg-brand-gold text-brand-bg"
                      : "text-brand-cream-dim hover:text-brand-cream"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Large sensory circle */}
          <div className="relative my-6 flex items-center justify-center">
            {/* Outer animated ring */}
            <svg className="w-64 h-64 transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="112"
                stroke="rgba(196, 161, 99, 0.05)"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="128"
                cy="128"
                r="112"
                stroke="#c4a163"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 112}
                strokeDashoffset={2 * Math.PI * 112 * (1 - progressPercentage / 100)}
                className="transition-all duration-300 ease-out"
                strokeLinecap="round"
              />
            </svg>

            {/* Tap core trigger */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleIncrement}
              className="absolute w-48 h-48 rounded-full bg-gradient-to-b from-brand-card via-black/40 to-black/70 border-4 border-brand-border/80 hover:border-brand-gold flex flex-col items-center justify-center shadow-inner cursor-pointer"
            >
              <div className="text-[10px] uppercase font-mono tracking-widest text-brand-gold mb-1 font-bold">RECITATIONS</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={count}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="text-4xl md:text-5xl font-mono font-black text-brand-cream leading-none"
                >
                  {count}
                </motion.div>
              </AnimatePresence>
              <div className="text-[11px] font-mono text-brand-cream-dim/70 mt-2">of {target}</div>
            </motion.button>
          </div>

          {/* Controls: Reset, Audio, Saved label */}
          <div className="w-full flex items-center justify-between border-t border-brand-border/40 pt-4 mt-4">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="p-2.5 bg-black/30 hover:bg-black/50 border border-brand-border/40 rounded-xl text-brand-cream-dim hover:text-brand-cream transition-colors cursor-pointer"
              title={audioEnabled ? "Mute beep sound" : "Unmute beep sound"}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-brand-gold" /> : <VolumeX className="w-4 h-4 text-brand-cream-dim" />}
            </button>

            <span className="text-[10px] text-brand-cream-dim/60 font-mono tracking-wider italic font-semibold">TAP CIRCLE TO COUNT</span>

            <button
              onClick={handleReset}
              className="px-3.5 py-2 bg-black/35 hover:bg-black/55 hover:text-brand-gold border border-brand-border/50 rounded-xl text-brand-cream-dim font-serif text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer font-bold"
              title="Save current and reset"
            >
              <RefreshCw className="w-3.5 h-3.5 text-brand-gold" />
              Reset & Save
            </button>
          </div>

        </div>

        {/* Litany Card Info & History Logs Column (Right) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Active Swalath Text Card */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-5 shadow-lg">
            <h3 className="text-xs uppercase font-mono tracking-widest text-brand-gold mb-2.5 flex items-center gap-1.5 font-bold">
              <Bookmark className="w-3.5 h-3.5 text-brand-gold" /> Recitation Verse
            </h3>
            <div className="space-y-4">
              <p className="text-xl leading-relaxed text-right font-serif text-slate-100 py-3.5 border-y border-brand-border/40" dir="rtl">
                {selectedSwalath.arabicText}
              </p>
              <div>
                <span className="text-[10px] uppercase font-mono text-brand-gold tracking-widest block mb-1 font-bold">Transliteration</span>
                <p className="text-xs text-brand-cream italic leading-relaxed">{selectedSwalath.transliteration}</p>
              </div>
            </div>
          </div>

          {/* History Logs */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
            <div className="flex items-center justify-between border-b border-brand-border/40 pb-2 mb-3">
              <span className="text-xs font-bold text-brand-cream font-serif tracking-wider flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-brand-gold" /> Recitation Log
              </span>
              {history.length > 0 && (
                <button onClick={clearHistory} className="text-[10px] text-brand-cream-dim hover:text-brand-gold cursor-pointer font-semibold font-serif">
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-[160px] overflow-y-auto custom-scrollbar">
              {history.map((log) => (
                <div key={log.id} className="p-2 bg-black/25 rounded-xl flex items-center justify-between text-xs border border-brand-border/30">
                  <div>
                    <h5 className="font-semibold text-brand-cream">{log.swalathName}</h5>
                    <p className="text-[9px] text-brand-cream-dim/80 flex items-center gap-1 mt-0.5 font-sans">
                      <Calendar className="w-3 h-3 text-brand-gold" /> {log.timestamp}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-brand-gold font-bold">{log.count}</span>
                    <span className="text-[10px] text-brand-cream-dim">/{log.target}</span>
                  </div>
                </div>
              ))}

              {history.length === 0 && (
                <div className="py-6 text-center text-[11px] text-brand-cream-dim/60">
                  No recorded recitations yet. Tap "Reset & Save" on the counter to log progress.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
