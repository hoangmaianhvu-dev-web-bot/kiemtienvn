
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Crown, 
  ClipboardList, 
  Wallet, 
  Ticket, 
  Trophy, 
  Users, 
  User as UserIcon, 
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  user: User & { isAdmin?: boolean };
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const BRAND_LOGO_URL = "https://i.postimg.cc/6TLJvGQX/6f4e9c34-bc0b-4982-988d-3c5c5b42a2b4.jpg";
const SUPER_ADMIN_ID = 'ADMIN_NOVA_01';

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'TRANG CHỦ', icon: LayoutGrid },
    { path: '/vip', label: 'NÂNG CẤP VIP', icon: Crown, color: 'text-amber-500' },
    { path: '/tasks', label: 'NHIỆM VỤ', icon: ClipboardList },
    { path: '/withdraw', label: 'RÚT THƯỞNG GAME', icon: Wallet },
    { path: '/giftcode', label: 'NHẬP GIFTCODE', icon: Ticket },
    { path: '/leaderboard', label: 'BẢNG XẾP HẠNG', icon: Trophy, color: 'text-blue-500' },
    { path: '/referral', label: 'MỜI BẠN BÈ', icon: Users },
    { path: '/account', label: 'TÀI KHOẢN', icon: UserIcon },
  ];

  const NavItem = ({ item }: { item: typeof menuItems[0] }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <Link
        to={String(item.path)}
        onClick={onClose}
        className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
          isActive 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <Icon size={22} className={item.color || (isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400')} />
        <span className="text-[13px] font-black italic tracking-wider uppercase">
          {String(item.label)}
        </span>
      </Link>
    );
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-[70] w-[280px] bg-[#050811] border-r border-white/5 flex flex-col transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex items-center gap-3">
          <div className="relative shrink-0">
             <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)] bg-slate-900">
                <img 
                  src={BRAND_LOGO_URL} 
                  alt="Nova Logo" 
                  className="w-full h-full object-cover scale-110"
                />
             </div>
             <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#050811] animate-pulse" />
          </div>
          <span className="text-2xl font-black italic tracking-tighter text-white">NOVA</span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
          {menuItems.map((item) => (
            <NavItem key={String(item.path)} item={item} />
          ))}

          {user.id === SUPER_ADMIN_ID && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <Link
                to="/system"
                onClick={onClose}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  location.pathname === '/system' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-blue-500 bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600 hover:text-white'
                }`}
              >
                <ShieldCheck size={22} />
                <span className="text-[13px] font-black italic tracking-wider uppercase">HỆ THỐNG</span>
              </Link>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/5 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-[#0a0f1e] border-2 border-amber-500 flex items-center justify-center overflow-hidden shadow-lg shadow-amber-500/20">
                <img 
                  src={user.photoURL || BRAND_LOGO_URL} 
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-2 transform rotate-12">
                <Crown size={28} className="text-amber-500 fill-amber-500" />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-black text-white uppercase tracking-tighter truncate">
                {user.name}
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase italic tracking-widest mt-0.5">
                {user.isVip ? 'PREMIUM USER' : 'BASIC USER'}
              </span>
            </div>
          </div>

          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-6 py-2 text-red-500 hover:text-red-400 transition-colors group"
          >
            <LogOut size={20} />
            <span className="text-xs font-black italic uppercase tracking-widest">THOÁT</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
