# SMARTPARK – HỆ THỐNG QUẢN LÝ BÃI ĐỖ XE Ô TÔ THÔNG MINH (AI & ITS)

> **Dự án**: SmartPark Management System  
> **Phiên bản**: SRS 1.2 | **Môn học**: Hệ thống giao thông thông minh (ITS)  
> **Tech Stack**:
> - **Frontend**: ReactJS + Vite + Tailwind CSS
> - **Backend**: Java Spring Boot + Spring Security (JWT) + WebSocket
> - **Database**: MySQL
> - **AI Service**: Python (YOLO / OCR Plate Recognition & Spot Detection)

---

## 📌 Phạm vi hệ thống (Scope)
- **Tác nhân**: 
  - **Admin**: Quản trị bãi xe, ô đỗ, camera, cấu hình bảng giá, quản lý tài khoản nhân viên, xem báo cáo doanh thu & thống kê.
  - **Nhân viên (Staff)**: Giám sát cổng vào/ra, xem danh sách ô trống khả dụng (`AVAILABLE`), phân bổ ô thủ công và hướng dẫn tài xế bằng lời, xác nhận thanh toán, mở barrier mô phỏng, xử lý ngoại lệ.
  - **Tài xế (Driver)**: Không có tài khoản, không truy cập website, không dùng thẻ RFID, nhận điều hướng trực tiếp bằng lời từ nhân viên.
  - **AI / Camera**: Dịch vụ nền cung cấp nhận diện biển số (LPR) và trạng thái ô đỗ (`OCCUPIED`/`AVAILABLE`).

---

## 📂 Khung cấu trúc thư mục dự án (Folder Skeleton)

