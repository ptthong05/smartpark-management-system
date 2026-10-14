import React from 'react';
import { 
  LayoutDashboard, 
  LogIn, 
  LogOut, 
  MapPin, 
  Video, 
  History, 
  ShieldAlert, 
  Settings, 
  DollarSign, 
  Users 
} from 'lucide-react';

export default function App() {
  const modules = [
    { title: 'Dashboard tổng quan', desc: 'Thống kê ô trống, lượt xe, cảnh báo', icon: LayoutDashboard, path: '/dashboard', role: 'Admin / Staff' },
    { title: 'Giám sát cổng vào', desc: 'Camera, nhận diện biển số & phân bổ ô', icon: LogIn, path: '/entry-gate', role: 'Admin / Staff' },
    { title: 'Giám sát cổng ra', desc: 'Đối chiếu biển số, tính phí & mở barrier', icon: LogOut, path: '/exit-gate', role: 'Admin / Staff' },
    { title: 'Sơ đồ bãi xe', desc: 'Trực quan hóa trạng thái ô theo khu/tầng', icon: MapPin, path: '/parking-map', role: 'Admin / Staff' },
    { title: 'Camera tầng hầm', desc: 'Luồng camera AI phát hiện ô có xe / trống', icon: Video, path: '/camera-monitor', role: 'Admin / Staff' },
    { title: 'Lịch sử lượt gửi', desc: 'Tra cứu xe vào/ra, ảnh chụp và thời gian', icon: History, path: '/sessions', role: 'Admin / Staff' },
    { title: 'Cảnh báo hệ thống', desc: 'Đỗ sai ô, camera mất kết nối, lỗi nhận diện', icon: ShieldAlert, path: '/alerts', role: 'Admin / Staff' },
    { title: 'Quản lý bãi & camera', desc: 'Thiết lập khu vực, ô đỗ và thiết bị', icon: Settings, path: '/management', role: 'Admin Only' },
    { title: 'Bảng giá đỗ xe', desc: 'Biểu phí giờ đầu, giờ tiếp theo', icon: DollarSign, path: '/rates', role: 'Admin / Staff' },
    { title: 'Quản lý nhân viên', desc: 'Tài khoản và phân quyền hệ thống', icon: Users, path: '/staff', role: 'Admin Only' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
            SP
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">SmartPark System</h1>
            <p className="text-xs text-slate-400">Hệ thống Quản lý Bãi đỗ xe Thông minh AI & ITS</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Khung FE & BE Đã Sẵn Sàng
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Khung giao diện ReactJS + Vite + Tailwind CSS</h2>
          <p className="text-slate-400 text-sm">
            Tất cả các thư mục tương ứng với từng module nghiệp vụ trong tài liệu SRS đã được tạo sẵn trong <code className="text-blue-400 font-mono">src/pages/</code> và <code className="text-blue-400 font-mono">src/components/</code>.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-800/60 border border-slate-700/60 hover:border-blue-500/50 rounded-2xl p-5 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/5 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-700/60 text-slate-300 font-medium">
                    {m.role}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-base mb-1 group-hover:text-blue-400 transition-colors">
                  {m.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">
                  {m.desc}
                </p>
                <div className="text-[11px] font-mono text-slate-500">
                  Folder: src/pages{m.path}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 px-8 text-center text-xs text-slate-500">
        SmartPark Management System &copy; 2026 - ITS Project. Khung sườn đã được chuẩn hóa theo SRS 1.2 & ERD.
      </footer>
    </div>
  );
}
