
import React, { useState } from 'react';
import { User } from '../types';
import { Share2, Gift, UserPlus, Users, Coins, TrendingUp, Copy, CheckCircle2 } from 'lucide-react';

interface ReferralProps {
  user: User;
}

const REFERRAL_REWARD = 2000; // 2000 points per referral

const Referral: React.FC<ReferralProps> = ({ user }) => {
  const [copied, setCopied] = useState(false);
  
  const referralLink = `${window.location.origin}${window.location.pathname}?ref=${user.id}`;

  const formatK = (val: number) => {
    return val >= 1000 ? (val / 1000).toFixed(1) + 'K' : val;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900/20 to-indigo-900/10 p-8 md:p-16 rounded-[40px] border border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-12">
          <Share2 size={200} className="text-blue-500" />
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl space-y-6">
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] italic">
                  <Gift size={16} /> CHƯƠNG TRÌNH ĐẠI SỨ NOVA
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.9] uppercase tracking-tighter italic">
                  MỜI BẠN <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                    NHẬN {REFERRAL_REWARD.toLocaleString()} P
                  </span>
                </h1>
                <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed italic">
                  Chia sẻ link giới thiệu của bạn cho bạn bè. Khi họ đăng ký tài khoản, bạn sẽ nhận được <b className="text-blue-400">{formatK(REFERRAL_REWARD)} Điểm</b> vào số dư ngay lập tức!
                </p>
            </div>

            <div className="w-full lg:w-80 bg-black/40 backdrop-blur-md p-8 rounded-[32px] border border-white/10 shadow-inner flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-blue-600/20 rounded-3xl flex items-center justify-center border border-blue-500/30">
                   <UserPlus size={32} className="text-blue-400" />
                </div>
                <div>
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Mã giới thiệu của bạn</span>
                   <h3 className="text-2xl font-black text-white tracking-widest uppercase italic">{user.id.substring(0, 8)}</h3>
                </div>
            </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0a0f1e] p-8 rounded-[32px] border border-white/5 border-l-8 border-l-emerald-500 flex items-center justify-between group hover:bg-white/[0.05] transition-all shadow-xl">
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 italic">Người đã mời</span>
            <h2 className="text-4xl font-black text-white italic tracking-tighter">{user.referralCount || 0}</h2>
          </div>
          <div className="p-5 bg-emerald-500/10 rounded-2xl text-emerald-500 group-hover:scale-110 transition-transform">
             <Users size={32} />
          </div>
        </div>

        <div className="bg-[#0a0f1e] p-8 rounded-[32px] border border-white/5 border-l-8 border-l-amber-500 flex items-center justify-between group hover:bg-white/[0.05] transition-all shadow-xl">
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 italic">Hoa hồng nhận được</span>
            <h2 className="text-4xl font-black text-white italic tracking-tighter">{formatK(user.referralBonus || 0)} <span className="text-sm text-amber-500">P</span></h2>
          </div>
          <div className="p-5 bg-amber-500/10 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform">
             <Coins size={32} />
          </div>
        </div>
      </div>

      {/* Link Sharing Section */}
      <div className="bg-[#0a0f1e] p-8 md:p-12 rounded-[40px] border border-white/5 space-y-8 relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-30"></div>
         <div className="text-center space-y-3">
            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center justify-center gap-3">
               <TrendingUp size={24} className="text-blue-500" /> LINK GIỚI THIỆU CỦA BẠN
            </h3>
            <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest italic">Copy link dưới đây và gửi cho bạn bè qua Zalo, Facebook, Telegram</p>
         </div>

         <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-blue-400 font-bold text-xs truncate shadow-inner flex items-center">
               {referralLink}
            </div>
            <button 
              onClick={copyToClipboard}
              className={`px-8 py-4 rounded-2xl font-black uppercase italic tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl ${copied ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'}`}
            >
              {copied ? <><CheckCircle2 size={18} /> ĐÃ COPY</> : <><Copy size={18} /> COPY LINK</>}
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
            <div className="text-center space-y-2">
               <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mx-auto text-slate-400 mb-2 font-black italic">01</div>
               <h4 className="text-white font-black text-[10px] uppercase italic tracking-tight">CHIA SẺ LINK</h4>
               <p className="text-slate-500 text-[9px] font-bold uppercase tracking-tighter">Gửi link mời cho bạn bè của bạn</p>
            </div>
            <div className="text-center space-y-2">
               <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mx-auto text-slate-400 mb-2 font-black italic">02</div>
               <h4 className="text-white font-black text-[10px] uppercase italic tracking-tight">BẠN BÈ ĐĂNG KÝ</h4>
               <p className="text-slate-500 text-[9px] font-bold uppercase tracking-tighter">Họ nhấn vào link và tạo tài khoản</p>
            </div>
            <div className="text-center space-y-2">
               <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mx-auto text-slate-400 mb-2 font-black italic">03</div>
               <h4 className="text-white font-black text-[10px] uppercase italic tracking-tight">NHẬN HOA HỒNG</h4>
               <p className="text-slate-500 text-[9px] font-bold uppercase tracking-tighter">Hệ thống cộng điểm ngay lập tức</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Referral;
