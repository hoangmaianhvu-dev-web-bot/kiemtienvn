
export type RewardType = 'VND' | 'QUAN_HUY' | 'KIM_CUONG';

export interface User {
  id: string;
  name: string;
  photoURL?: string; 
  points: number; 
  exp: number;
  level: number;
  balanceVND: number;
  balanceQH: number;
  balanceKC: number;
  tasksCompleted: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  accumulationLevel: number; 
  joinDate: string; 
  referralCount?: number;
  referralBonus?: number;
  usedGiftcodes: string[]; 
  savedArticles: string[];
  reputation: number; // Điểm uy tín (0-100)
  isVip: boolean;
  vipExpiry?: string;
  birthday?: string; // Định dạng YYYY-MM-DD
}

export interface VipHistory {
  id: string;
  userName: string;
  packageName: string;
  price: number;
  date: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  rewardValue: number; 
  rewardType: RewardType;
  shortLink: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Gaming' | 'Web' | 'Special';
  xpReward: number;
}
