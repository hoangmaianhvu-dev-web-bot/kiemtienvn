
import React, { useState } from 'react';
import { RewardType, User } from '../types';
import { Wallet, Smartphone, Landmark, Sparkles, History, Trophy, TrendingUp, ShieldCheck, Gem, Lock, Info, CheckCircle } from 'lucide-react';

const ACCUMULATION_MILESTONES = [
  { label: '5k', points: 50000, desc: 'Mốc rút cơ bản' },
  { label: '10k', points: 100000, desc: 'Mốc rút phổ thông' },
  { label: '20k', points: 200000, desc: 'Mốc rút nâng cao' },
  { label: '50k', points: 500000, desc: 'Mốc rút ưu tú' },
  { label: '100k', points: 1000000, desc: 'Mốc rút chuyên nghiệp' },
  { label: '200k', points: 2000000, desc: 'Mốc rút kỳ cựu' },
  { label: '500k', points: 5000000, desc: 'Mốc rút cao cấp' },
  { label: '1M', points: 10000000, desc: 'Mốc rút huyền thoại' },
];

const COMMITMENTS = [
  {
    title: 'NGUỒN SẠCH 100%',
    desc: 'NẠP TRỰC TIẾP TỪ NAPTHE.VN',
    icon: <Gem className="w-6 h-6 text-amber-400" />,
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/5',
    iconBg: 'bg-amber-500/10'
  },
  {
    title: 'BẢO HÀNH TRỌN ĐỜI',
    desc: 'KHÔNG BAN ACC - KHÔNG ÂM TIỀN',
    icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/5',
    iconBg: 'bg-blue-500/10'
  },
  {
    title: 'UY TÍN TUYỆT ĐỐI',
    desc: 'HỆ THỐNG NẠP TỰ ĐỘNG QUA ID',
    icon: <Lock className="w-6 h-6 text-amber-500" />,
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/5',
    iconBg: 'bg-amber-500/10'
  }
];

interface WithdrawProps {
  user: User;
  onWithdraw: (cost: number, type: RewardType, amount: number) => void;
  onUpgradeAccumulation: () => void;
}

