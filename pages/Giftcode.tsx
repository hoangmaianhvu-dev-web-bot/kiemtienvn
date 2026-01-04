
import React, { useState } from 'react';
import { Ticket, Sparkles, Gift, ShieldCheck, AlertCircle } from 'lucide-react';

interface GiftcodeProps {
  onRedeem: (code: string) => void;
}

// Fixed: Renamed component to Giftcode to match filename and ensure default export is solid
const Giftcode: React.FC<GiftcodeProps> = ({ onRedeem }) => {
  const [code, setCode] = useState('');

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    onRedeem(code.trim());
    setCode('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter">
          MÃ GIFTCODE <span className="text-amber-500">- NHẬP NGAY NHẬN QUÀ UY TÍN</span>
        </h1>
        <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] italic">NHẬN MÃ TỪ FANPAGE HOẶC SỰ KIỆN DIAMOND NOVA</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-[#0a0f1e] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:rotate-12 transition-transform">
            <Ticket size={160} className="text-amber-500" />
          </div>
          
          <form onSubmit={handleRedeem} className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic ml-2">NHẬP MÃ CỦA BẠN TẠI ĐÂY:</label>
              <div className="relative group">
                 <input 
                  type="text" 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="VÍ DỤ: NOVA2025"
                  className="w-full bg-slate-950 border border-white/10 rounded-[24px] py-6 px-8 text-white text-xl font-black italic placeholder:text-slate-800 focus:outline-none focus:border-amber-500 transition-all uppercase tracking-widest"
                 />
                 <Ticket className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-800 group-focus-within:text-amber-500 transition-colors" />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-500 text-black py-6 rounded-[24px] font-black italic uppercase text-sm tracking-[0.2em] shadow-xl shadow-amber-600/20 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              XÁC NHẬN NHẬN QUÀ <Sparkles size={20} />
            </button>
          </form>
        </div>

        <div className="space-y-6">
           <div className="bg-amber-500/5 border border-amber-500/20 p-8 rounded-[32px] flex items-start gap-5">
              <div className="p-4 bg-amber-500/10 rounded-2xl shrink-0"><Gift className="text-amber-500" /></div>
              <div>
                 <h3 className="text-white font-black italic uppercase text-sm tracking-tight mb-2">QUY TẮC NHẬN QUÀ</h3>
                 <p className="text-[11px] text-slate-400 font-medium italic leading-relaxed uppercase tracking-tighter">Mỗi mã Giftcode chỉ có thể sử dụng 01 lần duy nhất cho mỗi tài khoản. Hệ thống tự động ghi nhận sau 1 giây.</p>
              </div>
           </div>

           <div className="bg-blue-500/5 border border-blue-500/20 p-8 rounded-[32px] flex items-start gap-5">
              <div className="p-4 bg-blue-500/10 rounded-2xl shrink-0"><ShieldCheck className="text-blue-500" /></div>
              <div>
                 <h3 className="text-white font-black italic uppercase text-sm tracking-tight mb-2">BẢO MẬT TUYỆT ĐỐI</h3>
                 <p className="text-[11px] text-slate-400 font-medium italic leading-relaxed uppercase tracking-tighter">Phần quà được nạp trực tiếp qua Napthe.vn. Đảm bảo 100% không âm kim cương hay âm quân huy.</p>
              </div>
           </div>

           <div className="p-4 border border-white/5 rounded-2xl flex items-center gap-3 text-[10px] text-slate-600 font-black italic uppercase">
              <AlertCircle size={14} /> Lưu ý: Mã giftcode không có thời hạn cho đến khi hết lượt nhập.
           </div>
        </div>
      </div>
    </div>
  );
};

export default Giftcode;
