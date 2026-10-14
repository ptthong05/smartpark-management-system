# API DESIGN SPECIFICATION - SMARTPARK

## 1. Chuẩn thiết kế API
- **Base URL**: `http://localhost:8088/api`
- **Authentication**: Bearer JWT Token (`Authorization: Bearer <token>`)
- **Format**: JSON (UTF-8)

## 2. Danh sách Endpoints chính

### 2.1. Authentication (`/api/auth`)
| Method | Endpoint | Quyền | Mô tả |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | Đăng nhập Admin / Staff nhận JWT token |
| `GET` | `/api/auth/me` | Authenticated | Lấy thông tin user đang đăng nhập |

### 2.2. Parking Spots & Map (`/api/spots`)
| Method | Endpoint | Quyền | Mô tả |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/spots` | Admin / Staff | Lấy danh sách ô đỗ (lọc theo `areaId`, `status`) |
| `GET` | `/api/spots/available`| Admin / Staff | Lấy danh sách ô trống có thể phân bổ |
| `POST` | `/api/spots/{id}/assign`| Staff | Phân bổ ô đỗ cho lượt gửi xe |

### 2.3. Sessions & Gate Events (`/api/sessions`)
| Method | Endpoint | Quyền | Mô tả |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/sessions/entry-event` | AI / Staff | Nhận sự kiện xe vào cổng & tạo session |
| `POST` | `/api/sessions/{id}/assign` | Staff | Nhân viên chọn ô phân bổ |
| `POST` | `/api/sessions/exit-event` | AI / Staff | Nhận sự kiện xe ra, đối chiếu biển số |
| `GET` | `/api/sessions/{id}/fee` | Staff | Tính phí đỗ xe theo thời gian vào/ra |

### 2.4. Payments (`/api/payments`)
| Method | Endpoint | Quyền | Mô tả |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/payments` | Staff | Xác nhận thanh toán tiền mặt / QR |

### 2.5. AI Webhooks (`/api/ai`)
| Method | Endpoint | Quyền | Mô tả |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/ai/spot-events` | Internal / AI | Cập nhật ô đỗ có xe/trống từ camera tầng hầm |

### 2.6. Reports & Dashboard (`/api/reports`)
| Method | Endpoint | Quyền | Mô tả |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/reports/summary` | Admin / Staff | Thống kê số ô trống, đang đỗ, cảnh báo |
| `GET` | `/api/reports/revenue` | Admin | Báo cáo doanh thu theo ngày / tuần / tháng |
