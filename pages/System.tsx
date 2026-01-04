
import React, { useState } from 'react';
import { 
  Users, Settings, Wallet, Activity, Database, Trash2, Search, Ban, UserCheck, 
  Crown, ShieldCheck, X, ShieldAlert, Heart, TrendingDown, TrendingUp, 
  Ticket, Image as ImageIcon, Megaphone, Check, Plus, CreditCard, ExternalLink,
  DollarSign, BarChart3, Clock, LayoutPanelTop
} from 'lucide-react';

interface SystemProps {
  user: any;
  members: any[];
  setMembers: (val: any[]) => void;
  giftcodes: any[];
  setGiftcodes: (val: any[]) => void;
  banners: any[];
  setBanners: (val: any[]) => void;
  announcements: string[];
  setAnnouncements: (val: string[]) => void;
  balanceNotice: string;
  setBalanceNotice: (val: string) => void;
  paymentRequests: any[];
  setPaymentRequests: (val: any[]) => void;
  withdrawRequests: any[];
  setWithdrawRequests: (val: any[]) => void;
}

const System: React.FC<SystemProps> = ({ 
  user, members, setMembers, giftcodes, setGiftcodes, banners, setBanners, 
  announcements, setAnnouncements, balanceNotice, setBalanceNotice,
  paymentRequests, setPaymentRequests, withdrawRequests, setWithdrawRequests
}) => {
  const [activeTab, setActiveTab] = useState<'members' | 'withdrawals' | 'payments' | 'giftcodes' | 'content'>('members');
  const [searchMember, setSearchMember] = useState('');
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  // Form states for adding content
  const [newGiftcode, setNewGiftcode] = useState({ code: '', value: 0, total: 100 });
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [tempSpecialNotice, setTempSpecialNotice] = useState(balanceNotice);

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchMember.toLowerCase()) || 
    m.email.toLowerCase().includes(searchMember.toLowerCase())
  );

  const handleUpdateReputation = (id: string, delta: number) => {
    setMembers(members.map(m => 
      m.id === id ? { ...m, reputation: Math.max(0, Math.min(100, (m.reputation || 100) + delta)) } : m
    ));
    if(selectedMember?.id === id) {
      setSelectedMember({ ...selectedMember, reputation: Math.max(0, Math.min(100, (selectedMember.reputation || 100) + delta)) });
    }
  };

  const handleDeleteMember = (id: string) => {
    if(window.confirm('Bạn có chắc chắn muốn xóa tài khoản này vĩnh viễn?')) {
      setMembers(members.filter(m => m.id !== id));
      setSelectedMember(null);
    }
  };

  const addGiftcode = () => {
    if(!newGiftcode.code) return;
    setGiftcodes([...giftcodes, { ...newGiftcode, used: 0 }]);
    setNewGiftcode({ code: '', value: 0, total: 100 });
  };

  // Mock data for payments matching the requested format
  const mockPayments = [
    { time: '20/05/2024 14:30', member: 'Gamer Pro 99', vipType: 'VIP THÁNG', info: 'Gói ưu tiên 30 ngày', billImg: 'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=200', transferContent: 'NOVA_VIP_99', status: 'pending' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-1">
        <div>
          <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter flex items-center gap-3">
             <Settings className="text-blue-500" /> QUẢN TRỊ HỆ THỐNG
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] italic mt-1">NOVA ADMIN CONTROL • SUPER USER</p>
        </div>
        <div className="flex bg-[#0a0f1e] p-1.5 rounded-2xl border border-white/5 overflow-x-auto max-w-full no-scrollbar shadow-xl">
          {[
            { id: 'members', label: 'THÀNH VIÊN', icon: Users },
            { id: 'withdrawals', label: 'RÚT TIỀN', icon: Wallet },
            { id: 'payments', label: 'NẠP TIỀN', icon: CreditCard },
            { id: 'giftcodes', label: 'GIFTCODE', icon: Ticket },
            { id: 'content', label: 'NỘI DUNG', icon: ImageIcon },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black italic uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-white'}`}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards - Matching the image design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-1">
        <div className="bg-[#0a0f1e] border border-white/5 border-l-4 border-l-blue-600 p-6 rounded-[32px] space-y-3 shadow-xl hover:bg-white/[0.02] transition-colors">
          <Users size={24} className="text-slate-200" />
          <div className="space-y-1">
            <h4 className="text-[9px] font-black text-slate-500 uppercase italic tracking-widest">TỔNG HỘI VIÊN</h4>
            <p className="text-3xl font-black italic text-white tracking-tighter">{members.length}</p>
          </div>
        </div>
        <div className="bg-[#0a0f1e] border border-white/5 border-l-4 border-l-orange-500 p-6 rounded-[32px] space-y-3 shadow-xl hover:bg-white/[0.02] transition-colors">
          <Wallet size={24} className="text-slate-200" />
          <div className="space-y-1">
            <h4 className="text-[9px] font-black text-slate-500 uppercase italic tracking-widest">KHO ĐIỂM NOVA</h4>
            <p className="text-3xl font-black italic text-white tracking-tighter">0</p>
          </div>
        </div>
        <div className="bg-[#0a0f1e] border border-white/5 border-l-4 border-l-emerald-500 p-6 rounded-[32px] space-y-3 shadow-xl hover:bg-white/[0.02] transition-colors">
          <DollarSign size={24} className="text-slate-200" />
          <div className="space-y-1">
            <h4 className="text-[9px] font-black text-slate-500 uppercase italic tracking-widest">DỰ CHI (VND)</h4>
            <p className="text-3xl font-black italic text-white tracking-tighter">0đ</p>
          </div>
        </div>
        <div className="bg-[#0a0f1e] border border-white/5 border-l-4 border-l-pink-600 p-6 rounded-[32px] space-y-3 shadow-xl hover:bg-white/[0.02] transition-colors">
          <Activity size={24} className="text-slate-200" />
          <div className="space-y-1">
            <h4 className="text-[9px] font-black text-slate-500 uppercase italic tracking-widest">ĐƠN RÚT CHỜ</h4>
            <p className="text-3xl font-black italic text-white tracking-tighter">{withdrawRequests.length}</p>
          </div>
        </div>
        <div className="bg-[#0a0f1e] border border-white/5 border-l-4 border-l-indigo-500 p-6 rounded-[32px] space-y-3 shadow-xl hover:bg-white/[0.02] transition-colors">
          <TrendingUp size={24} className="text-slate-200" />
          <div className="space-y-1">
            <h4 className="text-[9px] font-black text-slate-500 uppercase italic tracking-widest">ONLINE 24H</h4>
            <p className="text-3xl font-black italic text-white tracking-tighter">0</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-[#0a0f1e] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl min-h-[600px]">
         {activeTab === 'members' && (
           <div className="p-8 md:p-12 space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                 <div>
                    <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">QUẢN LÝ HỘI VIÊN</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase italic mt-1">Tổng cộng: {members.length} thành viên</p>
                 </div>
                 <div className="relative w-full md:w-96">
                    <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input value={searchMember} onChange={e => setSearchMember(e.target.value)} placeholder="Tìm tên hoặc email..." className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-[11px] font-bold text-white italic focus:border-blue-500 transition-all" />
                 </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[9px] font-black text-slate-500 uppercase border-b border-white/5 tracking-widest italic">
                      <th className="pb-6 px-4">THÀNH VIÊN</th>
                      <th className="pb-6 px-4">UY TÍN</th>
                      <th className="pb-6 px-4">ĐIỂM (P)</th>
                      <th className="pb-6 px-4">TRẠNG THÁI</th>
                      <th className="pb-6 px-4 text-right">SETTING</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredMembers.map((m) => (
                      <tr key={m.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-6 px-4">
                           <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-2xl bg-slate-900 border ${m.isVip ? 'border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'border-white/10'} flex items-center justify-center`}>
                                 <span className="text-lg font-black italic text-white">{m.name.charAt(0)}</span>
                              </div>
                              <div className="flex flex-col">
                                 <span className={`text-[13px] font-black italic uppercase ${m.isBanned ? 'text-red-500 line-through' : 'text-white'}`}>{m.name}</span>
                                 <span className="text-[10px] font-bold text-slate-600">{m.email}</span>
                              </div>
                           </div>
                        </td>
                        <td className="py-6 px-4">
                           <div className="flex items-center gap-2">
                              <Heart size={14} className={m.reputation > 50 ? 'text-emerald-500' : 'text-red-500'} fill="currentColor" />
                              <span className="font-black italic text-sm">{m.reputation || 100}%</span>
                           </div>
                        </td>
                        <td className="py-6 px-4 font-black italic text-sm text-amber-500">{m.points.toLocaleString()}</td>
                        <td className="py-6 px-4">
                           <span className={`px-3 py-1 rounded-full text-[9px] font-black italic border ${m.isBanned ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'}`}>
                              {m.isBanned ? 'BỊ KHÓA' : 'HOẠT ĐỘNG'}
                           </span>
                        </td>
                        <td className="py-6 px-4 text-right">
                           <button onClick={() => setSelectedMember(m)} className="p-3 bg-white/5 rounded-xl text-slate-500 hover:text-blue-500 transition-all active:scale-90">
                              <Settings size={18} />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
         )}

         {activeTab === 'giftcodes' && (
           <div className="p-8 md:p-12 space-y-10 animate-in fade-in duration-500">
              <div className="bg-slate-950/50 p-8 rounded-[32px] border border-white/5 space-y-6">
                <h3 className="text-white font-black italic uppercase text-sm tracking-widest flex items-center gap-3">
                  <Plus size={18} className="text-blue-500" /> THÊM GIFTCODE MỚI
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input type="text" placeholder="MÃ GIFTCODE" value={newGiftcode.code} onChange={e => setNewGiftcode({...newGiftcode, code: e.target.value.toUpperCase()})} className="bg-[#050811] border border-white/10 rounded-xl py-4 px-6 text-white font-black italic uppercase text-xs focus:border-blue-500 transition-all" />
                  <input type="number" placeholder="GIÁ TRỊ (P)" value={newGiftcode.value} onChange={e => setNewGiftcode({...newGiftcode, value: Number(e.target.value)})} className="bg-[#050811] border border-white/10 rounded-xl py-4 px-6 text-white font-black italic uppercase text-xs focus:border-blue-500 transition-all" />
                  <input type="number" placeholder="LƯỢT DÙNG" value={newGiftcode.total} onChange={e => setNewGiftcode({...newGiftcode, total: Number(e.target.value)})} className="bg-[#050811] border border-white/10 rounded-xl py-4 px-6 text-white font-black italic uppercase text-xs focus:border-blue-500 transition-all" />
                  <button onClick={addGiftcode} className="bg-blue-600 hover:bg-blue-500 text-white font-black italic uppercase text-xs rounded-xl shadow-lg shadow-blue-600/20">TẠO MÃ</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {giftcodes.map((gc, i) => (
                  <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center justify-between group">
                    <div>
                      <span className="text-blue-500 font-black italic text-lg tracking-widest">{gc.code}</span>
                      <div className="flex gap-4 mt-1">
                        <span className="text-[10px] text-slate-500 font-bold uppercase italic">Giá trị: {gc.value.toLocaleString()}P</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase italic">Lượt: {gc.used}/{gc.total}</span>
                      </div>
                    </div>
                    <button onClick={() => setGiftcodes(giftcodes.filter((_, idx) => idx !== i))} className="p-3 text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
           </div>
         )}

         {activeTab === 'payments' && (
           <div className="p-8 md:p-12 space-y-8 animate-in fade-in duration-500">
              <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">YÊU CẦU NẠP VIP (THANH TOÁN)</h2>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="text-[9px] font-black text-slate-500 uppercase border-b border-white/5 tracking-widest italic">
                       <th className="pb-6 px-4">THỜI GIAN</th>
                       <th className="pb-6 px-4">THÀNH VIÊN</th>
                       <th className="pb-6 px-4">LOẠI VIP</th>
                       <th className="pb-6 px-4">THÔNG TIN</th>
                       <th className="pb-6 px-4">ẢNH BILL</th>
                       <th className="pb-6 px-4">NỘI DUNG CK</th>
                       <th className="pb-6 px-4 text-right">THAO TÁC</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {mockPayments.map((req, i) => (
                       <tr key={i} className="text-[11px] font-bold italic text-white hover:bg-white/[0.01] transition-colors">
                         <td className="py-6 px-4 text-slate-500">{req.time}</td>
                         <td className="py-6 px-4">{req.member}</td>
                         <td className="py-6 px-4 text-amber-500">{req.vipType}</td>
                         <td className="py-6 px-4 text-[10px]">{req.info}</td>
                         <td className="py-6 px-4">
                            <a href={req.billImg} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 block hover:border-blue-500 transition-all">
                               <img src={req.billImg} alt="Bill" className="w-full h-full object-cover" />
                            </a>
                         </td>
                         <td className="py-6 px-4">
                            <span className="bg-slate-950 px-3 py-1.5 rounded-lg border border-white/5 text-blue-400 font-black tracking-widest">{req.transferContent}</span>
                         </td>
                         <td className="py-6 px-4 text-right">
                            <div className="flex justify-end gap-2">
                               <button className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-lg" title="Phê duyệt"><Check size={16} /></button>
                               <button className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg" title="Từ chối"><X size={16} /></button>
                            </div>
                         </td>
                       </tr>
                     ))}
                     {mockPayments.length === 0 && (
                       <tr><td colSpan={7} className="py-20 text-center text-slate-600 font-black italic uppercase tracking-widest opacity-30">Chưa có yêu cầu nạp tiền nào</td></tr>
                     )}
                   </tbody>
                 </table>
              </div>
           </div>
         )}

         {activeTab === 'withdrawals' && (
           <div className="p-8 md:p-12 space-y-8 animate-in fade-in duration-500">
              <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">YÊU CẦU RÚT THƯỞNG</h2>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="text-[9px] font-black text-slate-500 uppercase border-b border-white/5 tracking-widest italic">
                       <th className="pb-6 px-4">THỜI GIAN</th>
                       <th className="pb-6 px-4">THÀNH VIÊN</th>
                       <th className="pb-6 px-4">LOẠI QUÀ</th>
                       <th className="pb-6 px-4">THÔNG TIN</th>
                       <th className="pb-6 px-4 text-right">THAO TÁC</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {withdrawRequests.map((req, i) => (
                       <tr key={i} className="text-[11px] font-bold italic text-white">
                         <td className="py-6 px-4 text-slate-500">{req.time}</td>
                         <td className="py-6 px-4">{req.member}</td>
                         <td className="py-6 px-4 text-amber-500">{req.type} ({req.amount})</td>
                         <td className="py-6 px-4">{req.info}</td>
                         <td className="py-6 px-4 text-right flex justify-end gap-2">
                            <button className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"><Check size={16} /></button>
                            <button className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><X size={16} /></button>
                         </td>
                       </tr>
                     ))}
                     {withdrawRequests.length === 0 && (
                       <tr><td colSpan={5} className="py-20 text-center text-slate-600 font-black italic uppercase tracking-widest opacity-30">Chưa có yêu cầu nào</td></tr>
                     )}
                   </tbody>
                 </table>
              </div>
           </div>
         )}

         {activeTab === 'content' && (
           <div className="p-8 md:p-12 space-y-12 animate-in fade-in duration-500">
              {/* QUẢN LÝ THÔNG BÁO NỔI */}
              <div className="bg-slate-950/50 p-8 rounded-[32px] border border-amber-500/10 space-y-6">
                <h3 className="text-white font-black italic uppercase text-sm tracking-widest flex items-center gap-3">
                  <LayoutPanelTop size={18} className="text-amber-500" /> CÀI ĐẶT THÔNG BÁO NỔI (POP-UP)
                </h3>
                <div className="space-y-4">
                  <p className="text-[10px] text-slate-500 font-bold uppercase italic tracking-widest">Nội dung này sẽ hiển thị trong Modal mỗi khi người dùng load trang.</p>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="Nhập nội dung thông báo nổi..." 
                      value={tempSpecialNotice} 
                      onChange={e => setTempSpecialNotice(e.target.value)} 
                      className="flex-1 bg-[#050811] border border-white/10 rounded-2xl py-5 px-8 text-white font-bold italic text-xs focus:border-amber-500 transition-all uppercase" 
                    />
                    <button 
                      onClick={() => {
                        setBalanceNotice(tempSpecialNotice);
                        alert('Đã cập nhật thông báo nổi!');
                      }} 
                      className="bg-amber-600 hover:bg-amber-500 text-black px-10 rounded-2xl font-black italic uppercase text-[10px] tracking-widest transition-all shadow-lg shadow-amber-600/20"
                    >
                      CẬP NHẬT
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-white font-black italic uppercase text-sm tracking-widest flex items-center gap-3">
                  <Megaphone size={18} className="text-amber-500" /> QUẢN LÝ TIN TỨC CHẠY CHỮ
                </h3>
                <div className="flex gap-4">
                  <input type="text" placeholder="NỘI DUNG TIN TỨC MỚI..." value={newAnnouncement} onChange={e => setNewAnnouncement(e.target.value)} className="flex-1 bg-slate-950 border border-white/10 rounded-2xl py-5 px-8 text-white font-bold italic text-xs focus:border-amber-500 transition-all" />
                  <button onClick={() => { if(newAnnouncement) setAnnouncements([...announcements, newAnnouncement]); setNewAnnouncement(''); }} className="bg-amber-600 text-black px-10 rounded-2xl font-black italic uppercase text-[10px] tracking-widest">THÊM TIN</button>
                </div>
                <div className="space-y-2">
                   {announcements.map((ann, i) => (
                     <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-300 font-bold italic uppercase">{ann}</span>
                        <button onClick={() => setAnnouncements(announcements.filter((_, idx) => idx !== i))} className="text-slate-600 hover:text-red-500"><Trash2 size={14} /></button>
                     </div>
                   ))}
                </div>
              </div>

              <div className="space-y-6">
                 <h3 className="text-white font-black italic uppercase text-sm tracking-widest flex items-center gap-3">
                   <ImageIcon size={18} className="text-blue-500" /> QUẢN LÝ BANNER & BÀI VIẾT
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {banners.map((banner, i) => (
                      <div key={i} className="bg-slate-950 rounded-[32px] overflow-hidden border border-white/10 group relative">
                         <img src={banner.img} alt="" className="w-full aspect-[2/1] object-cover opacity-50" />
                         <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
                            <h4 className="text-white font-black italic uppercase text-xs line-clamp-1">{banner.title}</h4>
                            <div className="flex justify-between items-center mt-3">
                               <span className="span-text-[8px] text-slate-500 font-bold uppercase tracking-widest">#{banner.id}</span>
                               <button className="text-red-500 p-2 bg-red-500/10 rounded-lg"><Trash2 size={14} /></button>
                            </div>
                         </div>
                      </div>
                    ))}
                    <button className="bg-white/5 border-2 border-dashed border-white/10 rounded-[32px] aspect-[2/1] flex flex-col items-center justify-center gap-3 text-slate-500 hover:text-blue-500 hover:border-blue-500 transition-all">
                       <Plus size={32} />
                       <span className="text-[10px] font-black italic uppercase tracking-widest">THÊM BANNER MỚI</span>
                    </button>
                 </div>
              </div>
           </div>
         )}
      </div>

      {/* MEMBER SETTING MODAL - GIỮ NGUYÊN BẢN BÂY GIỜ */}
      {selectedMember && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in">
           <div className="bg-[#050811] border border-white/10 w-full max-w-lg rounded-[48px] overflow-hidden shadow-2xl relative">
              <button onClick={() => setSelectedMember(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X size={28} /></button>
              
              <div className="p-10 border-b border-white/5 text-center">
                 <div className="w-24 h-24 bg-slate-900 border-2 border-blue-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                    <span className="text-4xl font-black italic text-white">{selectedMember.name.charAt(0)}</span>
                 </div>
                 <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">{selectedMember.name}</h3>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">ID: {selectedMember.id}</p>
              </div>

              <div className="p-10 space-y-8">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-2">
                       <span className="text-[9px] font-black text-slate-600 uppercase italic">ĐIỂM UY TÍN</span>
                       <div className="flex items-center justify-between">
                          <span className="text-xl font-black italic text-white">{selectedMember.reputation}%</span>
                          <div className="flex gap-2">
                             <button onClick={() => handleUpdateReputation(selectedMember.id, -10)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 transition-all hover:text-white"><TrendingDown size={14} /></button>
                             <button onClick={() => handleUpdateReputation(selectedMember.id, 10)} className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 transition-all hover:text-white"><TrendingUp size={14} /></button>
                          </div>
                       </div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-2 text-center">
                       <span className="text-[9px] font-black text-slate-600 uppercase italic">LOẠI TÀI KHOẢN</span>
                       <div className="flex items-center justify-center gap-2">
                          {selectedMember.isVip ? <Crown size={16} className="text-amber-500" /> : <ShieldCheck size={16} className="text-slate-500" />}
                          <span className={`text-sm font-black italic ${selectedMember.isVip ? 'text-amber-500' : 'text-slate-400'}`}>{selectedMember.isVip ? 'HỘI VIÊN VIP' : 'HỘI VIÊN THƯỜNG'}</span>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <button 
                      onClick={() => {
                        setMembers(members.map(m => m.id === selectedMember.id ? { ...m, isBanned: !m.isBanned } : m));
                        setSelectedMember({ ...selectedMember, isBanned: !selectedMember.isBanned });
                      }}
                      className={`w-full py-5 rounded-2xl font-black italic uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all ${selectedMember.isBanned ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white'}`}
                    >
                      {selectedMember.isBanned ? <><UserCheck size={18} /> MỞ KHÓA TÀI KHOẢN</> : <><Ban size={18} /> KHÓA TÀI KHOẢN NÀY</>}
                    </button>

                    <button 
                      onClick={() => handleDeleteMember(selectedMember.id)}
                      className="w-full bg-slate-900 hover:bg-white/10 text-slate-500 hover:text-white py-5 rounded-2xl font-black italic uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all"
                    >
                       <Trash2 size={18} /> XÓA TÀI KHOẢN VĨNH VIỄN
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default System;
