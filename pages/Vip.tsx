
import React, { useState } from 'react';
import { Crown, Sparkles, Zap, ShieldCheck, Gem, History, Trophy, CheckCircle2, Star, Timer, Heart } from 'lucide-react';
import { User, VipHistory } from '../types';

interface VipProps {
  user: User;
  history: VipHistory[];
  onBuy: (packageName: string, price: number) => void;
}

const VIP_PACKAGES = [
  { id: '1', name: 'VIP NGÀY', price: 15000, duration: '24 Giờ', bonus: '+10% Điểm', color: 'border-blue-500/30' },
  { id: '2', name: 'VIP TUẦN', price: 75000, duration: '7 Ngày', bonus: '+25% Điểm', color: 'border-indigo-500/40', popular: true },
  { id: '3', name: 'VIP THÁNG', price: 250000, duration: '30 Ngày', bonus: '+50% Điểm', color: 'border-amber-500/50' },
  { id: '4', name: 'VIP NĂM', price: 1990000, duration: '365 Ngày', bonus: 'X2 Điểm Thưởng', color: 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' },
];

const Vip: React.FC<VipProps> = ({ user, history, onBuy }) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'history'>('buy');

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a0f1e] to-amber-950/20 p-12 md:p-20 rounded-[48px] border border-amber-500/20 shadow-2xl text-center">
        <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none rotate-12">
          <Crown size={240} className="text-amber-500" />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-6 py-2 rounded-full">
            <Sparkles size={16} className="text-amber-500" />
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] italic">ĐẶC QUYỀN HOÀNG GIA</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
            NÂNG CẤP <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">THÀNH VIÊN VIP</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto italic font-medium">
            Tận hưởng đặc quyền ưu tiên duyệt rút, tăng tỉ lệ cộng điểm và nhận hỗ trợ riêng biệt 24/7 từ đội ngũ Admin Diamond Nova.
          </p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-white/5 overflow-x-auto pb-1">
        <button onClick={() => setActiveTab('buy')} className={`px-8 py-4 text-xs font-black italic uppercase tracking-widest flex items-center gap-3 ${activeTab === 'buy' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-500'}`}>
          <Zap size={16} /> MUA GÓI VIP
        </button>
        <button onClick={() => setActiveTab('history')} className={`px-8 py-4 text-xs font-black italic uppercase tracking-widest flex items-center gap-3 ${activeTab === 'history' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-500'}`}>
          <History size={16} /> LỊCH SỬ MUA
        </button>
      </div>

      {activeTab === 'buy' ? (
        <div className="space-y-16">
          {/* VIP Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VIP_PACKAGES.map((pkg) => (
              <div key={pkg.id} className={`bg-[#0a0f1e] border-2 ${pkg.color} rounded-[40px] p-8 relative flex flex-col items-center text-center transition-all hover:translate-y-[-8px] hover:shadow-2xl`}>
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-black px-6 py-1.5 rounded-full text-[9px] font-black uppercase italic tracking-widest shadow-xl">
                    PHỔ BIẾN NHẤT
                  </div>
                )}
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mb-6 text-amber-500 shadow-inner">
                   <Crown size={32} />
                </div>
                <h3 className="text-xl font-black italic text-white mb-1 uppercase">{pkg.name}</h3>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-6 italic">{pkg.duration}</span>
                
                <div className="mb-8">
                   <span className="text-3xl font-black italic text-white">{pkg.price.toLocaleString()}đ</span>
                </div>

                <div className="w-full space-y-4 mb-10">
                   <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-bold uppercase italic">
                      <CheckCircle2 size={14} /> {pkg.bonus}
                   </div>
                   <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase italic">
                      <CheckCircle2 size={14} /> ƯU TIÊN DUYỆT RÚT
                   </div>
                </div>

                <button 
                  onClick={() => onBuy(pkg.name, pkg.price)}
                  className="w-full bg-white/5 hover:bg-amber-600 text-amber-500 hover:text-black py-4 rounded-2xl font-black italic uppercase text-[11px] tracking-widest transition-all border border-amber-500/20 active:scale-95"
                >
                  THANH TOÁN NGAY
                </button>
              </div>
            ))}
          </div>

          {/* Benefits Info */}
          <div className="bg-[#0a0f1e] border border-white/5 rounded-[48px] p-10 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-12">
             <div className="text-center space-y-4">
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mx-auto"><Gem size={28} /></div>
                <h4 className="text-white font-black italic uppercase text-sm">QUÀ TẶNG SINH NHẬT</h4>
                <p className="text-[11px] text-slate-500 font-medium italic leading-relaxed uppercase">Nhận ngay combo quà tặng cực phẩm vào ngày sinh nhật của bạn.</p>
             </div>
             <div className="text-center space-y-4">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mx-auto"><ShieldCheck size={28} /></div>
                <h4 className="text-white font-black italic uppercase text-sm">BẢO HIỂM THU NHẬP</h4>
                <p className="text-[11px] text-slate-500 font-medium italic leading-relaxed uppercase">Bù 100% điểm nếu nhiệm vụ gặp lỗi hoặc hệ thống bảo trì đột xuất.</p>
             </div>
             <div className="text-center space-y-4">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 mx-auto"><Zap size={28} /></div>
                <h4 className="text-white font-black italic uppercase text-sm">TRÌNH DUYỆT RIÊNG</h4>
                <p className="text-[11px] text-slate-500 font-medium italic leading-relaxed uppercase">Truy cập máy chủ làm nhiệm vụ tốc độ cao, không quảng cáo pop-up.</p>
             </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0a0f1e] border border-white/5 rounded-[48px] overflow-hidden shadow-2xl">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.02] text-[10px] font-black text-slate-500 uppercase tracking-widest italic border-b border-white/5">
                    <th className="px-10 py-6">MÃ GIAO DỊCH</th>
                    <th className="px-10 py-6">GÓI DỊCH VỤ</th>
                    <th className="px-10 py-6">GIÁ TIỀN</th>
                    <th className="px-10 py-6">THỜI GIAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {history.map((h) => (
                    <tr key={h.id} className="text-xs font-bold italic text-white hover:bg-white/[0.02] transition-colors">
                      <td className="px-10 py-6 uppercase text-slate-500">#{h.id.substring(0,8)}</td>
                      <td className="px-10 py-6 text-amber-500">{h.packageName}</td>
                      <td className="px-10 py-6">{h.price.toLocaleString()}đ</td>
                      <td className="px-10 py-6 text-slate-400">{h.date}</td>
                    </tr>
                  ))}
                  {history.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-20 text-center text-slate-500 font-black uppercase italic tracking-widest opacity-30">Chưa có lịch sử giao dịch VIP</td>
                    </tr>
                  )}
                </tbody>
              </table>
           </div>
        </div>
      )}

      {/* TOP VIP PRESTIGE */}
      <section className="space-y-6">
         <div className="flex items-center gap-3 px-1">
            <Trophy size={20} className="text-amber-500" />
            <h3 className="text-white font-black italic uppercase text-sm tracking-widest">TOP HỘI VIÊN DANH GIÁ</h3>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/10 p-6 rounded-[32px] text-center space-y-3 shadow-xl">
                 <div className="w-14 h-14 bg-slate-900 border-2 border-amber-500 rounded-2xl mx-auto flex items-center justify-center relative shadow-lg">
                    <span className="text-lg font-black italic text-white">M</span>
                    <Star size={16} fill="currentColor" className="absolute -top-2 -right-2 text-amber-500" />
                 </div>
                 <h4 className="text-white font-black italic uppercase text-[10px] truncate">MEMBER_00{i}</h4>
                 <div className="flex items-center justify-center gap-1 text-amber-500">
                    <Timer size={10} />
                    <span className="text-[8px] font-black uppercase">VIP TRỌN ĐỜI</span>
                 </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default Vip;
