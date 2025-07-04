import { create } from 'zustand';
import type { God } from '../data/gods';
import type { QuestionAnswer } from '../utils/fortune';

interface FortuneState {
  // ユーザー入力
  birthDate: string;
  gender: 'male' | 'female' | 'other' | null;
  bloodType: 'A' | 'B' | 'O' | 'AB' | null;
  answers: QuestionAnswer[];
  
  // 診断結果
  destinyNumber: number | null;
  stemBranch: { stem: string; branch: string } | null;
  nineStar: string | null;
  guardianGod: God | null;
  
  // アクション
  setBirthDate: (date: string) => void;
  setGender: (gender: 'male' | 'female' | 'other') => void;
  setBloodType: (bloodType: 'A' | 'B' | 'O' | 'AB') => void;
  addAnswer: (answer: QuestionAnswer) => void;
  setFortuneResult: (result: {
    destinyNumber: number;
    stemBranch: { stem: string; branch: string };
    nineStar: string;
    guardianGod: God;
  }) => void;
  reset: () => void;
}

const initialState = {
  birthDate: '',
  gender: null,
  bloodType: null,
  answers: [],
  destinyNumber: null,
  stemBranch: null,
  nineStar: null,
  guardianGod: null,
};

export const useFortuneStore = create<FortuneState>((set) => ({
  ...initialState,
  
  setBirthDate: (date) => set({ birthDate: date }),
  setGender: (gender) => set({ gender }),
  setBloodType: (bloodType) => set({ bloodType }),
  addAnswer: (answer) => set((state) => ({ 
    answers: [...state.answers, answer] 
  })),
  setFortuneResult: (result) => set({
    destinyNumber: result.destinyNumber,
    stemBranch: result.stemBranch,
    nineStar: result.nineStar,
    guardianGod: result.guardianGod,
  }),
  reset: () => set(initialState),
}));