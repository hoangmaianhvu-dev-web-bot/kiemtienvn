
import React, { useState } from 'react';
import { Menu, Bell, Search, MessageSquare, Volume2, X, Sparkles, Bookmark, BookmarkCheck } from 'lucide-react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
  announcements: string[];
  banners: any[];
  balanceNotice: string;
  onToggleSave: (id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, announcements, banners, balanceNotice, onToggleSave }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAd, setShowAd] = useState(true);

  const isSaved = banners.length > 0 && user.savedArticles?.includes(banners[0].id);

  return (
    <div className="min-h-screen bg-[#050811] flex flex-col md:ml-[280px] font-sans selection:bg-amber-500/30 overflow-x-hidden">
      <Sidebar user={user} onLogout={onLogout} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Vị trí 1: Chạy ở đầu trang */}
      <div className="bg-amber-600 h-9 flex items-center overflow-hidden border-b border-amber-500/30 relative z-[100] shadow-lg w-full">
        <div className="bg-white px-5 h-full flex items-center shrink-0 z-10 shadow-[4px_0_10px_rgba(0,0,0,0.1)]">
          <Volume2 size={14} className="text-amber-600 mr-2" />
          <span className="text-amber-600 font-black italic text-[10px] uppercase tracking-tighter whitespace-nowrap">TIN VIP</span>
        </div>
        <div className="flex-1 overflow-hidden relative">
           <div className="animate-marquee whitespace-nowrap text-black text-[11px] font-black italic uppercase tracking-widest flex items-center gap-12">
              {announcements.map((item, i) => <span key={i} className="flex items-center shrink-0">{String(item)}</span>)}
              {announcements.map((item, i) => <span key={`dup-${i}`} className="flex items-center shrink-0">{String(item)}</span>)}
           </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-[#050811]/70 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-slate-400 hover:text-amber-500 bg-white/5 rounded-xl border border-white/5 shrink-0"><Menu size={20} /></button>
          <div className="relative flex-1 max-w-[260px] hidden sm:block"><Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" /><input type="text" placeholder="TÌM TÍNH NĂNG..." className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-[9px] font-black italic text-white focus:outline-none focus:border-amber-500/50 transition-all" /></div>
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          {/* Vị trí 2: Trên số dư */}
          <div className="text-right flex flex-col items-end leading-none">
             <div className="flex items-center gap-1.5 mb-1 animate-pulse">
                <Sparkles size={8} className="text-amber-500" />
                <span className="text-[7px] font-black text-amber-500 uppercase italic tracking-widest">{String(balanceNotice)}</span>
             </div>
             <span className="text-[7px] font-black text-slate-600 uppercase italic tracking-widest mb-1">NOVA BALANCE</span>
             <span className="text-amber-500 font-black italic text-lg tracking-tighter text-glow-gold">{user.points.toLocaleString()}P</span>
          </div>
          <button className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 relative"><Bell size={16} /><div className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-500 rounded-full border border-[#050811]" /></button>
        </div>
      </header>

      {showAd && banners.length > 0 && (
        <div className="px-8 pt-6 animate-in fade-in zoom-in-95 duration-500 w-full">
          <div 
            className="relative w-full aspect-[25/5.5] rounded-[28px] overflow-hidden group shadow-2xl border border-amber-500/20 max-w-6xl mx-auto cursor-pointer"
            onClick={() => banners[0].link && window.open(banners[0].link, '_blank')}
          >
            <img src={String(banners[0].img)} alt="Ad" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" />
            
            {/* Read Later Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleSave(banners[0].id); }}
              className="absolute top-6 right-14 z-20 p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl text-white hover:bg-amber-600 transition-all shadow-xl group/btn"
              title="Lưu xem sau"
            >
              {isSaved ? <BookmarkCheck size={18} className="text-amber-400" /> : <Bookmark size={18} />}
            </button>

            <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-6 left-8 max-w-xl space-y-1.5 pointer-events-none">
               <div className="flex items-center gap-2">
                 <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 italic">PREMIUM AD</span>
                 <button onClick={(e) => { e.stopPropagation(); setShowAd(false); }} className="text-slate-600 hover:text-white transition-colors pointer-events-auto"><X size={10} /></button>
               </div>
               <h2 className="text-white text-lg font-black italic leading-tight uppercase tracking-tight line-clamp-2">{String(banners[0].title)}</h2>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">{children}</main>

      {/* Footer Bản Quyền */}
      <footer className="mt-auto py-8 text-center border-t border-white/5 bg-[#050811]/50 backdrop-blur-md">
         <p className="text-[10px] font-black italic uppercase tracking-[0.3em] text-amber-500 text-glow-gold hover:scale-110 transition-transform duration-300 cursor-default">
            © 2026 Diamond Nova - Bản quyền thuộc về avu dev
         </p>
      </footer>

      <button className="fixed bottom-6 right-6 w-12 h-12 bg-amber-600 rounded-xl shadow-2xl flex items-center justify-center text-black hover:scale-110 transition-all z-[100] border border-white/20"><MessageSquare size={20} fill="currentColor" /></button>
    </div>
  );
};

export default Layout;