```text
smartpark-management-system/
│
├── backend/                                   # Source code Backend (Java Spring Boot)
│   └── src/
│       ├── main/
│       │   ├── java/com/smartpark/
│       │   │   ├── config/                    # Cấu hình hệ thống (Security, JWT, CORS, WebSocket, Swagger...)
│       │   │   ├── controller/                # REST API Controllers theo từng domain nghiệp vụ
│       │   │   │   ├── auth/                  # /api/auth (Login, Logout, RefreshToken)
│       │   │   │   ├── area/                  # /api/areas (CRUD khu vực, tầng)
│       │   │   │   ├── spot/                  # /api/spots (Trạng thái ô, danh sách ô trống AVAILABLE)
│       │   │   │   ├── camera/                # /api/cameras (Quản lý camera cổng & camera tầng hầm)
│       │   │   │   ├── session/               # /api/sessions (Sự kiện xe vào, xe ra, tính phí, đối chiếu biển số)
│       │   │   │   ├── rate/                  # /api/rates (Quản lý bảng giá: 20k giờ đầu, 10k giờ tiếp theo)
│       │   │   │   ├── payment/               # /api/payments (Xác nhận thanh toán tiền mặt / QR / chuyển khoản)
│       │   │   │   ├── alert/                 # /api/alerts (Cảnh báo sai vị trí, camera offline, bãi đầy)
│       │   │   │   ├── user/                  # /api/users (Quản lý tài khoản Admin/Staff)
│       │   │   │   ├── report/                # /api/reports (Dashboard tổng quan, doanh thu, thống kê lượt xe)
│       │   │   │   └── ai/                    # /api/ai (Nhận webhook sự kiện nhận diện từ AI Python Service)
│       │   │   ├── dto/                       # Data Transfer Objects
│       │   │   │   ├── request/               # Request DTOs (auth, session, spot, payment, management...)
│       │   │   │   └── response/              # Response DTOs (dashboard, session, spot, report, common...)
│       │   │   ├── entity/                    # JPA Entities tương ứng 11 bảng trong ERD
│       │   │   ├── enums/                     # Enum định nghĩa trạng thái, vai trò, loại sự kiện, loại cảnh báo
│       │   │   ├── exception/                 # Custom Exception & GlobalExceptionHandler
│       │   │   ├── repository/                # Spring Data JPA Repositories
│       │   │   ├── security/                  # Cấu hình Spring Security, JWT Token Provider, UserDetails
│       │   │   ├── service/                   # Business Logic Service Interfaces & Impl
│       │   │   │   └── impl/
│       │   │   ├── simulator/                 # Module mô phỏng Barrier & sự kiện camera khi demo
│       │   │   ├── util/                      # Tiện ích: tính phí theo giờ (BR-08), date/time formatters
│       │   │   └── websocket/                 # WebSocket push realtime cho UI (cập nhật trạng thái ô, sự kiện cổng)
│       │   └── resources/
│       │       └── db/migration/              # SQL script khởi tạo và migration database
│       └── test/java/com/smartpark/           # Unit test & Integration test
│
├── frontend/                                  # Source code Frontend (ReactJS + Vite + Tailwind CSS)
│   ├── public/                                # Assets tĩnh, logo, audio âm thanh cảnh báo
│   └── src/
│       ├── assets/                            # Hình ảnh, icon, file css chung
│       │   ├── icons/
│       │   ├── images/
│       │   └── styles/
│       ├── components/                        # UI Components dùng chung và theo domain
│       │   ├── common/                        # Button, Modal, Table, Badge, Card, Loader, AlertBox
│       │   ├── layout/                        # Layout hệ thống
│       │   │   ├── AdminLayout/               # Layout trang Admin (Sidebar, Header, Breadcrumbs)
│       │   │   └── StaffLayout/               # Layout trang Nhân viên (Quick actions, Navbar tinh gọn)
│       │   └── parking/                       # Components chuyên biệt bãi đỗ xe
│       │       ├── BarrierControl/            # Điều khiển thanh chắn Barrier (mô phỏng)
│       │       ├── CameraFeed/                # Khung hiển thị luồng camera trực tiếp
│       │       ├── FeeReceipt/                # Phiếu tính tiền và xác nhận thanh toán
│       │       ├── LicensePlateBox/           # Hộp hiển thị ảnh biển số + kết quả OCR
│       │       ├── SpotCard/                  # Thẻ hiển thị thông tin 1 ô đỗ
│       │       └── SpotGrid/                  # Sơ đồ lưới trực quan ma trận ô đỗ
│       ├── constants/                         # Biến hằng số, Enum UI (màu trạng thái ô, vai trò, endpoint)
│       ├── context/                           # React Context (AuthContext, SocketContext, AlertContext)
│       ├── hooks/                             # Custom React Hooks (useAuth, useWebSocket, useSpots...)
│       ├── pages/                             # Toàn bộ màn hình theo mục 4 trong SRS
│       │   ├── alerts/                        # Màn hình danh sách cảnh báo hệ thống
│       │   ├── auth/                          # Đăng nhập Admin / Staff
│       │   ├── camera-monitor/                # Giám sát camera tầng hầm & nhận diện từng ô
│       │   ├── dashboard/                     # Dashboard tổng quan (số ô trống, đang đỗ, cảnh báo)
│       │   ├── entry-gate/                    # Giám sát cổng vào & phân bổ ô đỗ cho tài xế
│       │   ├── exit-gate/                     # Giám sát cổng ra, đối chiếu biển số & thanh toán
│       │   ├── management/                    # Trang quản trị (Admin)
│       │   │   ├── areas/                     # Quản lý khu vực / tầng
│       │   │   ├── cameras/                   # Quản lý thiết bị camera
│       │   │   └── spots/                     # Quản lý ô đỗ xe
│       │   ├── parking-map/                   # Sơ đồ trực quan bãi xe (lọc tầng, khu, trạng thái)
│       │   ├── rates/                         # Thiết lập biểu phí / bảng giá đỗ xe
│       │   ├── reports/                       # Báo cáo doanh thu và thống kê lượt xe
│       │   ├── sessions/                      # Danh sách xe đang gửi & lịch sử lượt gửi
│       │   └── staff/                         # Quản lý tài khoản nhân viên (Admin only)
│       ├── routes/                            # Định tuyến React Router & Route Guard theo quyền
│       ├── services/                          # Call API qua Axios / Fetch
│       └── utils/                             # Tiện ích format tiền VNĐ, ngày giờ, validate biển số
│
├── ai-service/                                # Module AI nhận diện biển số & ô đỗ (Python)
│   ├── configs/                               # Cấu hình camera, bounding box các ô đỗ
│   ├── data/                                  # Thư mục chứa video/ảnh mẫu phục vụ kịch bản demo
│   │   ├── demo_images/
│   │   └── demo_videos/
│   ├── models/                                # Thư mục chứa weights (YOLOv8, Plate OCR...)
│   └── src/
│       ├── api_client/                        # Gửi REST API / Webhook sự kiện về Spring Boot Backend
│       ├── camera_stream/                     # Đọc RTSP camera hoặc nạp video demo
│       ├── core/                              # Cấu hình, logger, utils xử lý ảnh OpenCV
│       ├── plate_recognition/                 # Pipeline phát hiện xe & nhận diện ký tự biển số
└──     └── spot_detection/                    # Pipeline kiểm tra ô có xe (OCCUPIED) hay trống (AVAILABLE)
```

