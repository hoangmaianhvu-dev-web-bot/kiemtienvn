
import React, { useState } from 'react';
import { Task } from '../types';
import { ExternalLink, ListChecks, CheckCircle2, MapPin, Smartphone, Send, Clock, AlertTriangle, ShieldCheck, PlayCircle, MousePointerClick, Info, X } from 'lucide-react';

const LINK_TASKS: Partial<Task>[] = [
  { id: 'l1', title: 'Link4M - Tốc độ cao', rewardValue: 2500, difficulty: 'Easy', shortLink: 'https://link4m.com/test' },
  { id: 'l2', title: 'YeuMoney - Uy tín', rewardValue: 2500, difficulty: 'Easy', shortLink: 'https://yeumoney.com/test' },
  { id: 'l3', title: 'LayMaNet - Đơn giản', rewardValue: 2500, difficulty: 'Easy', shortLink: 'https://laymanet.net/test' },
  { id: 'l4', title: 'TrafficTot - Ổn định', rewardValue: 2500, difficulty: 'Easy', shortLink: 'https://traffictot.com/test' },
  { id: 'l5', title: 'XLink - X2 Thưởng', rewardValue: 2500, difficulty: 'Easy', shortLink: 'https://xlink.top/test' },
  { id: 'l6', title: 'LayMaNgay - Nhanh', rewardValue: 2500, difficulty: 'Easy', shortLink: 'https://laymangay.com/test' },
  { id: 'l7', title: 'LinkNgonMe - Giá tốt', rewardValue: 2500, difficulty: 'Easy', shortLink: 'https://linkngonme.com/test' },
  { id: 'l8', title: 'LinkNgon.io - Nhanh chóng', rewardValue: 2500, difficulty: 'Easy', shortLink: 'https://linkngon.io/test' },
  { id: 'l9', title: '4MMO - Kiếm tiền bền vững', rewardValue: 2500, difficulty: 'Easy', shortLink: 'https://4mmo.vn/test' },
  { id: 'l10', title: 'LinkTot - Tối ưu nhất', rewardValue: 2500, difficulty: 'Easy', shortLink: 'https://linktot.com/test' },
  { id: 'l11', title: 'KiemTienNgay - Rút gọn nhanh', rewardValue: 2500, difficulty: 'Easy', shortLink: 'https://kiemtienngay.com/test' },
];

interface TasksProps {
  pendingTasks: any[];
  onSpecialSubmit: (name: string, link: string) => void;
  onTaskComplete: (reward: number, title: string) => void;
}

