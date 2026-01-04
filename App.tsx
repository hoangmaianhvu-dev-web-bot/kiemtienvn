
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Withdraw from './pages/Withdraw';
import Referral from './pages/Referral';
import Giftcode from './pages/Giftcode';
import AuthPage from './pages/AuthPage';
import System from './pages/System';
import Account from './pages/Account';
import Vip from './pages/Vip';
import Leaderboard from './pages/Leaderboard';
import { User, RewardType, VipHistory } from './types';
import { CheckCircle, XCircle, Info, Sparkles, Cake, Gift, Megaphone, X, ChevronRight } from 'lucide-react';

const DEFAULT_AVATAR = "https://i.postimg.cc/6TLJvGQX/6f4e9c34-bc0b-4982-988d-3c5c5b42a2b4.jpg";
const SUPER_ADMIN_ID = 'ADMIN_NOVA_01'; 

const INITIAL_USER: User & { isAdmin?: boolean } = {
  id: SUPER_ADMIN_ID,
  name: 'DIAMOND NOVA ADMIN',
  photoURL: DEFAULT_AVATAR,
  points: 999999,
  exp: 5000,
  level: 99,
  tier: 'Platinum',
  balanceVND: 99999,
  balanceQH: 999,
  balanceKC: 999,
  tasksCompleted: 88,
  accumulationLevel: 7,
  joinDate: String(new Date().toLocaleDateString('vi-VN')),
  referralCount: 150,
  referralBonus: 300000,
  isAdmin: true,
  usedGiftcodes: [],
  savedArticles: [],
  reputation: 100,
  isVip: true,
  birthday: ''
};

