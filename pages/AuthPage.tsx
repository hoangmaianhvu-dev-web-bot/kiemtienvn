
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, CheckCircle2, ArrowRight, Send, ChevronLeft, User as UserIcon, AlertCircle, ShieldCheck, Trophy, Zap, Users, Sparkles, MessageSquare, Smartphone, ShieldAlert } from 'lucide-react';

interface AuthPageProps {
  onLogin: () => void;
}

type AuthMode = 'login' | 'register' | 'forgotPassword';
type ForgotStep = 'request' | 'verify';

const BRAND_LOGO_URL = "https://i.postimg.cc/6TLJvGQX/6f4e9c34-bc0b-4982-988d-3c5c5b42a2b4.jpg";
const AUTH_MEDIA_IMAGE = "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000";

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [forgotStep, setForgotStep] = useState<ForgotStep>('request');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Form States
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetCode, setResetCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    
    setTimeout(() => {
      if (mode === 'register') {
        if (password !== confirmPassword) {
          setErrorMsg('Mật khẩu nhập lại không khớp!');
          setIsLoading(false);
          return;
        }
        alert('Đăng ký thành công! Hãy đăng nhập để bắt đầu.');
        setMode('login');
        setIsLoading(false);
      } else if (mode === 'forgotPassword') {
        if (forgotStep === 'request') {
          // Chuyển sang bước nhập mã Telegram
          setForgotStep('verify');
          setIsLoading(false);
        } else {
          // Xác nhận đổi mật khẩu
          if (resetCode.length !== 6) {
            setErrorMsg('Mã xác nhận phải gồm 6 chữ số!');
            setIsLoading(false);
            return;
          }
          if (password !== confirmPassword) {
            setErrorMsg('Mật khẩu mới không khớp!');
            setIsLoading(false);
            return;
          }
          alert('Khôi phục mật khẩu thành công! Hãy dùng mật khẩu mới để đăng nhập.');
          setMode('login');
          setForgotStep('request');
          setResetCode('');
          setPassword('');
          setConfirmPassword('');
          setIsLoading(false);
        }
      } else {
        onLogin();
      }
    }, 1200);
  };

  const handleBack = () => {
    if (mode === 'forgotPassword' && forgotStep === 'verify') {
      setForgotStep('request');
    } else {
      setMode('login');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-0 md:p-6 lg:p-10 bg-[#050811] overflow-hidden">
      <div className="w-full max-w-[1400px] h-full md:h-[90vh] bg-[#0a0f1e] border border-white/5 rounded-none md:rounded-[48px] overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
        
        {/* Left: Auth Form Section */}
        <div className="w-full md:w-[45%] h-full flex flex-col p-8 md:p-16 overflow-y-auto custom-scrollbar relative z-10 bg-[#0a0f1e]">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-blue-600 rounded-xl overflow-hidden shadow-lg shadow-blue-600/20 border border-white/10">
              <img src={BRAND_LOGO_URL} alt="Logo" className="w-full h-full object-cover scale-110" />
            </div>
            <h1 className="text-xl font-black italic text-white uppercase tracking-tighter">DIAMOND NOVA</h1>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full py-8">
            <div className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase">
                  {mode === 'login' ? 'ĐĂNG NHẬP' : mode === 'register' ? 'ĐĂNG KÝ' : 'KHÔI PHỤC'}
                </h2>
                {mode !== 'login' && (
                  <button onClick={handleBack} className="text-slate-500 hover:text-white transition-colors"><ChevronLeft size={24} /></button>
                )}
              </div>
              <p className="text-[10px] md:text-xs text-slate-500 font-black uppercase tracking-[0.2em] italic">
                {mode === 'forgotPassword' ? 'XÁC THỰC QUA TELEGRAM BOT' : 'Hệ thống kiếm tiền sạch & uy tín'}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-3 animate-in fade-in duration-300">
                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                <p className="text-[11px] font-bold text-red-400 uppercase italic">{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="relative group">
                  <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500" size={18} />
                  <input type="text" required placeholder="TÊN NGƯỜI DÙNG" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white font-bold text-sm uppercase italic focus:outline-none focus:border-blue-500 transition-all" />
                </div>
              )}

              {mode === 'forgotPassword' ? (
                forgotStep === 'request' ? (
                  <>
                    <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-2xl mb-4">
                      <p className="text-[10px] text-blue-400 font-bold uppercase italic leading-relaxed">
                        Nhập Email để hệ thống liên kết với Bot Telegram hỗ trợ cấp mã xác thực.
                      </p>
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500" size={18} />
                      <input type="email" required placeholder="NHẬP EMAIL ĐÃ ĐĂNG KÝ" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white font-bold text-sm focus:outline-none focus:border-blue-500 transition-all" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-amber-500/5 border border-amber-500/20 p-5 rounded-2xl mb-6 space-y-3">
                      <div className="flex items-center gap-2 text-amber-500">
                        <MessageSquare size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">HƯỚNG DẪN LẤY MÃ</span>
                      </div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase italic leading-relaxed">
                        1. Truy cập Telegram Bot: <a href="#" className="text-blue-500 underline">@DiamondNova_Bot</a><br />
                        2. Nhấn <b>/start</b> và chọn <b>Lấy mã khôi phục</b><br />
                        3. Nhập mã 6 số nhận được vào ô bên dưới.
                      </p>
                    </div>

                    <div className="relative group">
                      <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-amber-500" size={18} />
                      <input 
                        type="text" 
                        required 
                        maxLength={6}
                        placeholder="MÃ XÁC NHẬN (6 SỐ)" 
                        value={resetCode} 
                        onChange={e => setResetCode(e.target.value.replace(/\D/g,''))} 
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white font-black text-sm tracking-[0.5em] focus:outline-none focus:border-amber-500 transition-all" 
                      />
                    </div>

                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500" size={18} />
                      <input type={showPassword ? "text" : "password"} required placeholder="MẬT KHẨU MỚI" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white font-bold text-sm focus:outline-none focus:border-blue-500 transition-all" />
                    </div>

                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500" size={18} />
                      <input type="password" required placeholder="XÁC NHẬN MẬT KHẨU MỚI" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white font-bold text-sm focus:outline-none focus:border-blue-500 transition-all" />
                    </div>
                  </>
                )
              ) : (
                <>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500" size={18} />
                    <input type="email" required placeholder="GMAIL CÁ NHÂN" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white font-bold text-sm focus:outline-none focus:border-blue-500 transition-all" />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500" size={18} />
                    <input type={showPassword ? "text" : "password"} required placeholder="MẬT KHẨU" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-14 pr-14 text-white font-bold text-sm focus:outline-none focus:border-blue-500 transition-all" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {mode === 'register' && (
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500" size={18} />
                      <input type="password" required placeholder="NHẬP LẠI MẬT KHẨU" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white font-bold text-sm focus:outline-none focus:border-blue-500 transition-all" />
                    </div>
                  )}
                </>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-between px-1">
                   <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-slate-900 text-blue-600 focus:ring-0" />
                      <span className="text-[10px] font-black text-slate-500 group-hover:text-slate-300 transition-colors uppercase italic tracking-widest">Ghi nhớ</span>
                   </label>
                   <button type="button" onClick={() => { setMode('forgotPassword'); setForgotStep('request'); }} className="text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase italic tracking-widest">Quên mật khẩu?</button>
                </div>
              )}

              <button disabled={isLoading} type="submit" className={`w-full ${mode === 'forgotPassword' && forgotStep === 'verify' ? 'bg-amber-600 hover:bg-amber-500' : 'bg-blue-600 hover:bg-blue-500'} text-white py-5 rounded-2xl font-black italic uppercase text-xs tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 mt-4 disabled:opacity-50`}>
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {mode === 'login' ? <LogIn size={18} /> : mode === 'register' ? <ShieldCheck size={18} /> : <Send size={18} />} 
                    {mode === 'login' ? 'BẮT ĐẦU NGAY' : mode === 'register' ? 'TẠO TÀI KHOẢN' : (forgotStep === 'request' ? 'LẤY MÃ XÁC THỰC' : 'XÁC NHẬN ĐỔI')}
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 text-center">
              <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setForgotStep('request'); }} className="text-white hover:text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] border-b border-white/10 hover:border-blue-500 pb-1 italic transition-all">
                {mode === 'login' ? 'BẠN CHƯA CÓ TÀI KHOẢN?' : 'QUAY LẠI ĐĂNG NHẬP'}
              </button>
            </div>
          </div>
          
          <div className="mt-auto text-center py-4 border-t border-white/5 md:hidden">
             <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest italic">© 2026 Diamond Nova Security</p>
          </div>
        </div>

        {/* Right: Media / Info Section (DEKTOP ONLY) */}
        <div className="hidden md:block md:w-[55%] h-full relative group">
          <img src={AUTH_MEDIA_IMAGE} alt="Gaming" className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a0f1e] via-transparent to-[#0a0f1e]/80"></div>
          
          <div className="absolute inset-0 p-20 flex flex-col justify-end text-left pointer-events-none">
             <div className="max-w-lg space-y-10">
                <div className="space-y-4">
                   <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-lg">
                      <Sparkles size={14} className="text-blue-400" />
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] italic">COMMUNITY HUB</span>
                   </div>
                   <h2 className="text-5xl font-black text-white italic tracking-tighter leading-none uppercase">
                      HƠN CẢ MỘT <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-500">NỀN TẢNG</span>
                   </h2>
                   <p className="text-slate-300 text-sm font-medium leading-relaxed italic border-l-2 border-blue-500 pl-6">
                      Tham gia cùng hàng nghìn game thủ cày cuốc nhiệm vụ mỗi ngày. Chúng tôi cam kết nguồn quà sạch 100% từ Napthe.vn, bảo vệ tài khoản của bạn trọn đời.
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                   <div className="space-y-1">
                      <div className="flex items-center gap-2 text-amber-500">
                         <Users size={20} />
                         <span className="text-2xl font-black italic tracking-tighter">150.000+</span>
                      </div>
                      <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest italic">Hội viên tin dùng</span>
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-2 text-blue-500">
                         <Trophy size={20} />
                         <span className="text-2xl font-black italic tracking-tighter">2 TỶ+</span>
                      </div>
                      <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest italic">Giá trị quà đã trao</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="absolute top-10 right-10 flex gap-4">
             <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-3xl flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                   <ShieldCheck size={20} />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-white uppercase italic">SYSTEM ACTIVE</span>
                   <span className="text-[8px] text-emerald-500 font-bold uppercase tracking-widest">Safe & Secured</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