---

## 📊 Ánh xạ bảng Cơ sở dữ liệu (ERD) vào Backend & Frontend

| Bảng CSDL (ERD) | Backend Entity / Repository | Frontend Module tương ứng |
| :--- | :--- | :--- |
| `users` | `User` / `UserRepository` | `pages/staff`, `context/AuthContext` |
| `parking_areas` | `ParkingArea` / `ParkingAreaRepository` | `pages/management/areas`, `pages/parking-map` |
| `parking_spots` | `ParkingSpot` / `ParkingSpotRepository` | `pages/management/spots`, `components/parking/SpotGrid` |
| `cameras` | `Camera` / `CameraRepository` | `pages/management/cameras`, `pages/camera-monitor` |
| `images` | `Image` / `ImageRepository` | `components/parking/LicensePlateBox`, `pages/sessions` |
| `parking_sessions`| `ParkingSession` / `ParkingSessionRepository` | `pages/entry-gate`, `pages/exit-gate`, `pages/sessions` |
| `parking_events` | `ParkingEvent` / `ParkingEventRepository` | Lịch sử sự kiện, WebSocket notification |
| `staff_actions` | `StaffAction` / `StaffActionRepository` | Nhật ký kiểm toán thao tác phân bổ ô / sửa lỗi thủ công |
| `parking_rates` | `ParkingRate` / `ParkingRateRepository` | `pages/rates`, tính toán phí tại cổng ra |
| `payments` | `Payment` / `PaymentRepository` | `pages/exit-gate`, `components/parking/FeeReceipt` |
| `system_alerts` | `SystemAlert` / `SystemAlertRepository` | `pages/alerts`, chuông cảnh báo realtime trên Header |

---

## 🐳 Hướng dẫn triển khai bằng Docker (Docker Compose)

Hệ thống đã được thiết lập sẵn file cấu hình Docker đa tầng (Multi-stage build) và Docker Compose:

### 1. Khởi chạy toàn bộ hệ thống (MySQL + Backend + Frontend)
```powershell
docker compose up -d --build
```

### 2. Các dịch vụ trong Docker Compose
- **Frontend**: `http://localhost:3000` (Nginx + React Vite build)
- **Backend API**: `http://localhost:8088` (Spring Boot JAR)
- **MySQL Database**: `localhost:3306` (Database: `smartpark_db`, user: `root`, pass: `root`)

### 3. Dừng hệ thống
```powershell
docker compose down
```