const Tasks: React.FC<TasksProps> = ({ pendingTasks, onSpecialSubmit, onTaskComplete }) => {
  const [evidenceLink, setEvidenceLink] = useState('');
  const [selectedSpecial, setSelectedSpecial] = useState<'Review Map' | 'Đánh giá App' | null>(null);
  const [activeTasks, setActiveTasks] = useState<Record<string, boolean>>({});
  const [showTaskInfo, setShowTaskInfo] = useState(false);

  const handleSpecialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const linkStr = String(evidenceLink);
    if (!linkStr.includes('postimg') && !linkStr.includes('i.imgur.com')) {
      return alert('Vui lòng gửi link ảnh từ PostImages để Admin dễ dàng kiểm tra!');
    }
    if (selectedSpecial) {
      onSpecialSubmit(String(selectedSpecial), linkStr);
      setEvidenceLink('');
      setSelectedSpecial(null);
    }
  };

  const startLinkTask = (id: string, url: string) => {
    window.open(url, '_blank');
    setActiveTasks({ ...activeTasks, [id]: true });
  };

  const confirmCompletion = (id: string, reward: number, title: string) => {
    onTaskComplete(reward, title);
    setActiveTasks({ ...activeTasks, [id]: false });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-16">
      <div className="flex flex-col gap-2 relative">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-black italic text-white flex items-center gap-3 uppercase tracking-tight">
            <ListChecks className="text-amber-500" /> TRUNG TÂM NHIỆM VỤ
          </h2>
          <button 
            onClick={() => setShowTaskInfo(!showTaskInfo)}
            className="p-1.5 bg-white/5 rounded-full text-slate-500 hover:text-amber-500 transition-all border border-white/5"
          >
            <Info size={18} />
          </button>
        </div>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] italic">Hệ thống auto-verify • Cập nhật mỗi 24h</p>

        {showTaskInfo && (
          <div className="absolute top-full left-0 mt-4 z-50 w-full max-w-sm bg-[#0a0f1e] border border-blue-500/30 p-6 rounded-3xl shadow-2xl animate-in slide-in-from-top-2 duration-300 backdrop-blur-xl">
             <div className="flex justify-between items-center mb-4">
                <h4 className="text-blue-500 font-black italic uppercase text-[10px] tracking-widest">CÁCH LÀM LINK RÚT GỌN</h4>
                <button onClick={() => setShowTaskInfo(false)} className="text-slate-600 hover:text-white"><X size={14} /></button>
             </div>
             <ul className="space-y-3 text-[10px] text-slate-400 font-bold uppercase italic tracking-tight">
                <li className="flex gap-2"><span className="text-blue-500">•</span> NHẤN "LÀM NHIỆM VỤ", TAB MỚI SẼ MỞ RA.</li>
                <li className="flex gap-2"><span className="text-blue-500">•</span> VƯỢT QUA CÁC BƯỚC QUẢNG CÁO ĐỂ LẤY MÃ HOẶC ĐẾN ĐÍCH.</li>
                <li className="flex gap-2"><span className="text-blue-500">•</span> QUAY LẠI ĐÂY NHẤN "XÁC NHẬN ĐÃ XONG" ĐỂ NHẬN ĐIỂM THƯỞNG.</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> LƯU Ý: KHÔNG SỬ DỤNG ADBLOCK KHI LÀM NHIỆM VỤ.</li>
             </ul>
          </div>
        )}
      </div>

      {/* Special Tasks Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 px-1">
           <ShieldCheck className="text-blue-500" size={18} />
           <h3 className="text-white font-black italic uppercase text-sm tracking-widest">Nhiệm Vụ Đặc Biệt (Duyệt Thủ Công)</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             { name: 'Review Map', reward: 50000, icon: <MapPin className="text-amber-500" />, desc: 'Đánh giá 5 sao kèm hình ảnh trên Google Maps.', url: 'https://www.google.com/maps' },
             { name: 'Đánh giá App', reward: 20000, icon: <Smartphone className="text-blue-500" />, desc: 'Tải và đánh giá 5 sao ứng dụng Diamond Nova trên Play Store.', url: 'https://play.google.com/store' }
           ].map((task, i) => (
             <div key={i} className="bg-[#0a0f1e] border border-amber-500/10 p-8 rounded-[40px] relative overflow-hidden group hover:border-amber-500/30 transition-all shadow-xl">
                <div className="absolute top-4 right-8 text-amber-500 font-black italic text-lg tracking-tighter">
                   +{String(task.reward.toLocaleString())} P
                </div>
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                      {task.icon}
                   </div>
                   <div>
                      <h4 className="text-white font-black italic uppercase text-sm tracking-tight">{String(task.name)}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">XÉT DUYỆT 7-14 NGÀY</p>
                   </div>
                </div>
                <p className="text-[11px] text-slate-400 font-medium italic mb-8 leading-relaxed">{String(task.desc)}</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => window.open(task.url, '_blank')}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl border border-white/10 font-black italic uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    LÀM NHIỆM VỤ <PlayCircle size={14} />
                  </button>
                  <button 
                    onClick={() => setSelectedSpecial(task.name as any)}
                    className="flex-1 bg-amber-600 hover:bg-amber-500 text-black py-4 rounded-2xl border border-white/10 font-black italic uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-amber-600/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    GỬI BẰNG CHỨNG <Send size={14} />
                  </button>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Link Tasks Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 px-1">
           <ExternalLink className="text-amber-500" size={18} />
           <h3 className="text-white font-black italic uppercase text-sm tracking-widest">Rút Gọn Link (Cộng Điểm Tự Động)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LINK_TASKS.map((task) => (
            <div 
              key={String(task.id)} 
              className="bg-[#0a0f1e] border border-white/5 p-6 rounded-[28px] relative overflow-hidden group hover:bg-white/5 transition-all shadow-lg"
            >
              <div className="absolute top-4 right-6 text-blue-400 font-black italic text-sm tracking-tighter">
                 +{String(task.rewardValue?.toLocaleString())} P
              </div>
              <div className="mb-4">
                 <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 italic">AUTO VERIFY</span>
                 <h4 className="text-white font-black italic uppercase text-xs mt-2 tracking-tight group-hover:text-blue-400 transition-colors">{String(task.title)}</h4>
              </div>
              
              {activeTasks[String(task.id)] ? (
                <button 
                  onClick={() => confirmCompletion(String(task.id), task.rewardValue || 0, task.title || '')}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl border border-emerald-400/20 font-black italic uppercase text-[9px] tracking-widest transition-all flex items-center justify-center gap-2 animate-pulse"
                >
                  XÁC NHẬN ĐÃ XONG <CheckCircle2 size={14} />
                </button>
              ) : (
                <button 
                  onClick={() => startLinkTask(String(task.id), String(task.shortLink))}
                  className="w-full bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white py-3 rounded-xl border border-blue-500/20 font-black italic uppercase text-[9px] tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  LÀM NHIỆM VỤ <ExternalLink size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pending Reviews Table */}
      {pendingTasks.length > 0 && (
        <section className="bg-[#0a0f1e] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
           <div className="bg-white/5 p-5 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-white font-black italic uppercase text-xs tracking-widest flex items-center gap-2">
                 <Clock size={16} className="text-blue-400" /> Đang chờ duyệt thủ công
              </h3>
              <span className="bg-blue-500 text-black font-black text-[10px] px-2 py-0.5 rounded-full">{String(pendingTasks.length)}</span>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.02] text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                    <th className="px-6 py-4">Nhiệm vụ</th>
                    <th className="px-6 py-4">Bằng chứng</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4">Ngày gửi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pendingTasks.map((pt) => (
                    <tr key={String(pt.id)} className="text-[10px] font-bold italic">
                      <td className="px-6 py-4 text-white uppercase">{String(pt.taskName)}</td>
                      <td className="px-6 py-4">
                        <a href={String(pt.evidenceLink)} target="_blank" className="text-blue-400 hover:underline flex items-center gap-1">
                          Xem ảnh <ExternalLink size={10} />
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-amber-500/10 text-amber-500 px-2 py-1 rounded-lg border border-amber-500/20 uppercase tracking-tighter">ĐANG CHỜ</span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{String(pt.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </section>
      )}

      {/* Modal for Special Task Submit */}
      {selectedSpecial && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-[#0a0f1e] border border-amber-500/20 w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 text-center">
                 <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">Xác Nhận {String(selectedSpecial)}</h3>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2 italic">HỆ THỐNG XÉT DUYỆT 7-14 NGÀY</p>
              </div>
              <form onSubmit={handleSpecialSubmit} className="p-8 space-y-6">
                 <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-start gap-3">
                    <AlertTriangle size={20} className="text-amber-500 shrink-0" />
                    <p className="text-[10px] text-amber-200 leading-relaxed font-medium uppercase italic">
                       Dán Link ảnh từ <b>PostImages.org</b> hoặc <b>Imgur</b> để làm bằng chứng. Sai link sẽ bị hủy nhiệm vụ.
                    </p>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic ml-2">LINK ẢNH BẰNG CHỨNG:</label>
                    <input 
                      type="url" 
                      required
                      placeholder="https://postimg.cc/..."
                      value={evidenceLink}
                      onChange={(e) => setEvidenceLink(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold text-xs focus:outline-none focus:border-amber-500 transition-all italic"
                    />
                 </div>
                 <div className="flex gap-3">
                    <button 
                      type="button" 
                      onClick={() => setSelectedSpecial(null)}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-slate-400 py-4 rounded-2xl font-black italic uppercase text-[10px] tracking-widest transition-all"
                    >
                      HỦY BỎ
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 bg-amber-600 hover:bg-amber-500 text-black py-4 rounded-2xl font-black italic uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-600/20"
                    >
                      GỬI DUYỆT <Send size={14} />
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
