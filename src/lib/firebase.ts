import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  orderBy,
  onSnapshot
} from "firebase/firestore";

// Firebase configuration from our platform-provisioned applet
const firebaseConfig = {
  projectId: "gen-lang-client-0297264341",
  appId: "1:902997519770:web:18ac49ab6fffe26d951e23",
  apiKey: "AIzaSyBWTflq8xwPfM5tg8V3vGboLk3v6KaDNmA",
  authDomain: "gen-lang-client-0297264341.firebaseapp.com",
  storageBucket: "gen-lang-client-0297264341.firebasestorage.app",
  messagingSenderId: "902997519770"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore using the specific databaseId set up for this workspace
export const db = getFirestore(app, "ai-studio-alifdigital-eb33b171-5787-4889-8e4c-bc297f0daf8b");

// Interfaces for Matches and Candidates
export interface Match {
  id?: string;
  title: string;
  description: string;
  type: "Quran Recitation" | "Islamic Speech" | "Hafiz Challenge" | "Islamic Quiz";
  date: string;
  status: "Upcoming" | "Active" | "Completed";
  location: string;
  reward: string;
  createdAt?: any;
}

export interface Candidate {
  id?: string;
  name: string;
  age: number;
  location: string;
  matchId: string; // foreign key to Match
  score: number;
  contact: string;
  notes: string;
  status: "Registered" | "Qualified" | "Winner" | "Runner-up";
  createdAt?: any;
}

// Firestore operations for Matches
export const addMatch = async (match: Omit<Match, "id">) => {
  return await addDoc(collection(db, "matches"), {
    ...match,
    createdAt: new Date().toISOString()
  });
};

export const getMatches = async (): Promise<Match[]> => {
  const q = query(collection(db, "matches"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Match));
};

export const updateMatch = async (id: string, updates: Partial<Match>) => {
  const matchRef = doc(db, "matches", id);
  return await updateDoc(matchRef, updates);
};

export const deleteMatch = async (id: string) => {
  const matchRef = doc(db, "matches", id);
  return await deleteDoc(matchRef);
};

// Firestore operations for Candidates
export const addCandidate = async (candidate: Omit<Candidate, "id">) => {
  return await addDoc(collection(db, "candidates"), {
    ...candidate,
    createdAt: new Date().toISOString()
  });
};

export const getCandidates = async (): Promise<Candidate[]> => {
  const q = query(collection(db, "candidates"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Candidate));
};

export const updateCandidate = async (id: string, updates: Partial<Candidate>) => {
  const candidateRef = doc(db, "candidates", id);
  return await updateDoc(candidateRef, updates);
};

export const deleteCandidate = async (id: string) => {
  const candidateRef = doc(db, "candidates", id);
  return await deleteDoc(candidateRef);
};
