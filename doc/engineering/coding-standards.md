# CODING STANDARDS - SMARTPARK

## 1. Backend (Java Spring Boot)
- **Kiến trúc Layered Architecture**: `Controller` ➔ `Service` ➔ `Repository` ➔ `Entity`.
- **Đặt tên package**: Viết thường toàn bộ (`com.smartpark.controller`, `com.smartpark.service`).
- **REST API Naming**: Danh từ số nhiều, viết thường (vd: `/api/spots`, `/api/sessions`).
- **DTOs**: Luôn tách biệt Request DTO và Response DTO, không trả thẳng JPA Entity ra ngoài API.
- **Transactions**: Bắt buộc dùng `@Transactional` cho các nghiệp vụ phân bổ ô đỗ (`assign`) và thanh toán (`payment`).

## 2. Frontend (ReactJS + Tailwind CSS)
- **Component**: Đặt tên theo `PascalCase` (vd: `SpotGrid.jsx`, `CameraFeed.jsx`).
- **Custom Hooks**: Bắt đầu bằng tiền tố `use` (vd: `useAuth.js`, `useWebSocket.js`).
- **Tailwind CSS**: Dùng utility classes, tránh viết inline style hoặc CSS thừa.
- **State Management**: Sử dụng React Context cho authentication và socket connection.