const Withdraw: React.FC<WithdrawProps> = ({ user, onWithdraw, onUpgradeAccumulation }) => {
  const [activeTab, setActiveTab] = useState<'redeem' | 'history'>('redeem');
  const [selectedReward, setSelectedReward] = useState<RewardType | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [showNote, setShowNote] = useState(false);

  const currentMilestone = ACCUMULATION_MILESTONES[user.accumulationLevel];
  const progress = Math.min((user.points / currentMilestone.points) * 100, 100);
  const isFull = progress >= 100;

  const handleRedeem = () => {
    if (!selectedReward) return alert('Vui lòng chọn loại thưởng!');
    if (user.points < currentMilestone.points) return alert('Chưa đạt mốc tích lũy tối thiểu!');
    if (!inputValue) return alert('Vui lòng nhập thông tin nhận thưởng!');

    const multiplier = currentMilestone.points / 50000;
    let amount = 0;
    let unit = '';

    if (selectedReward === 'QUAN_HUY') {
      amount = 10 * multiplier;
      unit = 'Quân Huy';
    } else if (selectedReward === 'KIM_CUONG') {
      amount = 25 * multiplier;
      unit = 'Kim Cương';
    } else {
      amount = 5000 * multiplier;
      unit = 'VNĐ';
    }

    onWithdraw(currentMilestone.points, selectedReward, amount);
    alert(`Đã gửi yêu cầu rút ${amount.toLocaleString()} ${unit} thành công!`);
    setInputValue('');
    setSelectedReward(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black italic text-white flex items-center gap-3 uppercase">
            <Wallet className="text-amber-500" /> Rút Thưởng Hạng Sang
          </h2>
          <button 
            onClick={() => setShowNote(!showNote)}
            className="p-2 bg-white/5 rounded-full text-slate-400 hover:text-amber-500 transition-all border border-white/10"
          >
            <Info size={18} />
          </button>
        </div>
        
        {showNote && (
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl animate-in slide-in-from-top-2 duration-300">
            <p className="text-[11px] text-amber-400 font-medium leading-relaxed uppercase tracking-wider">
              Hệ thống rút quà tự động dành riêng cho hội viên Diamond Nova. Điểm thưởng được tích lũy theo mốc để đảm bảo quyền lợi cao nhất cho người dùng.
            </p>
          </div>
        )}
        
        <div className="flex gap-4 mt-4 border-b border-white/5">
          <button 
            onClick={() => setActiveTab('redeem')}
            className={`pb-3 px-6 text-xs font-black italic transition-all uppercase tracking-widest ${activeTab === 'redeem' ? 'border-b-2 border-amber-500 text-amber-500' : 'text-slate-500'}`}
          >
            Sảnh đổi quà
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-6 text-xs font-black italic transition-all uppercase tracking-widest ${activeTab === 'history' ? 'border-b-2 border-amber-500 text-amber-500' : 'text-slate-500'}`}
          >
            Nhật ký giao dịch
          </button>
        </div>
      </div>

      {activeTab === 'redeem' ? (
        <div className="space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COMMITMENTS.map((item, idx) => (
              <div 
                key={idx} 
                className={`${item.bgColor} border ${item.borderColor} rounded-[32px] p-6 flex items-center gap-4 transition-all hover:scale-[1.02] cursor-default`}
              >
                <div className={`${item.iconBg} p-4 rounded-2xl`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-white font-black italic uppercase text-sm tracking-tight">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="bg-[#0a0f1e] border border-amber-500/10 rounded-[40px] p-6 md:p-10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none rotate-12">
                <Trophy size={160} className="text-amber-500" />
             </div>

             <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em]">Cấp độ tích lũy: VIP {user.accumulationLevel + 1}</h3>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 rounded-full border border-amber-500/20">
                      <TrendingUp size={10} className="text-amber-500" />
                      <span className="text-[8px] text-amber-500 font-black uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white italic tracking-tighter text-glow-gold">{user.points.toLocaleString()}</span>
                    <span className="text-slate-500 text-sm font-black italic uppercase">/ {currentMilestone.points.toLocaleString()} P</span>
                  </div>
                </div>
                <div className="text-right w-full md:w-auto">
                  <div className="bg-amber-600/10 border border-amber-500/20 px-4 py-2 rounded-2xl inline-block">
                    <span className="text-amber-500 text-xs font-black italic uppercase tracking-widest">Target: {currentMilestone.label} VNĐ</span>
                  </div>
                </div>
             </div>

             <div className="relative h-10 bg-slate-950 rounded-full p-1.5 border border-white/5 mb-8 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(217,119,6,0.3)] relative ${isFull ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500' : 'bg-gradient-to-r from-blue-700 via-blue-500 to-amber-500'}`}
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/5 animate-pulse" />
                </div>
                {isFull && (
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-black uppercase italic tracking-[0.4em] animate-pulse drop-shadow-sm">
                    MỞ KHÓA RÚT THƯỞNG!
                  </div>
                )}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <button 
                  disabled={!isFull}
                  onClick={() => setSelectedReward('QUAN_HUY')}
                  className={`py-4 rounded-2xl border font-black italic uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-1 group ${selectedReward === 'QUAN_HUY' ? 'bg-amber-600 border-amber-400 text-black shadow-lg shadow-amber-600/30' : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-amber-500/50 disabled:opacity-50'}`}
                >
                  <span className="text-xl group-hover:scale-125 transition-transform">⚔️</span> 
                  <span className="text-[10px]">Quân Huy</span>
                </button>
                <button 
                  disabled={!isFull}
                  onClick={() => setSelectedReward('KIM_CUONG')}
                  className={`py-4 rounded-2xl border font-black italic uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-1 group ${selectedReward === 'KIM_CUONG' ? 'bg-amber-600 border-amber-400 text-black shadow-lg shadow-amber-600/30' : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-amber-500/50 disabled:opacity-50'}`}
                >
                  <span className="text-xl group-hover:scale-125 transition-transform">💎</span> 
                  <span className="text-[10px]">Kim Cương</span>
                </button>
                <button 
                  disabled={!isFull}
                  onClick={() => setSelectedReward('VND')}
                  className={`py-4 rounded-2xl border font-black italic uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-1 group ${selectedReward === 'VND' ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-blue-500/50 disabled:opacity-50'}`}
                >
                  <span className="text-xl group-hover:scale-125 transition-transform">💰</span> 
                  <span className="text-[10px]">Tiền Mặt</span>
                </button>
                <button 
                  disabled={!isFull || user.accumulationLevel >= 7}
                  onClick={onUpgradeAccumulation}
                  className={`py-4 rounded-2xl border font-black italic uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-1 group ${isFull && user.accumulationLevel < 7 ? 'bg-gradient-to-br from-amber-400 to-yellow-600 border-amber-300 text-black hover:scale-[1.05]' : 'bg-slate-900/50 border-white/5 text-slate-600 cursor-not-allowed'}`}
                >
                  <TrendingUp size={20} className="group-hover:scale-110 transition-transform" /> 
                  <span className="text-[10px]">Nâng Level</span>
                </button>
             </div>
          </section>

          {selectedReward && (
            <div className="bg-[#0a0f1e] border border-amber-500/30 rounded-[32px] p-6 md:p-10 animate-in slide-in-from-top-6 duration-500 shadow-2xl">
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-amber-500/10 rounded-2xl">
                    {selectedReward === 'VND' ? <Landmark className="text-amber-500" /> : <Smartphone className="text-amber-500" />}
                  </div>
                  <div>
                    <h4 className="text-white font-black italic uppercase text-base tracking-tight">Kênh nhận {selectedReward === 'VND' ? 'Tiền mặt' : 'Quà Game'}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                      {selectedReward === 'VND' ? 'Cung cấp STK Ngân hàng hoặc Ví điện tử' : 'Vui lòng cung cấp đúng ID tài khoản game'}
                    </p>
                  </div>
               </div>
               
               <div className="space-y-5">
                  <div className="relative group">
                    <input 
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={selectedReward === 'VND' ? "Số tài khoản + Ngân hàng nhận tiền..." : "ID GAME (Liên Quân / Free Fire)..."}
                      className="w-full bg-slate-950 border border-white/10 rounded-[20px] px-8 py-5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-black italic uppercase text-sm placeholder:text-slate-700 transition-all"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-amber-500 transition-colors">
                      <CheckCircle size={20} />
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleRedeem}
                    className="w-full bg-amber-600 hover:bg-amber-500 py-5 rounded-[20px] text-black font-black italic uppercase tracking-[0.2em] shadow-2xl shadow-amber-900/40 transition-all active:scale-95"
                  >
                    GỬI YÊU CẦU DUYỆT NGAY
                  </button>
               </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#0a0f1e] border border-white/5 rounded-[40px] p-12 text-center min-h-[400px] flex flex-col items-center justify-center shadow-inner">
           <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mb-6 border border-amber-500/10">
              <History size={40} className="text-slate-800" />
           </div>
           <p className="text-slate-500 font-black italic uppercase text-base tracking-widest">Trống nhật ký</p>
           <button 
            onClick={() => setActiveTab('redeem')}
            className="mt-8 px-8 py-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-2xl text-[10px] font-black italic uppercase tracking-[0.2em] text-amber-500 transition-all"
           >
             QUAY LẠI ĐỔI QUÀ
           </button>
        </div>
      )}
    </div>
  );
};

export default Withdraw;
