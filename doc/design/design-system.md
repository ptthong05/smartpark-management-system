# DESIGN SYSTEM - SMARTPARK UI

## 1. Triết lý thiết kế
Giao diện trung tâm giám sát bãi đỗ xe thông minh (Command & Control Center) với tông màu tối hiện đại (Dark theme), độ tương phản cao, hỗ trợ nhân viên trực ca quan sát camera và trạng thái ô đỗ liên tục mà không mỏi mắt.

## 2. Bảng màu quy chuẩn (Color Palette)

### 2.1. Màu trạng thái ô đỗ xe (Parking Spot Statuses)
- 🟢 **AVAILABLE (Trống)**: `#10B981` (Emerald-500) — Có thể phân bổ ngay
- 🟡 **ASSIGNED (Đã gán)**: `#F59E0B` (Amber-500) — Đã khóa cho xe đang đi vào
- 🔴 **OCCUPIED (Đang đỗ)**: `#EF4444` (Red-500) — Camera xác nhận có xe trong ô
- 🟣 **UNKNOWN (Không rõ)**: `#8B5CF6` (Purple-500) — Camera mờ/che khuất cần kiểm tra
- ⚪ **OUT_OF_SERVICE (Bảo trì)**: `#6B7280` (Gray-500) — Ô hỏng hoặc đang sửa chữa

### 2.2. Màu nền & bố cục
- **Background**: `#0F172A` (Slate-900)
- **Card Background**: `#1E293B` (Slate-800 với border Slate-700)
- **Primary Accent**: `#2563EB` (Blue-600)

## 3. Typography
- **Font chữ chính**: `Inter`, sans-serif
- **Font hiển thị biển số xe & mã ô**: Font đơn khoảng (`monospace`), ví dụ: `font-mono` (in hoa, đậm, viền đen vàng chuẩn biển kiểm soát).
