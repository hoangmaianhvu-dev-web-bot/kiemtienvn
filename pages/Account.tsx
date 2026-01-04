
import React, { useState } from 'react';
import { User as UserIcon, Mail, Lock, Key, AlertCircle, ShieldCheck, CheckCircle, Smartphone, Bookmark, Trash2, ExternalLink, Cake, Calendar } from 'lucide-react';
import { User } from '../types';

interface AccountProps {
  user: User;
  banners: any[];
  onToggleSave: (id: string) => void;
  onSync: (updates: Partial<User>) => void;
}

const Account: React.FC<AccountProps> = ({ user, banners, onToggleSave, onSync }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'saved'>('profile');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState(user.birthday || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const savedArticles = banners.filter(b => user.savedArticles?.includes(b.id));

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      alert('Cập nhật mật khẩu thành công!');
      setIsUpdating(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1500);
  };

  const handleSaveBirthday = () => {
    onSync({ birthday });
    alert('Đã cập nhật ngày sinh nhật! Hệ thống sẽ tự động thông báo quà tặng vào đúng ngày này.');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black italic text-white flex items-center gap-3 uppercase tracking-tight">
          <UserIcon className="text-amber-500" /> QUẢN LÝ TÀI KHOẢN
        </h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] italic">Cập nhật thông tin bảo mật & Bài viết đã lưu</p>
      </div>

      <div className="flex gap-4 border-b border-white/5 mb-6">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-6 text-xs font-black italic transition-all uppercase tracking-widest ${activeTab === 'profile' ? 'border-b-2 border-amber-500 text-amber-500' : 'text-slate-500 hover:text-white'}`}
        >
          Thông tin cá nhân
        </button>
        <button 
          onClick={() => setActiveTab('saved')}
          className={`pb-3 px-6 text-xs font-black italic transition-all uppercase tracking-widest ${activeTab === 'saved' ? 'border-b-2 border-amber-500 text-amber-500' : 'text-slate-500 hover:text-white'} flex items-center gap-2`}
        >
          <Bookmark size={14} /> Bài viết đã lưu ({savedArticles.length})
        </button>
      </div>

      {activeTab === 'profile' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-[#0a0f1e] border border-white/5 rounded-[40px] p-8 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-3xl bg-slate-900 border-4 border-amber-500 mx-auto mb-4 overflow-hidden shadow-2xl shadow-amber-500/20">
                    <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-black italic text-white uppercase tracking-tight">{user.name}</h3>
                  <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mt-1 italic">HỘI VIÊN {user.tier}</p>
                  
                  <div className="mt-8 grid grid-cols-2 gap-3">
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <span className="text-[8px] text-slate-500 font-black block uppercase mb-1">LEVEL</span>
                        <span className="text-white font-black italic">{user.level}</span>
                     </div>
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <span className="text-[8px] text-slate-500 font-black block uppercase mb-1">ID TÀI KHOẢN</span>
                        <span className="text-white font-black italic">#{user.id.substring(0,6)}</span>
                     </div>
                  </div>
                </div>
             </div>

             <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-[32px] flex items-start gap-4 shadow-xl">
                <ShieldCheck className="text-amber-500 shrink-0" size={20} />
                <div>
                   <h4 className="text-white font-black italic uppercase text-[10px] tracking-widest mb-1">XÁC MINH DANH TÍNH</h4>
                   <p className="text-[9px] text-slate-400 font-bold uppercase italic leading-relaxed">Tài khoản của bạn đã được bảo vệ bởi hệ thống Diamond Nova Security.</p>
                </div>
             </div>

             {user.isVip && (
               <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 p-6 rounded-[32px] flex items-center gap-4 shadow-xl">
                  <Cake className="text-amber-500 shrink-0" size={20} />
                  <div>
                    <h4 className="text-amber-500 font-black italic uppercase text-[10px] tracking-widest mb-1">QUÀ SINH NHẬT VIP</h4>
                    <p className="text-[8px] text-slate-300 font-bold uppercase italic">Bạn sẽ nhận được Gói Quà Hoàng Gia vào đúng ngày sinh nhật.</p>
                  </div>
               </div>
             )}
          </div>

          {/* Settings Section */}
          <div className="lg:col-span-2 space-y-6">
             {/* Birthday Section */}
             <div className="bg-[#0a0f1e] border border-white/5 rounded-[32px] p-8 md:p-12 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-black">
                      <Calendar size={20} />
                  </div>
                  <h3 className="text-white font-black italic uppercase text-sm tracking-widest">CẬP NHẬT NGÀY SINH</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase italic ml-2">Chọn ngày sinh nhật</label>
                    <div className="relative">
                      <Cake className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                      <input 
                        type="date" 
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="w-full bg-[#050811] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white font-bold text-sm focus:outline-none focus:border-amber-500 transition-all italic"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={handleSaveBirthday}
                    className="bg-amber-600 hover:bg-amber-500 text-black px-10 py-4 rounded-2xl font-black italic uppercase text-xs tracking-widest shadow-xl shadow-amber-600/20 transition-all active:scale-95"
                  >
                    LƯU NGÀY SINH
                  </button>
                </div>
             </div>

             {/* Change Password Form */}
             <div className="bg-[#0a0f1e] border border-amber-500/20 rounded-[32px] overflow-hidden shadow-2xl">
                <div className="bg-amber-500/10 border-b border-amber-500/20 p-6 flex items-center gap-3">
                   <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-black">
                      <Key size={20} />
                   </div>
                   <h3 className="text-white font-black italic uppercase text-sm tracking-widest">ĐỔI MẬT KHẨU</h3>
                </div>
                
                <form onSubmit={handleUpdatePassword} className="p-8 md:p-12 space-y-6">
                   <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase italic ml-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        <input 
                          type="email" 
                          readOnly 
                          value="anhvuzzz09@gmail.com"
                          className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-slate-500 font-bold text-sm focus:outline-none cursor-not-allowed italic"
                        />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase italic ml-2">Mật khẩu hiện tại</label>
                      <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        <input 
                          type="password" 
                          placeholder="Nhập mật khẩu hiện tại"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                          className="w-full bg-[#050811] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white font-bold text-sm focus:outline-none focus:border-amber-500 transition-all italic"
                        />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase italic ml-2">Mật khẩu mới</label>
                      <div className="relative">
                        <Key className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        <input 
                          type="password" 
                          placeholder="Nhập mật khẩu mới"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          className="w-full bg-[#050811] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white font-bold text-sm focus:outline-none focus:border-amber-500 transition-all italic"
                        />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase italic ml-2">Nhập lại mật khẩu mới</label>
                      <div className="relative">
                        <CheckCircle className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        <input 
                          type="password" 
                          placeholder="Nhập lại mật khẩu mới"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="w-full bg-[#050811] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white font-bold text-sm focus:outline-none focus:border-amber-500 transition-all italic"
                        />
                      </div>
                   </div>

                   <div className="pt-4 space-y-6">
                      <p className="text-[10px] font-bold text-slate-500 uppercase italic">
                        Lưu ý: Nếu bạn chưa từng thiết lập mật khẩu thì hãy <button type="button" className="text-blue-500 hover:underline">BẤM VÀO ĐÂY</button>
                      </p>
                      
                      <button 
                        type="submit"
                        disabled={isUpdating}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black italic uppercase text-xs tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50"
                      >
                        {isUpdating ? 'ĐANG CẬP NHẬT...' : 'CẬP NHẬT'}
                      </button>
                   </div>
                </form>
             </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
           {savedArticles.length > 0 ? (
             savedArticles.map((article) => (
               <div key={article.id} className="bg-[#0a0f1e] border border-white/5 rounded-[32px] overflow-hidden group shadow-xl flex flex-col">
                  <div className="aspect-[16/9] relative">
                     <img src={article.img} alt={article.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] to-transparent"></div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                     <div>
                        <h4 className="text-white font-black italic uppercase text-sm tracking-tight line-clamp-2 leading-tight">{article.title}</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase italic tracking-widest mt-2">Đã lưu vào danh sách xem sau</p>
                     </div>
                     <div className="flex gap-3">
                        <button 
                          onClick={() => article.link && window.open(article.link, '_blank')}
                          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-black italic uppercase text-[10px] flex items-center justify-center gap-2"
                        >
                          XEM NGAY <ExternalLink size={14} />
                        </button>
                        <button 
                          onClick={() => onToggleSave(article.id)}
                          className="p-3 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition-all"
                          title="Bỏ lưu"
                        >
                          <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
               </div>
             ))
           ) : (
             <div className="col-span-full py-20 bg-[#0a0f1e] border border-white/5 rounded-[40px] flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-slate-700">
                   <Bookmark size={40} />
                </div>
                <div>
                   <h3 className="text-white font-black italic uppercase tracking-tighter text-lg">CHƯA CÓ BÀI VIẾT NÀO</h3>
                   <p className="text-slate-500 text-[10px] font-bold uppercase italic tracking-widest mt-1">Các bài viết/tin tức bạn lưu sẽ xuất hiện tại đây</p>
                </div>
                <button onClick={() => window.location.hash = '#/'} className="mt-4 px-8 py-3 bg-amber-600 text-black rounded-xl font-black italic uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">
                   KHÁM PHÁ TIN TỨC
                </button>
             </div>
           )}
        </div>
      )}
    </div>
  );
};

export default Account;