const App: React.FC = () => {
  const [user, setUser] = useState<any>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{type: 'success' | 'error' | 'info' | 'birthday', message: string} | null>(null);
  const [specialNotice, setSpecialNotice] = useState<string>("SẢN PHẨM UY TÍN - GIÁ HỢP LÍ - THƯƠNG HIỆU BẢN QUYỀN");
  const [showSpecialNotice, setShowSpecialNotice] = useState(false);

  const [members, setMembers] = useState<any[]>([
    { id: SUPER_ADMIN_ID, name: 'DIAMOND NOVA ADMIN', email: 'admin@gmail.com', points: 999999, level: 'ADMIN', isBanned: false, isAdmin: true, reputation: 100, isVip: true },
    { id: '2', name: 'Gamer Pro 99', email: 'gamer99@gmail.com', points: 25000, level: 'GOLD', isBanned: false, isAdmin: false, reputation: 95, isVip: true },
    { id: '3', name: 'User Test', email: 'test@gmail.com', points: 1200, level: 'BASIC', isBanned: true, isAdmin: false, reputation: 20, isVip: false }
  ]);

  const [vipHistory, setVipHistory] = useState<VipHistory[]>([
    { id: 'vh1', userName: 'Gamer Pro 99', packageName: 'VIP THÁNG', price: 150000, date: '20/05/2024' },
    { id: 'vh2', userName: 'Member_07', packageName: 'VIP TUẦN', price: 50000, date: '19/05/2024' }
  ]);

  const [banners] = useState<any[]>([
    { id: '1', title: "KHUYẾN MÃI CỰC KHỦNG - NẠP 1 ĐƯỢC 2 TẠI NOVA", img: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=2000", link: "#" }
  ]);

  const [withdrawRequests, setWithdrawRequests] = useState<any[]>([]);
  const [giftcodes, setGiftcodes] = useState<any[]>([]);
  const [systemAnnouncements, setAnnouncements] = useState<string[]>(["✦ CHÀO MỪNG BẠN ĐẾN VỚI HỆ THỐNG DIAMOND NOVA VIP"]);

  const novaNotify = useCallback((type: 'success' | 'error' | 'info' | 'birthday', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), type === 'birthday' ? 10000 : 4000);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('nova_test_user');
    const isAuth = localStorage.getItem('nova_test_auth') === 'true';
    const savedNotice = localStorage.getItem('nova_special_notice');
    if (savedNotice) setSpecialNotice(savedNotice);

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      
      // Hiển thị thông báo nổi khi load trang
      if (isAuth) {
        setShowSpecialNotice(true);
      }

      // Kiểm tra sinh nhật
      if (parsedUser.birthday) {
        const today = new Date();
        const bday = new Date(parsedUser.birthday);
        if (today.getDate() === bday.getDate() && today.getMonth() === bday.getMonth()) {
          const bdayMsg = parsedUser.isVip 
            ? `HAPPY BIRTHDAY ${parsedUser.name}! 🎂 Vì bạn là VIP, hãy kiểm tra hòm thư để nhận QUÀ SINH NHẬT ĐẶC BIỆT nhé!`
            : `HAPPY BIRTHDAY ${parsedUser.name}! 🎂 Chúc bạn một ngày sinh nhật vui vẻ cùng Diamond Nova!`;
          
          setTimeout(() => novaNotify('birthday', bdayMsg), 2000);
        }
      }
    }
    setIsAuthenticated(isAuth);
    setIsLoading(false);
  }, [novaNotify]);

  const syncData = (updates: Partial<User>) => {
    const newUser = { ...user, ...updates };
    setUser(newUser);
    localStorage.setItem('nova_test_user', JSON.stringify(newUser));
  };

  const handleUpdateSpecialNotice = (val: string) => {
    setSpecialNotice(val);
    localStorage.setItem('nova_special_notice', val);
  };

  const handleBuyVip = (packageName: string, price: number) => {
    const newHistory: VipHistory = {
      id: Math.random().toString(36).substr(2, 9),
      userName: user.name,
      packageName,
      price,
      date: new Date().toLocaleDateString('vi-VN')
    };
    setVipHistory([newHistory, ...vipHistory]);
    syncData({ isVip: true });
    novaNotify('success', `Nâng cấp ${packageName} thành công!`);
  };

  if (isLoading) return null;
  if (!isAuthenticated) return <AuthPage onLogin={() => { 
    setIsAuthenticated(true); 
    localStorage.setItem('nova_test_auth', 'true');
    setShowSpecialNotice(true); // Hiển thị khi đăng nhập
  }} />;

  return (
    <Router>
      {/* Modal Thông báo nổi */}
      {showSpecialNotice && specialNotice && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-[#0a0f1e] border border-amber-500/10 w-full max-w-2xl rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300">
              <div className="bg-gradient-to-r from-amber-600/20 to-amber-900/10 p-5 flex items-center justify-between border-b border-white/5">
                 <div className="flex items-center gap-3">
                    <Megaphone size={18} className="text-amber-500" />
                    <h3 className="text-white font-black italic text-xs md:text-sm uppercase tracking-widest">THÔNG BÁO TỪ HỆ THỐNG</h3>
                 </div>
                 <button onClick={() => setShowSpecialNotice(false)} className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
                    <X size={20} />
                 </button>
              </div>
              <div className="p-8 md:p-12">
                 <div className="bg-slate-950/80 border-l-4 border-l-amber-500 p-6 md:p-8 rounded-2xl flex items-center justify-between shadow-inner">
                    <p className="text-slate-200 text-sm md:text-lg font-black uppercase tracking-widest italic leading-relaxed text-center w-full">
                       {specialNotice}
                    </p>
                    <ChevronRight size={24} className="text-amber-500/30 shrink-0 ml-4 hidden md:block" />
                 </div>
                 <div className="mt-8 flex justify-center">
                    <button 
                      onClick={() => setShowSpecialNotice(false)}
                      className="px-10 py-3 bg-amber-600 hover:bg-amber-500 text-black font-black italic uppercase text-[10px] tracking-widest rounded-xl transition-all shadow-lg shadow-amber-600/20 active:scale-95"
                    >
                      ĐÃ HIỂU
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] animate-in slide-in-from-top-4 duration-500">
          <div className={`flex items-center gap-4 px-8 py-5 rounded-[24px] border shadow-2xl backdrop-blur-xl ${
            notification.type === 'birthday' ? 'bg-gradient-to-r from-amber-500/30 to-blue-500/30 border-amber-500/50' :
            notification.type === 'success' ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-red-500/20 border-red-500/40'
          }`}>
             {notification.type === 'birthday' && <Cake className="text-amber-500 animate-bounce" />}
             <span className={`text-white font-black italic uppercase ${notification.type === 'birthday' ? 'text-sm' : 'text-xs'} tracking-tight text-center max-w-md`}>
               {notification.message}
             </span>
             {notification.type === 'birthday' && user.isVip && <Gift className="text-blue-500 animate-pulse" />}
          </div>
        </div>
      )}
      <Layout 
        user={user} 
        onLogout={() => { setIsAuthenticated(false); localStorage.setItem('nova_test_auth', 'false'); }} 
        announcements={systemAnnouncements} 
        banners={banners}
        balanceNotice="HỆ THỐNG VIP ĐANG HOẠT ĐỘNG"
        onToggleSave={() => {}}
      >
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/tasks" element={<Tasks pendingTasks={[]} onSpecialSubmit={() => {}} onTaskComplete={(r) => syncData({ points: user.points + r })} />} />
          <Route path="/withdraw" element={<Withdraw user={user} onWithdraw={() => {}} onUpgradeAccumulation={() => {}} />} />
          <Route path="/referral" element={<Referral user={user} />} />
          <Route path="/giftcode" element={<Giftcode onRedeem={() => {}} />} />
          <Route path="/account" element={<Account user={user} banners={[]} onToggleSave={() => {}} onSync={syncData} />} />
          <Route path="/vip" element={<Vip user={user} history={vipHistory} onBuy={handleBuyVip} />} />
          <Route path="/leaderboard" element={<Leaderboard members={members} />} />
          <Route path="/system" element={user.id === SUPER_ADMIN_ID ? (
            <System 
              user={user} 
              members={members}
              setMembers={setMembers}
              giftcodes={giftcodes}
              setGiftcodes={setGiftcodes}
              banners={banners}
              setBanners={() => {}}
              announcements={systemAnnouncements}
              setAnnouncements={setAnnouncements}
              balanceNotice={specialNotice}
              setBalanceNotice={handleUpdateSpecialNotice}
              paymentRequests={[]}
              setPaymentRequests={() => {}}
              withdrawRequests={withdrawRequests}
              setWithdrawRequests={setWithdrawRequests}
            />
          ) : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
