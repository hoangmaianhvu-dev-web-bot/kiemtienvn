
import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { Trophy, Zap, Clock, ChevronRight, Star, TrendingUp, Sparkles, Activity, Megaphone, Gem, ShieldCheck, Lock, Info, X, MessageSquare, Mail, Send } from 'lucide-react';
import { generateEconomyAnalysis } from '../services/geminiService';
import { Link } from 'react-router-dom';

const ACCUMULATION_MILESTONES = [
  { label: '5k', points: 50000 },
  { label: '10k', points: 100000 },
  { label: '20k', points: 200000 },
  { label: '50k', points: 500000 },
  { label: '100k', points: 1000000 },
  { label: '200k', points: 2000000 },
  { label: '500k', points: 5000000 },
  { label: '1M', points: 10000000 },
];

const COMMITMENTS = [
  {
    title: 'NGUỒN SẠCH 100%',
    desc: 'TỪ NAPTHE.VN',
    icon: <Gem size={16} className="text-amber-400" />,
    borderColor: 'border-amber-500/20',
    bgColor: 'bg-amber-500/5',
  },
  {
    title: 'BẢO HÀNH TRỌN ĐỜI',
    desc: 'KHÔNG ÂM TIỀN',
    icon: <ShieldCheck size={16} className="text-blue-400" />,
    borderColor: 'border-blue-500/20',
    bgColor: 'bg-blue-500/5',
  },
  {
    title: 'UY TÍN TUYỆT ĐỐI',
    desc: 'NẠP QUA ID',
    icon: <Lock size={16} className="text-amber-500" />,
    borderColor: 'border-amber-500/20',
    bgColor: 'bg-amber-500/5',
  }
];

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [aiMessage, setAiMessage] = useState<string>('Đang phân tích dữ liệu tích lũy của bạn...');
  const [showHelp, setShowHelp] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({ subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  
  const currentMilestone = ACCUMULATION_MILESTONES[user.accumulationLevel];
  const progress = Math.min((user.points / currentMilestone.points) * 100, 100);

  useEffect(() => {
    const fetchAiMessage = async () => {
      const msg = await generateEconomyAnalysis(user);
      setAiMessage(msg || 'Hãy hoàn thành thêm nhiệm vụ để nhận quà!');
    };
    fetchAiMessage();
  }, [user.level, user.tasksCompleted]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      alert('Yêu cầu hỗ trợ đã được gửi tới Super Admin! Chúng tôi sẽ phản hồi sớm nhất qua hòm thư của bạn.');
      setIsSending(false);
      setShowContactModal(false);
      setContactForm({ subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-10 max-w-full overflow-x-hidden">
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 px-1">
        <div className="space-y-1 relative group">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-amber-500 tracking-tighter uppercase leading-none">
              DIAMOND NOVA HUB
            </h1>
            <button 
              onClick={() => setShowHelp(!showHelp)}
              className="p-1.5 bg-white/5 rounded-full text-slate-500 hover:text-amber-500 transition-all border border-white/5"
            >
              <Info size={16} />
            </button>
          </div>
          <p className="text-[7px] md:text-[10px] text-slate-500 font-black italic uppercase tracking-[0.2em]">
            HỆ THỐNG NHIỆM VỤ - KIẾM TIỀN <span className="text-amber-600">ONLINE 24/7</span>
          </p>

          {showHelp && (
            <div className="absolute top-full left-0 mt-4 z-50 w-72 md:w-80 bg-[#0a0f1e] border border-amber-500/30 p-6 rounded-3xl shadow-2xl animate-in slide-in-from-top-2 duration-300 backdrop-blur-xl">
               <div className="flex justify-between items-center mb-4">
                  <h4 className="text-amber-500 font-black italic uppercase text-[10px] tracking-widest">HƯỚNG DẪN NHANH</h4>
                  <button onClick={() => setShowHelp(false)} className="text-slate-600 hover:text-white"><X size={14} /></button>
               </div>
               <ul className="space-y-3 text-[10px] text-slate-400 font-bold uppercase italic tracking-tight">
                  <li className="flex gap-2"><span className="text-amber-500">01.</span> LÀM NHIỆM VỤ TẠI TRÌNH DUYỆT ĐỂ TÍCH LŨY ĐIỂM (P).</li>
                  <li className="flex gap-2"><span className="text-amber-500">02.</span> ĐỦ MỐC TÍCH LŨY, BẠN CÓ THỂ RÚT QUÀ GAME HOẶC TIỀN MẶT.</li>
                  <li className="flex gap-2"><span className="text-amber-500">03.</span> MỜI BẠN BÈ ĐỂ NHẬN THÊM HOA HỒNG TRỰC TIẾP.</li>
               </ul>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowContactModal(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-black italic uppercase text-[9px] tracking-widest transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
          >
            <MessageSquare size={14} /> LIÊN HỆ ADMIN
          </button>
          <div className="bg-[#0a0f1e]/60 backdrop-blur-md border border-amber-500/20 rounded-xl px-4 py-2 flex items-center gap-3 shadow-xl">
             <div className="flex flex-col items-end leading-none">
                <span className="text-[7px] font-black text-slate-600 uppercase italic tracking-widest mb-1">SERVER STATUS</span>
                <span className="text-amber-500 font-black italic text-[9px] md:text-[10px] uppercase tracking-tighter">PREMIUM EDITION</span>
             </div>
             <Activity size={16} className="text-amber-500 animate-pulse shrink-0" />
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-r from-[#0a0f1e] via-blue-900/20 to-[#0a0f1e] border border-white/5 rounded-[20px] md:rounded-[28px] p-5 md:p-7 relative overflow-hidden shadow-xl">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 md:mb-5 gap-3">
            <div className="space-y-1">
              <span className="text-[8px] md:text-[9px] font-black text-amber-500 uppercase tracking-widest italic block">TIẾN ĐỘ TÍCH LŨY RÚT THƯỞNG</span>
              <div className="flex items-baseline gap-2 leading-none">
                <span className="text-xl md:text-2xl font-black text-white italic tracking-tighter text-glow-gold">{user.points.toLocaleString()}</span>
                <span className="text-slate-500 text-[9px] md:text-[10px] font-black italic uppercase">/ {currentMilestone.points.toLocaleString()} ĐIỂM</span>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg text-amber-500 text-[9px] md:text-[10px] font-black italic uppercase tracking-widest">
                MỐC: {currentMilestone.label} VNĐ
            </div>
         </div>
         <div className="h-2.5 md:h-3 bg-slate-950 rounded-full border border-white/5 p-0.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-amber-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
         </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {COMMITMENTS.map((item, idx) => (
          <div key={idx} className={`${item.bgColor} border ${item.borderColor} rounded-xl md:rounded-[20px] p-4 flex items-center gap-3 transition-all hover:bg-amber-500/10 group`}>
            <div className="shrink-0 group-hover:scale-110 transition-transform">{item.icon}</div>
            <div className="leading-tight">
              <h4 className="text-white font-black italic uppercase text-[9px] md:text-[10px] tracking-tight">{item.title}</h4>
              <p className="text-[7px] md:text-[8px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* MODAL LIÊN HỆ ADMIN */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-[#0a0f1e] border border-blue-500/20 w-full max-w-xl rounded-[40px] overflow-hidden shadow-2xl relative">
              <button onClick={() => setShowContactModal(false)} className="absolute top-6 right-6 p-2 text-slate-600 hover:text-white"><X size={24} /></button>
              <div className="p-8 md:p-12 border-b border-white/5 text-center">
                 <div className="w-16 h-16 bg-blue-600/10 rounded-3xl flex items-center justify-center text-blue-500 mx-auto mb-6 border border-blue-500/20"><Mail size={32} /></div>
                 <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">HỖ TRỢ TRỰC TUYẾN</h3>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2 italic">Gửi yêu cầu trực tiếp tới Super Admin của Diamond Nova</p>
              </div>
              <form onSubmit={handleContactSubmit} className="p-8 md:p-12 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase italic ml-2 tracking-widest">CHỦ ĐỀ HỖ TRỢ:</label>
                    <input type="text" required placeholder="Lỗi nhiệm vụ / Rút tiền / ..." value={contactForm.subject} onChange={e => setContactForm({...contactForm, subject: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold text-sm focus:outline-none focus:border-blue-500 italic" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase italic ml-2 tracking-widest">NỘI DUNG CHI TIẾT:</label>
                    <textarea required rows={4} placeholder="Mô tả vấn đề của bạn..." value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold text-sm focus:outline-none focus:border-blue-500 italic resize-none" />
                 </div>
                 <div className="pt-4 flex gap-4">
                    <button type="button" onClick={() => setShowContactModal(false)} className="flex-1 bg-white/5 text-slate-400 py-4 rounded-2xl font-black italic uppercase text-[10px]">HỦY</button>
                    <button type="submit" disabled={isSending} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black italic uppercase text-[10px] flex items-center justify-center gap-3">
                      {isSending ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <><Send size={16} /> GỬI NGAY</>}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'NHIỆM VỤ NAY', value: user.tasksCompleted.toString(), icon: <TrendingUp size={20} />, border: 'border-l-blue-500', text: 'text-blue-500', bg: 'bg-blue-500/5' },
          { label: 'SỐ DƯ HIỆN TẠI', value: `${user.points.toLocaleString()} P`, icon: <Star size={20} />, border: 'border-l-amber-500', text: 'text-amber-500', bg: 'bg-amber-500/5' },
          { label: 'TỔNG THU NHẬP', value: `${(user.points / 10).toLocaleString()} VND`, icon: <Zap size={20} />, border: 'border-l-amber-600', text: 'text-amber-600', bg: 'bg-amber-600/5' },
          { label: 'NGÀY THAM GIA', value: user.joinDate, icon: <Clock size={20} />, border: 'border-l-blue-400', text: 'text-blue-400', bg: 'bg-blue-400/5' },
        ].map((stat, i) => (
          <div key={i} className={`bg-[#0a0f1e] border border-white/5 ${stat.border} border-l-4 p-4 md:p-6 rounded-[20px] md:rounded-[24px] group hover:bg-white/5 transition-all shadow-lg`}>
            <div className={`mb-3 p-2 rounded-xl ${stat.bg} ${stat.text} inline-block group-hover:rotate-12 transition-transform`}>
              {stat.icon}
            </div>
            <span className="text-[7px] md:text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1 italic block leading-none">{stat.label}</span>
            <span className="text-base md:text-lg font-black italic text-white tracking-tighter">{stat.value}</span>
          </div>
        ))}
      </div>

      <section className="bg-gradient-to-br from-[#0a0f1e] to-amber-950/10 border border-amber-500/20 rounded-[20px] md:rounded-[32px] p-6 md:p-10 relative overflow-hidden shadow-2xl group">
         <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none group-hover:rotate-45 transition-transform duration-1000">
            <Sparkles size={120} className="text-amber-500" />
         </div>
         <div className="relative z-10 space-y-4 md:space-y-6">
            <div className="flex items-center gap-2 text-amber-500">
              <Star size={14} fill="currentColor" className="animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black italic uppercase tracking-[0.3em]">AI INSIGHTS</span>
            </div>
            
            <p className="text-slate-300 text-[11px] md:text-sm italic font-medium leading-relaxed max-w-3xl border-l border-amber-500/30 pl-4">
              "{aiMessage}"
            </p>

            <Link to="/tasks" className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-500 text-black px-6 md:px-8 py-3 rounded-xl font-black italic uppercase text-[9px] md:text-[11px] tracking-[0.2em] transition-all shadow-xl shadow-amber-600/30 active:scale-95">
              VÀO GAME CÀY <Zap size={16} fill="currentColor" />
            </Link>
         </div>
      </section>

      <div className="flex items-center justify-between bg-amber-500/5 border border-amber-500/10 p-5 md:p-6 rounded-[20px] md:rounded-[28px] group hover:border-amber-500/30 transition-all shadow-lg cursor-default">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 border border-amber-500/20">
            <Trophy size={20} />
          </div>
          <div className="space-y-0.5">
            <h4 className="font-black italic text-[11px] md:text-sm text-white uppercase tracking-tight">SỰ KIỆN: TUẦN LỄ HOÀNG GIA</h4>
            <p className="text-[7px] md:text-[9px] text-slate-500 font-bold uppercase tracking-[0.1em]">TẶNG X2 ĐIỂM THƯỞNG CHO MỌI NHIỆM VỤ.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
