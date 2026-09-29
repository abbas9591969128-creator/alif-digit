import React, { useState, useEffect } from "react";
import { 
  Trophy, Users, Calendar, Award, Plus, Trash2, Edit3, CheckCircle, 
  MapPin, PhoneCall, Star, Search, ShieldCheck, RefreshCw, FileText, 
  X, ChevronRight, Sparkles, Filter, Check, Save, Layers, UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  db, Match, Candidate, addMatch, getMatches, updateMatch, deleteMatch,
  addCandidate, getCandidates, updateCandidate, deleteCandidate
} from "../lib/firebase";

export default function CompetitionPortal({ onContextChange }: { onContextChange: (ctx: string) => void }) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Tab toggles: public portal vs admin console
  const [portalTab, setPortalTab] = useState<"portal" | "admin">("portal");
  const [adminMode, setAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");

  // Filter & Search states
  const [matchSearch, setMatchSearch] = useState("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("All");
  const [selectedMatchForCandidates, setSelectedMatchForCandidates] = useState<string>("All");

  // Add Match Form states
  const [matchTitle, setMatchTitle] = useState("");
  const [matchDescription, setMatchDescription] = useState("");
  const [matchType, setMatchType] = useState<Match["type"]>("Quran Recitation");
  const [matchDate, setMatchDate] = useState("");
  const [matchStatus, setMatchStatus] = useState<Match["status"]>("Upcoming");
  const [matchLocation, setMatchLocation] = useState("");
  const [matchReward, setMatchReward] = useState("");
  const [editingMatchId, setEditingMatchId] = useState<string | null>(null);

  // Add Candidate Form states
  const [candName, setCandName] = useState("");
  const [candAge, setCandAge] = useState<number>(12);
  const [candLocation, setCandLocation] = useState("");
  const [candMatchId, setCandMatchId] = useState("");
  const [candScore, setCandScore] = useState<number>(0);
  const [candContact, setCandContact] = useState("");
  const [candNotes, setCandNotes] = useState("");
  const [candStatus, setCandStatus] = useState<Candidate["status"]>("Registered");
  const [editingCandId, setEditingCandId] = useState<string | null>(null);

  // Elegant Toast notification state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Dynamic Custom Confirmation Modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };


  // Load Data from Firebase Firestore
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedMatches = await getMatches();
      const fetchedCandidates = await getCandidates();
      setMatches(fetchedMatches);
      setCandidates(fetchedCandidates);
      
      // Auto-select first match in candidate form if available
      if (fetchedMatches.length > 0 && !candMatchId) {
        setCandMatchId(fetchedMatches[0].id || "");
      }
    } catch (err: any) {
      console.error("Firebase fetch error:", err);
      setError("Failed to load official competition data from Firestore. Please verify security rules or your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    onContextChange("Competitions Portal - Matches & Candidates");
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === "admin123" || adminPassword === "alif2026") {
      setAdminMode(true);
      setAdminPasswordError("");
    } else {
      setAdminPasswordError("Invalid administrator passcode. (Try 'alif2026')");
    }
  };

  const handleCreateOrUpdateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchTitle.trim() || !matchDate || !matchLocation) {
      showToast("Please fill in the official Title, Date, and Location.", "error");
      return;
    }

    try {
      const matchData: Omit<Match, "id"> = {
        title: matchTitle,
        description: matchDescription,
        type: matchType,
        date: matchDate,
        status: matchStatus,
        location: matchLocation,
        reward: matchReward,
      };

      if (editingMatchId) {
        await updateMatch(editingMatchId, matchData);
        showToast("Competition match successfully updated!", "success");
      } else {
        await addMatch(matchData);
        showToast("New competition match registered successfully!", "success");
      }

      // Reset Match Form
      setMatchTitle("");
      setMatchDescription("");
      setMatchType("Quran Recitation");
      setMatchDate("");
      setMatchStatus("Upcoming");
      setMatchLocation("");
      setMatchReward("");
      setEditingMatchId(null);
      
      // Reload
      await loadData();
    } catch (err: any) {
      showToast("Error saving competition match: " + err.message, "error");
    }
  };

  const handleCreateOrUpdateCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candName.trim() || !candMatchId) {
      showToast("Please enter the Candidate's name and select their target match format.", "error");
      return;
    }

    try {
      const candData: Omit<Candidate, "id"> = {
        name: candName,
        age: Number(candAge),
        location: candLocation,
        matchId: candMatchId,
        score: Number(candScore),
        contact: candContact,
        notes: candNotes,
        status: candStatus
      };

      if (editingCandId) {
        await updateCandidate(editingCandId, candData);
        showToast("Candidate registry information successfully updated!", "success");
      } else {
        await addCandidate(candData);
        showToast("New candidate enrolled and scores officially recorded!", "success");
      }

      // Reset Candidate Form
      setCandName("");
      setCandAge(12);
      setCandLocation("");
      setCandScore(0);
      setCandContact("");
      setCandNotes("");
      setCandStatus("Registered");
      setEditingCandId(null);

      // Reload
      await loadData();
    } catch (err: any) {
      showToast("Error registering candidate: " + err.message, "error");
    }
  };

  const handleDeleteMatch = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Competition Match?",
      message: "Are you absolutely sure you want to delete this match format? Enrolled candidates will remain in the system but will no longer point to an active competition record.",
      onConfirm: async () => {
        try {
          await deleteMatch(id);
          showToast("Match format successfully deleted from registry.", "info");
          await loadData();
        } catch (err: any) {
          showToast("Delete failed: " + err.message, "error");
        }
        setConfirmModal(null);
      }
    });
  };

  const handleDeleteCandidate = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Remove Candidate?",
      message: "Are you absolutely sure you want to remove this candidate from the competition registry? This action is irreversible.",
      onConfirm: async () => {
        try {
          await deleteCandidate(id);
          showToast("Candidate successfully removed from competition board.", "info");
          await loadData();
        } catch (err: any) {
          showToast("Delete failed: " + err.message, "error");
        }
        setConfirmModal(null);
      }
    });
  };

  const handleEditMatch = (m: Match) => {
    setEditingMatchId(m.id || null);
    setMatchTitle(m.title);
    setMatchDescription(m.description);
    setMatchType(m.type);
    setMatchDate(m.date);
    setMatchStatus(m.status);
    setMatchLocation(m.location);
    setMatchReward(m.reward);
  };

  const handleEditCandidate = (c: Candidate) => {
    setEditingCandId(c.id || null);
    setCandName(c.name);
    setCandAge(c.age);
    setCandLocation(c.location);
    setCandMatchId(c.matchId);
    setCandScore(c.score);
    setCandContact(c.contact);
    setCandNotes(c.notes);
    setCandStatus(c.status);
  };

  // Helper formatting match name
  const getMatchTitleById = (id: string) => {
    const found = matches.find(m => m.id === id);
    return found ? found.title : "Unknown Competition";
  };

  // Filtered lists
  const filteredMatches = matches.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(matchSearch.toLowerCase()) || 
                          m.location.toLowerCase().includes(matchSearch.toLowerCase());
    const matchesType = selectedTypeFilter === "All" || m.type === selectedTypeFilter;
    return matchesSearch && matchesType;
  });

  const filteredCandidates = candidates.filter(c => {
    return selectedMatchForCandidates === "All" || c.matchId === selectedMatchForCandidates;
  });

  return (
    <div className="space-y-8" id="competition-portal-wrapper">
      
      {/* Official Header Banner */}
      <div className="bg-white border border-brand-border rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-brand-gold/10 text-brand-gold rounded-2xl border border-brand-gold/20 shrink-0">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-brand-accent-gold uppercase tracking-widest font-mono bg-brand-accent-gold/10 px-2 py-0.5 rounded">Official Portal</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-brand-cream-dim">Cloud Sync Active</span>
              </div>
              <h2 className="text-2xl font-bold text-brand-gold font-serif mt-1">
                Islamic Competitions & Match Registry
              </h2>
              <p className="text-xs text-brand-cream-dim leading-relaxed mt-1 max-w-2xl">
                Track dynamic Quran recitation tournaments, speech matches, and Islamic quizzes. Experience transparent leaderboards, official participant status cards, and live scoring synced directly via secure Google Cloud Firestore.
              </p>
            </div>
          </div>
          
          {/* Quick Stats Summary */}
          <div className="flex items-center gap-3 bg-brand-bg/50 border border-brand-border/45 p-4 rounded-2xl shrink-0 self-start md:self-auto">
            <div className="text-center px-4 border-r border-brand-border/40">
              <div className="text-xl font-bold text-brand-gold font-serif">{matches.length}</div>
              <div className="text-[9px] text-brand-cream-dim uppercase font-mono tracking-wider mt-0.5">Total Matches</div>
            </div>
            <div className="text-center px-4">
              <div className="text-xl font-bold text-brand-accent-gold font-serif">{candidates.length}</div>
              <div className="text-[9px] text-brand-cream-dim uppercase font-mono tracking-wider mt-0.5">Candidates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Bar & Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-brand-border pb-4">
        
        {/* Navigation Tabs */}
        <div className="flex bg-slate-200/60 p-1 rounded-xl border border-slate-300/40 w-full sm:w-auto">
          <button
            onClick={() => setPortalTab("portal")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold font-serif tracking-wider transition-all cursor-pointer ${
              portalTab === "portal"
                ? "bg-brand-gold text-white shadow-sm"
                : "text-brand-cream-dim hover:text-brand-cream"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Public Leaderboard & Matches</span>
          </button>
          <button
            onClick={() => setPortalTab("admin")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold font-serif tracking-wider transition-all cursor-pointer ${
              portalTab === "admin"
                ? "bg-brand-gold text-white shadow-sm"
                : "text-brand-cream-dim hover:text-brand-cream"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Admin Console</span>
          </button>
        </div>

        {/* Sync Status Button */}
        <button 
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs bg-white hover:bg-slate-50 text-brand-cream border border-brand-border px-3 py-2 rounded-xl transition-all cursor-pointer shadow-sm shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-brand-gold ${loading ? "animate-spin" : ""}`} />
          <span>{loading ? "Syncing..." : "Sync Database"}</span>
        </button>

      </div>

      {/* Main View Panel */}
      <AnimatePresence mode="wait">
        
        {/* TAB 1: Public Leaderboard & Portal */}
        {portalTab === "portal" && (
          <motion.div
            key="portal-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Top filters */}
            <div className="grid md:grid-cols-3 gap-4 bg-white p-4 rounded-2xl border border-brand-border shadow-sm">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-brand-cream-dim" />
                <input
                  type="text"
                  value={matchSearch}
                  onChange={(e) => setMatchSearch(e.target.value)}
                  placeholder="Search matches or locations..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl pl-9 pr-4 py-2.5 text-xs text-brand-cream placeholder-brand-cream-dim/50 outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <select
                  value={selectedTypeFilter}
                  onChange={(e) => setSelectedTypeFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2.5 text-xs text-brand-cream outline-none cursor-pointer"
                >
                  <option value="All">All Match Formats</option>
                  <option value="Quran Recitation">Quran Recitation</option>
                  <option value="Islamic Speech">Islamic Speech</option>
                  <option value="Hafiz Challenge">Hafiz Challenge</option>
                  <option value="Islamic Quiz">Islamic Quiz</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-brand-accent-gold shrink-0" />
                <select
                  value={selectedMatchForCandidates}
                  onChange={(e) => setSelectedMatchForCandidates(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2.5 text-xs text-brand-cream outline-none cursor-pointer font-serif"
                >
                  <option value="All">All Competitors (Universal list)</option>
                  {matches.map(m => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid Layout: Matches on the Left, Live Scores on the Right */}
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Matches list */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-xs font-bold text-brand-gold font-serif tracking-widest uppercase flex items-center gap-1.5 pb-1 border-b border-brand-border/45">
                  <Calendar className="w-4 h-4 text-brand-gold" /> Scheduled & Active Matches ({filteredMatches.length})
                </h3>

                {filteredMatches.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-300">
                    <p className="text-xs text-brand-cream-dim">No matching competitions found. Add matches in the Admin tab to populate the Registry.</p>
                  </div>
                ) : (
                  filteredMatches.map(m => (
                    <div 
                      key={m.id} 
                      className={`bg-white border rounded-2xl p-5 hover:shadow-md transition-all relative overflow-hidden group ${
                        selectedMatchForCandidates === m.id 
                          ? "border-brand-gold ring-1 ring-brand-gold/30 bg-brand-gold/[0.02]" 
                          : "border-brand-border"
                      }`}
                    >
                      {/* Left vertical border color indicator */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        m.status === "Active" ? "bg-green-500" : m.status === "Completed" ? "bg-slate-400" : "bg-brand-accent-gold"
                      }`}></div>

                      <div className="flex justify-between items-start gap-2">
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold uppercase ${
                          m.status === "Active" 
                            ? "bg-green-100 text-green-700 border border-green-200" 
                            : m.status === "Completed" 
                            ? "bg-slate-100 text-slate-600 border border-slate-200" 
                            : "bg-blue-100 text-blue-700 border border-blue-200"
                        }`}>
                          {m.status}
                        </span>
                        <span className="text-[10px] font-serif font-bold text-brand-accent-gold">{m.type}</span>
                      </div>

                      <h4 className="text-sm font-bold text-brand-cream mt-2.5 font-serif group-hover:text-brand-gold transition-colors">{m.title}</h4>
                      <p className="text-xs text-brand-cream-dim mt-1.5 line-clamp-2 leading-relaxed">{m.description || "No official description provided."}</p>
                      
                      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] text-brand-cream-dim font-mono">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-brand-gold" />
                          <span className="truncate">{m.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-brand-gold" />
                          <span>{m.date}</span>
                        </div>
                      </div>

                      {m.reward && (
                        <div className="mt-2.5 bg-brand-accent-gold/10 rounded-lg p-2 flex items-center gap-1.5 border border-brand-accent-gold/10">
                          <Award className="w-3.5 h-3.5 text-brand-accent-gold shrink-0" />
                          <span className="text-[10px] font-serif text-brand-cream font-bold">Reward: <span className="text-brand-accent-gold">{m.reward}</span></span>
                        </div>
                      )}

                      <div className="mt-3.5 flex justify-end">
                        <button
                          onClick={() => setSelectedMatchForCandidates(m.id || "All")}
                          className="text-[10px] font-bold text-brand-gold hover:text-brand-gold-hover flex items-center gap-0.5 font-serif cursor-pointer"
                        >
                          <span>View Competitors</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>

              {/* Leaderboards */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center pb-1 border-b border-brand-border/45">
                  <h3 className="text-xs font-bold text-brand-gold font-serif tracking-widest uppercase flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-brand-gold" /> 
                    {selectedMatchForCandidates === "All" ? "Universal Candidates Board" : `${getMatchTitleById(selectedMatchForCandidates)} Leaderboard`}
                  </h3>
                  <span className="text-[10px] text-brand-cream-dim bg-slate-100 px-2 py-0.5 rounded font-mono font-bold">
                    {filteredCandidates.length} enrolled
                  </span>
                </div>

                {filteredCandidates.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-brand-border flex flex-col items-center justify-center min-h-[300px]">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-brand-cream-dim mb-3">
                      <Users className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-serif font-bold text-brand-cream">No Registered Candidates</h4>
                    <p className="text-xs text-brand-cream-dim max-w-sm mt-1">There are no candidates registered for this competition yet. Admins can register and score candidates via the admin console.</p>
                  </div>
                ) : (
                  <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-[10px] text-brand-cream font-mono uppercase tracking-wider">
                            <th className="py-3.5 px-4 font-bold">Rank</th>
                            <th className="py-3.5 px-4 font-bold">Candidate Info</th>
                            <th className="py-3.5 px-4 font-bold">Competition Format</th>
                            <th className="py-3.5 px-4 font-bold">Official Status</th>
                            <th className="py-3.5 px-4 font-bold text-right">Score / 100</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredCandidates
                            .sort((a, b) => b.score - a.score)
                            .map((c, index) => {
                              // Highlight top 3 ranks
                              const isTopRank = index < 3;
                              const rankColors = [
                                "bg-amber-500 text-white shadow-sm ring-2 ring-amber-100", // Gold
                                "bg-slate-400 text-white shadow-sm ring-2 ring-slate-100", // Silver
                                "bg-amber-700 text-white shadow-sm ring-2 ring-amber-100"  // Bronze
                              ];
                              
                              return (
                                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                                  <td className="py-4 px-4 font-mono text-xs">
                                    {isTopRank ? (
                                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${rankColors[index]}`}>
                                        {index + 1}
                                      </span>
                                    ) : (
                                      <span className="text-brand-cream-dim pl-2 font-medium">#{index + 1}</span>
                                    )}
                                  </td>
                                  <td className="py-4 px-4">
                                    <div>
                                      <div className="text-xs font-bold text-brand-cream group-hover:text-brand-gold transition-colors">{c.name}</div>
                                      <div className="text-[10px] text-brand-cream-dim flex items-center gap-1.5 mt-0.5">
                                        <span>Age: {c.age}</span>
                                        <span>•</span>
                                        <span>{c.location || "Unspecified"}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4 text-[11px] text-brand-cream font-medium font-serif">
                                    {getMatchTitleById(c.matchId)}
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase border ${
                                      c.status === "Winner" 
                                        ? "bg-amber-50 text-amber-700 border-amber-200" 
                                        : c.status === "Qualified" 
                                        ? "bg-green-50 text-green-700 border-green-200" 
                                        : c.status === "Runner-up"
                                        ? "bg-purple-50 text-purple-700 border-purple-200"
                                        : "bg-slate-100 text-slate-700 border-slate-200"
                                    }`}>
                                      {c.status}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4 text-right font-mono text-sm font-bold text-brand-gold">
                                    {c.score} <span className="text-[10px] text-slate-400 font-normal">pts</span>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: Official Admin Console */}
        {portalTab === "admin" && (
          <motion.div
            key="admin-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {!adminMode ? (
              /* Admin Authentication Gate */
              <div className="max-w-md mx-auto bg-white border border-brand-border rounded-3xl p-8 shadow-xl text-center">
                <div className="w-14 h-14 bg-brand-gold/10 text-brand-gold border border-brand-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold font-serif text-brand-gold">Administrator Verification</h3>
                <p className="text-xs text-brand-cream-dim mt-1">Please enter your official administrator passcode to manage competition matches, register candidates, and post scores.</p>
                
                <form onSubmit={handleAdminLogin} className="mt-5 space-y-3">
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter Admin Passcode"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-4 py-2.5 text-sm text-center text-brand-cream outline-none focus:ring-1 focus:ring-brand-gold/20"
                  />
                  {adminPasswordError && (
                    <p className="text-[11px] text-red-500 font-medium">{adminPasswordError}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-brand-gold hover:bg-brand-gold-hover text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider font-serif cursor-pointer transition-all"
                  >
                    Unlock Console
                  </button>
                </form>
                
                <p className="text-[10px] text-brand-cream-dim/60 mt-4 italic">Note: For workspace convenience, try the standard security code <strong>alif2026</strong></p>
              </div>
            ) : (
              /* Authenticated Admin Dashboard */
              <div className="space-y-8">
                
                {/* Admin Top Controls */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-emerald-800 font-serif">Verified Administrator Account • alif2026</span>
                  </div>
                  <button
                    onClick={() => {
                      setAdminMode(false);
                      setAdminPassword("");
                    }}
                    className="text-xs bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-100/50 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-serif font-bold"
                  >
                    Lock Console
                  </button>
                </div>

                {/* Grid Layout: Manage Matches Form & Manage Candidates Form */}
                <div className="grid lg:grid-cols-2 gap-8">
                  
                  {/* PANEL A: Manage Matches */}
                  <div className="bg-white border border-brand-border rounded-3xl p-6 shadow-sm space-y-6">
                    <h3 className="text-sm font-bold text-brand-gold font-serif tracking-widest uppercase pb-2 border-b border-brand-border flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-brand-gold" />
                        {editingMatchId ? "EDIT COMPETITION MATCH" : "CREATE COMPETITION MATCH"}
                      </span>
                      {editingMatchId && (
                        <button 
                          onClick={() => {
                            setEditingMatchId(null);
                            setMatchTitle("");
                            setMatchDescription("");
                            setMatchDate("");
                            setMatchLocation("");
                            setMatchReward("");
                          }}
                          className="text-[10px] text-red-500 font-bold hover:underline"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </h3>

                    <form onSubmit={handleCreateOrUpdateMatch} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Match Title</label>
                          <input
                            type="text"
                            value={matchTitle}
                            onChange={(e) => setMatchTitle(e.target.value)}
                            placeholder="E.g., Quran Memorization League"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream outline-none"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Format / Type</label>
                          <select
                            value={matchType}
                            onChange={(e) => setMatchType(e.target.value as Match["type"])}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream outline-none"
                          >
                            <option value="Quran Recitation">Quran Recitation</option>
                            <option value="Islamic Speech">Islamic Speech</option>
                            <option value="Hafiz Challenge">Hafiz Challenge</option>
                            <option value="Islamic Quiz">Islamic Quiz</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Description / Guidelines</label>
                        <textarea
                          value={matchDescription}
                          onChange={(e) => setMatchDescription(e.target.value)}
                          placeholder="What are the criteria for points, age brackets, or surahs requested?"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream outline-none h-16 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Date</label>
                          <input
                            type="date"
                            value={matchDate}
                            onChange={(e) => setMatchDate(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream outline-none"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Match Status</label>
                          <select
                            value={matchStatus}
                            onChange={(e) => setMatchStatus(e.target.value as Match["status"])}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream outline-none"
                          >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Active">Active / Live</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Location</label>
                          <input
                            type="text"
                            value={matchLocation}
                            onChange={(e) => setMatchLocation(e.target.value)}
                            placeholder="E.g., Central Mosque Hall / Online"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream outline-none"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Official Reward / Trophy</label>
                          <input
                            type="text"
                            value={matchReward}
                            onChange={(e) => setMatchReward(e.target.value)}
                            placeholder="E.g., Gold Medal & Certificate"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-brand-gold hover:bg-brand-gold-hover text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider font-serif cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        <span>{editingMatchId ? "Save Changes" : "Register New Competition Match"}</span>
                      </button>
                    </form>

                    {/* Quick list with edit/delete controls for matches */}
                    <div className="space-y-2 mt-6 pt-6 border-t border-slate-100">
                      <h4 className="text-[10px] font-bold text-brand-cream-dim tracking-wider uppercase font-mono">Registered Matches ({matches.length})</h4>
                      <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar">
                        {matches.map(m => (
                          <div key={m.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3 text-xs">
                            <div className="truncate">
                              <span className="font-bold text-brand-cream font-serif">{m.title}</span>
                              <span className="text-[9px] text-brand-gold font-mono ml-2">({m.type})</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button 
                                onClick={() => handleEditMatch(m)}
                                className="p-1 hover:bg-brand-gold/15 text-brand-gold hover:text-brand-gold-hover rounded cursor-pointer"
                                title="Edit Match"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteMatch(m.id || "")}
                                className="p-1 hover:bg-red-50 text-red-500 hover:text-red-700 rounded cursor-pointer"
                                title="Delete Match"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* PANEL B: Manage Candidates */}
                  <div className="bg-white border border-brand-border rounded-3xl p-6 shadow-sm space-y-6">
                    <h3 className="text-sm font-bold text-brand-gold font-serif tracking-widest uppercase pb-2 border-b border-brand-border flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-brand-gold" />
                        {editingCandId ? "EDIT CANDIDATE REGISTRY" : "ENROLL NEW CANDIDATE"}
                      </span>
                      {editingCandId && (
                        <button 
                          onClick={() => {
                            setEditingCandId(null);
                            setCandName("");
                            setCandAge(12);
                            setCandLocation("");
                            setCandScore(0);
                            setCandContact("");
                            setCandNotes("");
                            setCandStatus("Registered");
                          }}
                          className="text-[10px] text-red-500 font-bold hover:underline"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </h3>

                    <form onSubmit={handleCreateOrUpdateCandidate} className="space-y-4">
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Target Competition Match</label>
                        <select
                          value={candMatchId}
                          onChange={(e) => setCandMatchId(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream outline-none font-serif"
                          required
                        >
                          <option value="">Select an active match format</option>
                          {matches.map(m => (
                            <option key={m.id} value={m.id}>{m.title} ({m.type})</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Candidate Name</label>
                          <input
                            type="text"
                            value={candName}
                            onChange={(e) => setCandName(e.target.value)}
                            placeholder="E.g., Ahmad Abdullah"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream outline-none"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Age</label>
                          <input
                            type="number"
                            value={candAge}
                            onChange={(e) => setCandAge(Number(e.target.value))}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Official Score (Out of 100)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={candScore}
                            onChange={(e) => setCandScore(Number(e.target.value))}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream font-mono font-bold text-brand-gold outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Candidate Status</label>
                          <select
                            value={candStatus}
                            onChange={(e) => setCandStatus(e.target.value as Candidate["status"])}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream outline-none"
                          >
                            <option value="Registered">Registered</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Winner">Winner</option>
                            <option value="Runner-up">Runner-Up</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Location / District</label>
                          <input
                            type="text"
                            value={candLocation}
                            onChange={(e) => setCandLocation(e.target.value)}
                            placeholder="E.g., Calicut, Kerala"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Contact Info</label>
                          <input
                            type="text"
                            value={candContact}
                            onChange={(e) => setCandContact(e.target.value)}
                            placeholder="E.g., +91 9591969128"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-brand-gold tracking-wider uppercase font-mono">Examiner / Jury Notes</label>
                        <textarea
                          value={candNotes}
                          onChange={(e) => setCandNotes(e.target.value)}
                          placeholder="Note on pronunciation, Tajweed flow, or speech confidence..."
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl px-3 py-2 text-xs text-brand-cream outline-none h-16 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-brand-gold hover:bg-brand-gold-hover text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider font-serif cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>{editingCandId ? "Save Registry Updates" : "Enroll Candidate & Score"}</span>
                      </button>
                    </form>

                    {/* Quick list with edit/delete controls for candidates */}
                    <div className="space-y-2 mt-6 pt-6 border-t border-slate-100">
                      <h4 className="text-[10px] font-bold text-brand-cream-dim tracking-wider uppercase font-mono">Enrolled Candidates ({candidates.length})</h4>
                      <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar">
                        {candidates.map(c => (
                          <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3 text-xs">
                            <div className="truncate">
                              <span className="font-bold text-brand-cream">{c.name}</span>
                              <span className="text-[9px] text-brand-gold font-mono ml-2">Score: {c.score} pts</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button 
                                onClick={() => handleEditCandidate(c)}
                                className="p-1 hover:bg-brand-gold/15 text-brand-gold hover:text-brand-gold-hover rounded cursor-pointer"
                                title="Edit Candidate"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteCandidate(c.id || "")}
                                className="p-1 hover:bg-red-50 text-red-500 hover:text-red-700 rounded cursor-pointer"
                                title="Delete Candidate"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>

      {/* Modern, Beautiful Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white border border-slate-100 rounded-2xl shadow-xl p-4 flex items-start gap-3"
          >
            <div className={`p-2 rounded-xl shrink-0 ${
              toast.type === "success" 
                ? "bg-green-50 text-green-600" 
                : toast.type === "error" 
                ? "bg-red-50 text-red-600" 
                : "bg-blue-50 text-blue-600"
            }`}>
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 font-serif">System Notification</p>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Elegant, Custom Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmModal?.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-100 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold font-serif text-slate-800">{confirmModal.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{confirmModal.message}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  onClick={() => setConfirmModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 border border-slate-100 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmModal.onConfirm}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm shadow-red-600/10"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
