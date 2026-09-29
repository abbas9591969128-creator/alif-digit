import React, { useState } from "react";
import { 
  Sparkles, BookOpen, Scroll, Send, Loader2, Copy, Check, Download, 
  ChevronRight, ArrowLeft, ArrowRight, Type, HelpCircle, RefreshCw, ZoomIn, ZoomOut 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SpeechResult {
  title: string;
  content: string;
}

export default function IslamicSpeechGenerator({ onContextChange }: { onContextChange: (ctx: string) => void }) {
  const [topic, setTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [language, setLanguage] = useState("English");
  const [length, setLength] = useState("Medium (10 mins)");
  const [isLoading, setIsLoading] = useState(false);
  const [speech, setSpeech] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl" | "2xl">("lg");
  const [isFullscreenReader, setIsFullscreenReader] = useState(false);

  const presetTopics = [
    { title: "Patience (Sabr) in Times of Difficulty", tag: "Patience" },
    { title: "Honoring & Kindness to Parents (Birr al-Walidayn)", tag: "Parents" },
    { title: "Reliance on Allah (Tawakkul) & Peace of Mind", tag: "Faith" },
    { title: "The Power of Seeking Knowledge (Ilm) in Islam", tag: "Knowledge" },
    { title: "Charity (Sadaqah) & Its Impact on the Soul", tag: "Charity" },
    { title: "The Virtues of Swalath and Love for the Prophet (ﷺ)", tag: "Swalath" },
  ];

  const handleSelectPreset = (title: string) => {
    setTopic(title);
    setCustomTopic("");
    onContextChange(`Topic: ${title}`);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalTopic = customTopic.trim() || topic;
    if (!finalTopic) {
      setError("Please select a preset topic or write your own custom topic.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSpeech(null);

    try {
      const res = await fetch("/api/generate-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: finalTopic,
          language,
          length,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSpeech(data.text);
      } else {
        setError(data.error || "Failed to generate speech. Please check your Gemini API key in Secrets.");
      }
    } catch (err) {
      console.error(err);
      setError("Network Error: Could not connect to the Islamic Speech server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!speech) return;
    navigator.clipboard.writeText(speech);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!speech) return;
    const element = document.createElement("a");
    const file = new Blob([speech], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${(customTopic.trim() || topic).replace(/[^a-z0-9]/gi, "_").toLowerCase()}_speech.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Ornate lightweight markdown formatter for beautiful Quran/Hadeeth presentation
  const renderFormattedSpeech = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      const trimmed = line.trim();
      
      // Headers
      if (trimmed.startsWith("###")) {
        return (
          <h4 key={index} className="text-base font-bold text-brand-gold font-serif mt-6 mb-2 flex items-center gap-1.5 border-b border-brand-border/25 pb-1">
            <span className="text-[10px]">✦</span> {trimmed.replace("###", "").trim()}
          </h4>
        );
      }
      if (trimmed.startsWith("##")) {
        return (
          <h3 key={index} className="text-lg font-bold text-brand-gold font-serif mt-8 mb-3 flex items-center gap-2 border-b border-brand-border/40 pb-1.5">
            <Scroll className="w-4 h-4 text-brand-gold" /> {trimmed.replace("##", "").trim()}
          </h3>
        );
      }
      if (trimmed.startsWith("#")) {
        return (
          <h2 key={index} className="text-xl md:text-2xl font-bold text-brand-gold font-serif mt-10 mb-4 text-center border-2 border-brand-gold/20 p-3 rounded-xl bg-black/25">
            {trimmed.replace("#", "").trim()}
          </h2>
        );
      }

      // Blockquotes (commonly contains Arabic verses or Hadeeths)
      if (trimmed.startsWith(">")) {
        const quoteText = trimmed.replace(">", "").trim();
        const isArabic = /[\u0600-\u06FF]/.test(quoteText);
        return (
          <blockquote 
            key={index} 
            className={`my-4 pl-4 border-l-4 border-brand-gold/60 py-2 italic text-brand-cream/95 bg-brand-gold/5 rounded-r-lg ${
              isArabic ? "text-right pr-4 pl-2 border-l-0 border-r-4 font-serif text-xl md:text-2xl leading-loose" : "font-serif"
            }`}
          >
            {quoteText}
          </blockquote>
        );
      }

      // Check if line contains major Arabic text to format it beautifully larger
      const containsArabic = /[\u0600-\u06FF]/.test(trimmed) && trimmed.length > 10;
      if (containsArabic) {
        return (
          <p key={index} className="text-right font-serif text-xl md:text-2xl leading-loose text-brand-gold my-4 tracking-wide" dir="rtl">
            {trimmed}
          </p>
        );
      }

      // Bullets
      if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        return (
          <li key={index} className="ml-5 list-disc my-1.5 text-brand-cream-dim leading-relaxed">
            {trimmed.substring(1).trim()}
          </li>
        );
      }

      // Empty line
      if (!trimmed) {
        return <div key={index} className="h-2" />;
      }

      // Standard text
      return (
        <p key={index} className="my-2.5 text-brand-cream-dim leading-relaxed font-sans">
          {trimmed}
        </p>
      );
    });
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm": return "text-sm";
      case "base": return "text-base";
      case "lg": return "text-lg";
      case "xl": return "text-xl";
      case "2xl": return "text-2xl";
      default: return "text-lg";
    }
  };

  return (
    <div className="space-y-6" id="speech-generator-stage">
      
      {/* Introduction Card */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-xl border border-brand-gold/20 shrink-0">
            <Scroll className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-brand-gold font-serif tracking-wide flex items-center gap-1.5">
              Inspiring Islamic Speech Generator
            </h2>
            <p className="text-xs text-brand-cream-dim leading-relaxed mt-1">
              Draft beautifully structured, spiritually moving speeches (Khutbahs or Lectures) for Madrasas, Friday prayers, family gatherings, or study circles. The AI automatically incorporates relevant Quranic Aayahs and authentic Sahih Hadeeths in Arabic, accompanied by their translations and transliterations.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Parameters Form */}
        <div className="lg:col-span-1 bg-brand-card border border-brand-border rounded-2xl p-5 space-y-5 shadow-lg">
          <h3 className="text-sm font-bold text-brand-gold font-serif tracking-widest uppercase pb-2 border-b border-brand-border/40 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" /> SPEECH PARAMETERS
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Presets */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Select a Core Topic</label>
              <div className="grid grid-cols-1 gap-1.5 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
                {presetTopics.map((pt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(pt.title)}
                    className={`text-left text-xs p-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                      topic === pt.title && !customTopic
                        ? "bg-brand-gold/15 border-brand-gold text-brand-gold font-bold"
                        : "bg-black/20 border-brand-border/30 text-brand-cream-dim hover:text-brand-cream hover:bg-black/40"
                    }`}
                  >
                    <span className="truncate">{pt.title}</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-black/40 text-brand-gold/80 rounded font-mono border border-brand-gold/10 shrink-0 ml-1">
                      {pt.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Or Enter Your Own Topic</label>
              <input
                type="text"
                value={customTopic}
                onChange={(e) => {
                  setCustomTopic(e.target.value);
                  setTopic("");
                  if (e.target.value) {
                    onContextChange(`Custom Topic: ${e.target.value}`);
                  }
                }}
                placeholder="E.g., Humility, Honesty, Virtues of Ramadan..."
                className="w-full bg-black/45 border border-brand-border/40 focus:border-brand-gold rounded-xl px-3 py-2.5 text-xs text-brand-cream placeholder-brand-cream-dim/50 outline-none transition-all font-serif"
              />
            </div>

            {/* Language Selection */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Speech Language</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { code: "English", label: "English" },
                  { code: "Malayalam", label: "മലയാളം" },
                  { code: "Kannada", label: "ಕನ್ನಡ" },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    className={`text-center text-xs py-2 rounded-lg border transition-all cursor-pointer font-serif ${
                      language === lang.code
                        ? "bg-brand-gold text-brand-bg font-bold border-brand-gold"
                        : "bg-black/20 border-brand-border/30 text-brand-cream-dim hover:text-brand-cream"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Length Selection */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Speech Length / Duration</label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full bg-black/45 border border-brand-border/40 focus:border-brand-gold rounded-xl px-3 py-2.5 text-xs text-brand-cream outline-none transition-all font-serif cursor-pointer"
              >
                <option value="Short (5 mins - Concise)">Short (5 mins - Concise Khutbah)</option>
                <option value="Medium (10 mins - Standard)">Medium (10 mins - Standard Speech)</option>
                <option value="Detailed (20 mins - Complete)">Detailed (20 mins - Complete Lecture)</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (!topic && !customTopic.trim())}
              className="w-full bg-brand-gold hover:bg-brand-gold-hover disabled:bg-black/45 disabled:text-brand-cream-dim/40 text-brand-bg font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-widest font-serif"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-brand-bg" />
                  <span>Weaving Speech...</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4" />
                  <span>Generate Speech</span>
                </>
              )}
            </button>
          </form>

          {/* Quick instructions banner */}
          <div className="p-3 bg-black/30 border border-brand-border/30 rounded-xl text-[11px] text-brand-cream-dim leading-relaxed flex items-start gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
            <span>The speech will open in the reading board. You can copy, download, adjust fonts, or open <strong>Presentation Mode</strong> to preach or practice directly from your screen!</span>
          </div>
        </div>

        {/* Right Side: Speech Display Board */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#05261f] text-brand-cream border-4 border-brand-gold rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[460px] shadow-2xl relative"
              >
                <div className="absolute inset-2 border border-brand-gold/15 rounded-2xl pointer-events-none"></div>
                <div className="absolute top-4 left-4 text-brand-gold/30 font-serif">✦</div>
                <div className="absolute top-4 right-4 text-brand-gold/30 font-serif">✦</div>
                <div className="absolute bottom-4 left-4 text-brand-gold/30 font-serif">✦</div>
                <div className="absolute bottom-4 right-4 text-brand-gold/30 font-serif">✦</div>

                <div className="relative flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full border-4 border-brand-gold/25 border-t-brand-gold animate-spin"></div>
                  <Scroll className="w-6 h-6 text-brand-gold absolute animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-brand-gold font-serif tracking-widest uppercase">Weaving Speech</h3>
                <p className="text-xs text-brand-cream-dim max-w-md mt-2.5 leading-relaxed">
                  Reflecting on the core topic <strong>"{customTopic.trim() || topic}"</strong> to assemble authenticated Quranic Aayahs and Sahih Hadeeths alongside inspiring commentary...
                </p>
                <div className="mt-8 flex flex-wrap gap-1.5 justify-center max-w-sm">
                  <span className="text-[10px] bg-black/40 border border-brand-border/20 px-2 py-0.5 rounded text-brand-gold font-mono">Consulting Tafseer</span>
                  <span className="text-[10px] bg-black/40 border border-brand-border/20 px-2 py-0.5 rounded text-brand-gold font-mono">Retrieving Arabic Quranic text</span>
                  <span className="text-[10px] bg-black/40 border border-brand-border/20 px-2 py-0.5 rounded text-brand-gold font-mono">Formatting Hadeeth texts</span>
                </div>
              </motion.div>
            ) : speech ? (
              <motion.div
                key="speech-ready"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-brand-card border-2 border-brand-gold/70 rounded-3xl overflow-hidden shadow-2xl relative"
              >
                {/* Board Ornate Header / Controls bar */}
                <div className="bg-black/50 px-4 md:px-6 py-3 border-b border-brand-border flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-brand-gold animate-pulse" />
                    <span className="text-xs font-bold text-brand-gold tracking-widest font-serif uppercase">ORATOR READER</span>
                  </div>

                  {/* Font & Utility controls */}
                  <div className="flex items-center gap-2">
                    {/* Font Size Adjusters */}
                    <div className="flex items-center bg-black/40 rounded-lg p-1 border border-brand-border/40">
                      <button
                        onClick={() => {
                          if (fontSize === "2xl") setFontSize("xl");
                          else if (fontSize === "xl") setFontSize("lg");
                          else if (fontSize === "lg") setFontSize("base");
                          else if (fontSize === "base") setFontSize("sm");
                        }}
                        disabled={fontSize === "sm"}
                        className="p-1 hover:bg-brand-gold/15 text-brand-cream-dim hover:text-brand-gold disabled:opacity-40 rounded transition-all cursor-pointer"
                        title="Smaller Text"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] font-mono font-bold text-brand-gold px-1.5 uppercase">{fontSize}</span>
                      <button
                        onClick={() => {
                          if (fontSize === "sm") setFontSize("base");
                          else if (fontSize === "base") setFontSize("lg");
                          else if (fontSize === "lg") setFontSize("xl");
                          else if (fontSize === "xl") setFontSize("2xl");
                        }}
                        disabled={fontSize === "2xl"}
                        className="p-1 hover:bg-brand-gold/15 text-brand-cream-dim hover:text-brand-gold disabled:opacity-40 rounded transition-all cursor-pointer"
                        title="Larger Text"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Copy Button */}
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 text-[10px] bg-black/40 hover:bg-brand-gold/20 text-brand-cream hover:text-brand-gold border border-brand-border/40 px-2 py-1.5 rounded-lg transition-all cursor-pointer"
                      title="Copy speech content"
                    >
                      {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>

                    {/* Download Button */}
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1 text-[10px] bg-black/40 hover:bg-brand-gold/20 text-brand-cream hover:text-brand-gold border border-brand-border/40 px-2 py-1.5 rounded-lg transition-all cursor-pointer"
                      title="Download text file"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>

                    {/* Preaching Mode */}
                    <button
                      onClick={() => setIsFullscreenReader(true)}
                      className="flex items-center gap-1 text-[10px] bg-brand-gold text-brand-bg font-bold px-2.5 py-1.5 rounded-lg transition-all cursor-pointer hover:bg-brand-gold-hover"
                      title="Open full screen preaching view"
                    >
                      <Type className="w-3 h-3" />
                      <span>Preach Mode</span>
                    </button>
                  </div>
                </div>

                {/* Ornate Inner borders */}
                <div className="p-6 md:p-8 space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar bg-gradient-to-b from-brand-card to-black/30">
                  <div className="border border-brand-gold/10 p-4 rounded-2xl bg-black/15">
                    <div className={`font-serif prose prose-invert ${getFontSizeClass()} text-brand-cream leading-relaxed`}>
                      {renderFormattedSpeech(speech)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-brand-card border border-red-500/30 text-center p-8 rounded-2xl flex flex-col items-center justify-center min-h-[300px]"
              >
                <div className="text-red-400 font-bold mb-2">Speech Generation Failed</div>
                <p className="text-xs text-brand-cream-dim max-w-md mb-4">{error}</p>
                <button
                  onClick={handleGenerate}
                  className="bg-black/40 hover:bg-brand-gold/10 text-brand-gold border border-brand-gold/40 px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Try Again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-brand-card/50 border border-brand-border/40 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[460px]"
              >
                <div className="w-16 h-16 rounded-full bg-brand-gold/5 border border-brand-gold/15 flex items-center justify-center mb-4 text-brand-gold">
                  <Scroll className="w-7 h-7" />
                </div>
                <h3 className="text-base font-serif text-brand-gold tracking-widest uppercase">SPEECH DISPLAY BOARD</h3>
                <p className="text-xs text-brand-cream-dim max-w-sm mt-2 leading-relaxed">
                  Select one of the preset Islamic topics on the left sidebar, or write a custom topic of your own, then click "Generate Speech" to draft an eloquent oratorical layout with authentic references.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Presentation Fullscreen Mode Reader Modal */}
      <AnimatePresence>
        {isFullscreenReader && speech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#031511] text-brand-cream flex flex-col overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="bg-black/60 px-6 py-4 border-b border-brand-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Scroll className="w-5 h-5 text-brand-gold animate-pulse" />
                <div>
                  <h1 className="font-serif font-bold text-brand-gold tracking-wider text-base">
                    PREACHING & ORATORY COMPANION
                  </h1>
                  <p className="text-[10px] text-brand-cream-dim">Distraction-Free Teleprompter & Reader Mode</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Adjust text size */}
                <div className="flex items-center bg-black/40 rounded-lg p-1.5 border border-brand-border/40">
                  <button
                    onClick={() => {
                      if (fontSize === "2xl") setFontSize("xl");
                      else if (fontSize === "xl") setFontSize("lg");
                      else if (fontSize === "lg") setFontSize("base");
                    }}
                    disabled={fontSize === "base"}
                    className="p-1 hover:bg-brand-gold/15 text-brand-cream-dim hover:text-brand-gold disabled:opacity-30 rounded transition-all cursor-pointer"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono font-bold text-brand-gold px-2 uppercase">{fontSize}</span>
                  <button
                    onClick={() => {
                      if (fontSize === "base") setFontSize("lg");
                      else if (fontSize === "lg") setFontSize("xl");
                      else if (fontSize === "xl") setFontSize("2xl");
                    }}
                    disabled={fontSize === "2xl"}
                    className="p-1 hover:bg-brand-gold/15 text-brand-cream-dim hover:text-brand-gold disabled:opacity-30 rounded transition-all cursor-pointer"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setIsFullscreenReader(false)}
                  className="bg-brand-gold text-brand-bg font-serif font-bold px-4 py-2 rounded-lg text-xs hover:bg-brand-gold-hover transition-all cursor-pointer"
                >
                  Exit Preach Mode
                </button>
              </div>
            </div>

            {/* Modal Content - Wide, central, beautifully scaled readable container */}
            <div className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 space-y-6">
              <div className="border border-brand-gold/20 rounded-3xl p-8 md:p-12 bg-black/40 shadow-inner relative">
                {/* Subtle watermarked crescent or star background */}
                <div className="absolute top-4 left-4 text-brand-gold/20 font-serif text-sm select-none">✦</div>
                <div className="absolute top-4 right-4 text-brand-gold/20 font-serif text-sm select-none">✦</div>
                <div className="absolute bottom-4 left-4 text-brand-gold/20 font-serif text-sm select-none">✦</div>
                <div className="absolute bottom-4 right-4 text-brand-gold/20 font-serif text-sm select-none">✦</div>

                <div className={`font-serif prose prose-invert ${getFontSizeClass()} text-brand-cream leading-loose space-y-4`}>
                  {renderFormattedSpeech(speech)}
                </div>
              </div>
            </div>

            {/* Bottom bar of preacher helper */}
            <div className="bg-black/50 border-t border-brand-border py-4 px-6 text-center text-xs text-brand-gold font-serif">
              May Allah bless your speech and reward your intention to spread true spiritual knowledge.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
