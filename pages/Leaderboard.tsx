
import React from 'react';
import { Trophy, Medal, Crown, Star, TrendingUp, Gem, User as UserIcon } from 'lucide-react';

interface LeaderboardProps {
  members: any[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ members }) => {
  const sortedMembers = [...members].sort((a, b) => b.points - a.points);
  const top3 = sortedMembers.slice(0, 3);
  const rest = sortedMembers.slice(3, 10);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
          BẢNG <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-500">VINH DANH</span> THÁNG 5
        </h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] italic">NHỮNG CHIẾN BINH KIẾM TIỀN ĐỈNH CAO NHẤT HỆ THỐNG</p>
      </div>

      {/* PODIUM SECTION */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-0 pt-16">
        {/* RANK 2 */}
        {top3[1] && (
          <div className="w-full md:w-64 space-y-4 order-2 md:order-1 animate-in slide-in-from-bottom-10 duration-700 delay-200">
             <div className="text-center">
                <Medal size={40} className="text-slate-300 mx-auto mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                <div className="w-20 h-20 bg-slate-900 border-4 border-slate-400 rounded-[24px] mx-auto overflow-hidden shadow-2xl relative">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${top3[1].name}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white font-black italic uppercase text-sm mt-4 truncate px-4">{top3[1].name}</h3>
                <span className="text-slate-500 text-[10px] font-black italic">{top3[1].points.toLocaleString()} P</span>
             </div>
             <div className="h-40 bg-gradient-to-t from-slate-400/20 to-slate-400/5 border-x border-t border-white/10 rounded-t-[40px] flex items-center justify-center">
                <span className="text-6xl font-black italic text-slate-400 opacity-20">2</span>
             </div>
          </div>
        )}

        {/* RANK 1 */}
        {top3[0] && (
          <div className="w-full md:w-72 space-y-4 order-1 md:order-2 z-10 scale-110 animate-in slide-in-from-bottom-20 duration-1000">
             <div className="text-center -mb-2">
                <Crown size={60} className="text-amber-500 mx-auto mb-2 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-bounce" />
                <div className="w-24 h-24 bg-slate-900 border-4 border-amber-500 rounded-[32px] mx-auto overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.2)] relative">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${top3[0].name}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white font-black italic uppercase text-lg mt-4 truncate px-4">{top3[0].name}</h3>
                <span className="text-amber-500 text-xs font-black italic tracking-widest">{top3[0].points.toLocaleString()} P</span>
             </div>
             <div className="h-56 bg-gradient-to-t from-amber-500/20 to-amber-500/5 border-x border-t border-amber-500/30 rounded-t-[48px] flex flex-col items-center justify-center shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
                <span className="text-8xl font-black italic text-amber-500 opacity-30">1</span>
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full mt-4">
                   <Star size={12} fill="currentColor" className="text-amber-500" />
                   <span className="text-[10px] font-black text-amber-500 uppercase italic">BEST OF MONTH</span>
                </div>
             </div>
          </div>
        )}

        {/* RANK 3 */}
        {top3[2] && (
          <div className="w-full md:w-60 space-y-4 order-3 md:order-3 animate-in slide-in-from-bottom-10 duration-700 delay-500">
             <div className="text-center">
                <Medal size={40} className="text-amber-700 mx-auto mb-2" />
                <div className="w-18 h-18 bg-slate-900 border-4 border-amber-800 rounded-[20px] mx-auto overflow-hidden shadow-2xl relative">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${top3[2].name}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white font-black italic uppercase text-xs mt-4 truncate px-4">{top3[2].name}</h3>
                <span className="text-amber-800 text-[10px] font-black italic">{top3[2].points.toLocaleString()} P</span>
             </div>
             <div className="h-32 bg-gradient-to-t from-amber-800/20 to-amber-800/5 border-x border-t border-white/10 rounded-t-[32px] flex items-center justify-center">
                <span className="text-5xl font-black italic text-amber-800 opacity-20">3</span>
             </div>
          </div>
        )}
      </div>

      {/* THE REST LIST */}
      <div className="bg-[#0a0f1e] border border-white/5 rounded-[48px] overflow-hidden shadow-2xl">
         <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-white font-black italic uppercase text-xs tracking-widest flex items-center gap-3">
               <TrendingUp size={16} className="text-blue-500" /> TOP CHIẾN BINH TIẾP THEO
            </h3>
            <span className="text-[9px] font-black text-slate-500 italic">DỮ LIỆU CẬP NHẬT 24H</span>
         </div>
         <div className="p-4">
            {rest.map((m, idx) => (
               <div key={m.id} className="flex items-center justify-between p-6 rounded-[28px] hover:bg-white/[0.03] transition-all group">
                  <div className="flex items-center gap-6">
                     <span className="text-lg font-black italic text-slate-700 w-8">#{idx + 4}</span>
                     <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.name}`} alt="Avatar" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex flex-col">
                        <h4 className="text-white font-black italic uppercase text-xs group-hover:text-blue-400 transition-colors">{m.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                           {m.isVip && <Crown size={10} className="text-amber-500" />}
                           <span className="text-[9px] text-slate-600 font-bold uppercase italic tracking-widest">{m.level}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="text-white font-black italic text-sm tracking-tighter">{m.points.toLocaleString()} P</span>
                     <div className="flex items-center gap-1 text-emerald-500">
                        <TrendingUp size={10} />
                        <span className="text-[8px] font-black uppercase">UPDATING</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* REWARDS INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 p-8 rounded-[40px] flex items-center gap-6">
            <div className="w-16 h-16 bg-amber-500 rounded-3xl flex items-center justify-center text-black shadow-2xl">
               <Medal size={32} />
            </div>
            <div>
               <h4 className="text-white font-black italic uppercase text-sm mb-1 tracking-tight">PHẦN THƯỞNG TOP 1</h4>
               <p className="text-[10px] text-slate-400 font-medium italic uppercase tracking-widest">NHẬN NGAY 500.000đ TIỀN MẶT + DANH HIỆU "KINGS OF NOVA"</p>
            </div>
         </div>
         <div className="bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 p-8 rounded-[40px] flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-500 rounded-3xl flex items-center justify-center text-white shadow-2xl">
               <Gem size={32} />
            </div>
            <div>
               <h4 className="text-white font-black italic uppercase text-sm mb-1 tracking-tight">PHẦN THƯỞNG TOP 2-3</h4>
               <p className="text-[10px] text-slate-400 font-medium italic uppercase tracking-widest">NHẬN COMBO 1000 QUÂN HUY + VIP TUẦN MIỄN PHÍ</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Leaderboard;
