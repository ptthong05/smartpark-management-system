# QUY TẮC PHÁT TRIỂN & TIÊU CHUẨN ĐỒNG ĐỘI (TEAM CODING CONVENTIONS)
## DỰ ÁN: SMARTPARK – HỆ THỐNG QUẢN LÝ BÃI ĐỖ XE THÔNG MINH (ITS)

> **Dành cho tất cả thành viên trong nhóm**:  
> Mọi thành viên tham gia phát triển dự án bắt buộc phải đọc và tuân thủ 100% các nguyên tắc trong tài liệu này trước khi viết code và gửi Pull Request.

---

## 🚫 1. NGUYÊN TẮC NGHIỆP VỤ BẤT DI BẤT DỊCH (CORE BUSINESS RULES)

Đây là các ràng buộc đã chốt trong tài liệu SRS v1.2, **tuyệt đối không được tự ý thay đổi hoặc thêm tính năng sai lệch**:

1. **Tuyệt đối KHÔNG code giao diện hay tính năng cho Tài xế (Driver)**:
   - Hệ thống chỉ có 2 vai trò: **Admin** và **Nhân viên (Staff)**.
   - Tài xế không có tài khoản, không đăng nhập, không tải app và không xem sơ đồ ô trống trên web.
2. **Tuyệt đối KHÔNG sử dụng thẻ từ / thẻ RFID**:
   - Nhận diện xe hoàn toàn tự động bằng **Camera AI đọc biển số** kết hợp ảnh chụp và mã lượt gửi nội bộ.
3. **Quy tắc phân bổ ô đỗ (Spot Allocation)**:
   - Chỉ ô ở trạng thái `AVAILABLE` (màu xanh lá) mới được cấp cho xe vào.
   - Không được phân bổ các ô đang `ASSIGNED`, `OCCUPIED`, `UNKNOWN`, `OUT_OF_SERVICE`.
4. **Tính toàn vẹn giao dịch (Atomic Transaction)**:
   - Phía Backend, hàm phân bổ ô (`assignSpot`) bắt buộc dùng `@Transactional` và cơ chế khóa (Pessimistic/Optimistic Lock) để chống tình trạng 2 nhân viên cấp trùng 1 ô cùng một thời điểm (kịch bản kiểm thử TC-10).
5. **Rời ô khác với rời bãi**:
   - Khi xe rời khỏi vị trí đỗ, ô chuyển về `AVAILABLE` nhưng lượt gửi của xe (`parking_sessions`) vẫn ở trạng thái `ACTIVE`. Chỉ chuyển sang `COMPLETED` khi xe đã thanh toán tiền và đi qua cổng ra.
6. **Biểu phí chuẩn demo (BR-08)**:
   - Giờ đầu tiên: `20.000 VNĐ`.
   - Mỗi giờ tiếp theo (hoặc phần lẻ giờ): `10.000 VNĐ`.

---

## 🌿 2. QUY CHUẨN QUẢN LÝ MÃ NGUỒN VÀ GIT (GIT WORKFLOW)

### 2.1. Quy tắc phân nhánh (Branch Naming)
Tuyệt đối **KHÔNG push code trực tiếp lên nhánh `main`**. Mọi người tạo nhánh riêng theo cú pháp:

| Loại nhánh | Cú pháp | Ví dụ |
| :--- | :--- | :--- |
| Tính năng mới | `feature/<tên-chức-năng>` | `feature/entry-gate-ui`, `feature/payment-api` |
| Sửa lỗi | `bugfix/<tên-lỗi>` | `bugfix/spot-duplicate-assign` |
| Sửa gấp | `hotfix/<tên-lỗi>` | `hotfix/port-conflict-fix` |
| Tài liệu | `docs/<tên-tài-liệu>` | `docs/update-api-spec` |

### 2.2. Quy tắc viết Commit Message (Conventional Commits)
Thông điệp commit phải rõ ràng, bắt đầu bằng các tiền tố chuẩn:
- `feat`: Thêm chức năng mới (vd: `feat(backend): add entry event API for camera AI`)
- `fix`: Sửa lỗi (vd: `fix(frontend): correct spot badge color for OCCUPIED status`)
- `refactor`: Tối ưu / cấu trúc lại code mà không đổi logic
- `style`: Sửa format code, căn lề, css
- `docs`: Cập nhật tài liệu
- `chore`: Cập nhật cấu hình, dependencies

### 2.3. Quy trình tạo Pull Request (PR) & Merge
1. Trước khi tạo PR, phải chạy thử local để đảm bảo:
   - Frontend build thành công: `npm run build` (không có lỗi cú pháp hay thiếu import).
   - Backend biên dịch thành công: `mvn compile` (không lỗi compile).
2. Tạo PR từ nhánh của bạn vào `main`, mô tả ngắn gọn: Đã làm gì? Đã test trường hợp nào?
3. Phải có ít nhất 1 thành viên khác review và duyệt mới được merge vào `main`.

---

## ☕ 3. QUY CHUẨN ĐẶT TÊN LỚP (CLASS NAMING CONVENTIONS)

Tất cả các Class/Interface trong Java và Component trong React bắt buộc sử dụng định dạng **`PascalCase`** (viết hoa chữ cái đầu mỗi từ) và hậu tố (suffix) thống nhất:

### 3.1. Phía Backend (Java Spring Boot)
| Tầng / Loại Lớp | Cú pháp quy chuẩn | Ví dụ chuẩn trong SmartPark |
| :--- | :--- | :--- |
| **Entity (JPA)** | Danh từ số ít, trùng tên bảng ERD | `User`, `ParkingArea`, `ParkingSpot`, `Camera`, `ParkingSession`, `ParkingEvent`, `ParkingRate`, `Payment`, `SystemAlert`, `StaffAction` |
| **Repository** | `<TênEntity>Repository` | `ParkingSpotRepository`, `ParkingSessionRepository`, `UserRepository` |
| **Service Interface** | `<TênNghiệpVụ>Service` | `ParkingSpotService`, `ParkingSessionService`, `AuthService`, `PaymentService` |
| **Service Impl** | `<TênService>Impl` | `ParkingSpotServiceImpl`, `ParkingSessionServiceImpl`, `AuthServiceImpl` |
| **Controller** | `<TênDomain>Controller` | `AuthController`, `ParkingSpotController`, `ParkingSessionController`, `ReportController` |
| **Request DTO** | `<HànhĐộng><Domain>Request` | `LoginRequest`, `AssignSpotRequest`, `EntryEventRequest`, `ExitEventRequest` |
| **Response DTO** | `<TênDữLiệu>Response` | `JwtResponse`, `SpotDetailResponse`, `FeeCalculationResponse`, `DashboardSummaryResponse` |
| **Enum Class** | `PascalCase` (nội dung `UPPER_SNAKE_CASE`) | Lớp: `SpotStatus` ➔ Giá trị: `AVAILABLE`, `ASSIGNED`, `OCCUPIED`, `OUT_OF_SERVICE`<br>Lớp: `Role` ➔ Giá trị: `ADMIN`, `STAFF` |
| **Custom Exception** | `<LýDoLỗi>Exception` | `ResourceNotFoundException`, `SpotNotAvailableException`, `InvalidLicensePlateException` |
| **Configuration** | `<ChứcNăng>Config` | `SecurityConfig`, `WebSocketConfig`, `CorsConfig` |

### 3.2. Phía Frontend (ReactJS)
| Thành phần | Cú pháp quy chuẩn | Ví dụ chuẩn |
| :--- | :--- | :--- |
| **UI Component** | `PascalCase` theo tính năng | `SpotCard.jsx`, `SpotGrid.jsx`, `CameraFeed.jsx`, `BarrierControl.jsx` |
| **Page Component** | `<TênTrang>Page.jsx` | `DashboardPage.jsx`, `EntryGatePage.jsx`, `ExitGatePage.jsx` |
| **Custom Hook** | `camelCase` bắt đầu bằng `use` | `useAuth.js`, `useWebSocket.js`, `useParkingSpots.js` |
| **Context** | `<TênChứcNăng>Context.jsx` | `AuthContext.jsx`, `SocketContext.jsx` |
| **Service API** | `camelCase` có đuôi `Service.js` | `authService.js`, `spotService.js`, `sessionService.js` |

---

## 🏷️ 4. QUY CHUẨN HÀM, BIẾN, THAM SỐ VÀ PHONG CÁCH CODE (METHODS, VARIABLES & STYLE)

### 4.1. Quy chuẩn đặt tên Hàm / Phương thức (Methods / Functions)
- **Quy tắc**: Luôn dùng **`camelCase`** và **bắt đầu bằng một ĐỘNG TỪ** thể hiện rõ hành động.
- **Tiền tố chuẩn bắt buộc dùng**:
  - `get...`: Lấy dữ liệu nhanh hoặc tính toán trong bộ nhớ (vd: `getTotalFee()`, `getAvailableSpots()`).
  - `find...`: Truy vấn từ cơ sở dữ liệu (vd: `findByLicensePlate()`, `findActiveSession()`).
  - `calculate...`: Thực hiện logic tính toán nghiệp vụ (vd: `calculateParkingFee(entryTime, exitTime)`).
  - `is...`, `has...`, `can...`, `exists...`: Hàm kiểm tra điều kiện trả về `boolean` (vd: `isSpotAvailable()`, `hasActiveSession()`, `canOpenBarrier()`).
  - `create...`, `save...`, `update...`, `delete...`: Các hàm tác động dữ liệu (vd: `createSession()`, `updateSpotStatus()`).
  - `handle...`, `on...` (Frontend): Xử lý sự kiện người dùng click, gõ, scan (vd: `handleSelectSpot()`, `handleConfirmPayment()`, `onPlateScanned()`).

### 4.2. Quy chuẩn đặt tên Biến và Thuộc tính (Variables & Fields)
- **Biến thông thường**: Dùng `camelCase`, đặt tên bằng tiếng Anh có ý nghĩa, phản ánh chính xác nội dung:
  - ✅ **Đúng**: `licensePlate`, `entryTime`, `assignedSpotId`, `totalAmount`, `currentUser`.
  - ❌ **Cấm**: Đặt tên viết tắt tối nghĩa 1 chữ cái như: `a`, `b`, `p`, `s`, `temp`, `data1`.
- **Biến Boolean**: Bắt buộc có trợ động từ đi trước:
  - ✅ **Đúng**: `isAvailable`, `isPaid`, `hasViolation`, `canExit`.
  - ❌ **Sai**: `available`, `paid`, `check`, `flag`.
- **Hằng số (Constants / `static final`)**: Viết hoa toàn bộ cách nhau dấu gạch dưới **`UPPER_SNAKE_CASE`**:
  - ✅ **Ví dụ**: `DEFAULT_FIRST_HOUR_FEE`, `MAX_ASSIGN_TIMEOUT_MINUTES`, `JWT_EXPIRATION_MS`.
  - ❌ **Cấm Magic Numbers**: Không viết các số như `20000` hay `10000` trực tiếp vào code tính toán mà phải khai báo thành hằng số hoặc đọc từ bảng `parking_rates`.

### 4.3. Quy chuẩn đặt tên Tham số (Parameters)
- Luôn viết bằng `camelCase`, mô tả đúng bản chất dữ liệu truyền vào:
  - ✅ **Đúng**: `assignSpot(Long spotId, Long sessionId, Long staffId)`
  - ❌ **Sai**: `assignSpot(Long s, Long sid, Long u)`
- Trong REST Controller, tên tham số `@PathVariable` hoặc `@RequestParam` phải khớp rõ ràng:
  ```java
  @GetMapping("/spots/{spotId}")
  public ResponseEntity<SpotDetailResponse> getSpotDetail(@PathVariable Long spotId)
  ```

### 4.4. Phong cách viết Code (Clean Code & Formatting)
1. **Căn lề (Indentation)**:
   - Backend (Java): Sử dụng **4 spaces** cho mỗi cấp thụt đầu dòng.
   - Frontend (React / JS): Sử dụng **2 spaces**.
2. **Quy tắc dấu ngoặc nhọn `{ }`**:
   - Mở ngoặc `{` ngay cuối dòng khai báo hàm/if/for, không xuống dòng riêng lẻ (1TBS style).
3. **Độ dài hàm & nguyên tắc đơn nhiệm (Single Responsibility)**:
   - Mỗi hàm **không nên vượt quá 30 - 40 dòng**.
   - Mỗi hàm chỉ làm đúng một việc duy nhất. Nếu một hàm vừa kiểm tra xe, vừa tính tiền, vừa mở barrier thì phải tách thành các hàm con riêng biệt.
4. **Xử lý Null an toàn**:
   - Backend: Dùng `Optional<T>` cho kết quả từ Repository (vd: `Optional<ParkingSpot> spotOpt`).
   - Frontend: Dùng Optional Chaining `session?.licensePlate` và Nullish Coalescing `fee ?? 0` để tránh lỗi sập màn hình `Cannot read property of undefined`.
5. **Ghi chú thích (Comments)**:
   - Không comment những thứ hiển nhiên (vd: `// Lấy id xe`).
   - Chỉ comment giải thích **tại sao (Why)** làm như vậy đối với các nghiệp vụ phức tạp (như công thức tính tiền lẻ giờ theo BR-08, logic phân bổ khóa dòng TC-10).

---

## ☕ 5. QUY CHUẨN KIẾN TRÚC BACKEND (JAVA SPRING BOOT)

1. **Cấu trúc phân tầng nghiêm ngặt**:
   - `controller`: Chỉ nhận request, validate dữ liệu đầu vào (`@Valid`) và gọi service. Không viết logic tính toán tại đây.
   - `service`: Chứa toàn bộ nghiệp vụ (tính tiền, kiểm tra ô trống, tạo session).
   - `repository`: Chỉ đảm nhận truy vấn database qua JPA.
   - `entity`: Ánh xạ 11 bảng trong ERD.
2. **DTO (Data Transfer Object)**:
   - **Bắt buộc**: Tách biệt hoàn toàn `request/` (nhận từ client) và `response/` (trả về client).
   - Tuyệt đối **không trả trực tiếp JPA Entity ra Controller** để tránh lỗi lazy loading, vòng lặp Jackson JSON hoặc lộ dữ liệu nhạy cảm.
3. **Quản lý Cổng và Đường dẫn API**:
   - Backend chạy trên cổng **`8088`** (để tránh xung đột cổng 8080 của Tomcat/XAMPP).
   - Mọi URL REST API phải có tiền tố `/api/` và dùng danh từ số nhiều (vd: `/api/spots`, `/api/sessions`, `/api/rates`).
4. **Xử lý ngoại lệ (Exception Handling)**:
   - Ném các Custom Exception rõ nghĩa (vd: `ResourceNotFoundException`, `SpotNotAvailableException`).
   - Mọi lỗi được bắt tập trung tại `GlobalExceptionHandler` và trả về JSON chuẩn:
     ```json
     {
       "success": false,
       "message": "Ô đỗ A03 đã được phân bổ cho xe khác!",
       "timestamp": "2026-10-14T10:30:00"
     }
     ```

---

## ⚛️ 6. QUY CHUẨN FRONTEND (REACTJS + TAILWIND CSS)

1. **Cổng chạy máy chủ phát triển**: Cổng **`3000`** (`http://localhost:3000`).
2. **Đặt tên Component & File**:
   - Component: `PascalCase` (vd: `SpotGrid.jsx`, `BarrierControl.jsx`).
   - Hooks: Bắt đầu bằng chữ `use` (vd: `useAuth.js`, `useParkingSpots.js`).
   - Folders: Viết thường cách nhau dấu gạch ngang (kebab-case) (vd: `entry-gate`, `camera-monitor`).
3. **Quy chuẩn mã màu trạng thái ô đỗ (Bắt buộc dùng màu thống nhất)**:
   - Ô trống (`AVAILABLE`): `bg-emerald-500`, viền `border-emerald-600` (Xanh lá).
   - Đã gán (`ASSIGNED`): `bg-amber-500`, viền `border-amber-600` (Vàng cam).
   - Đang đỗ (`OCCUPIED`): `bg-red-500`, viền `border-red-600` (Đỏ).
   - Mất kết nối/không rõ (`UNKNOWN`): `bg-purple-500` (Tím).
   - Bảo trì (`OUT_OF_SERVICE`): `bg-slate-500` (Xám).
4. **Gọi API**:
   - Không được viết cứng URL `http://localhost:8088` rải rác trong từng component.
   - Tập trung cấu hình trong file Axios instance `src/services/apiClient.js` và các hàm service tương ứng.

---

## 🗄️ 5. QUY CHUẨN DATABASE (MYSQL)

1. **Đặt tên**:
   - Tên bảng: `snake_case`, số nhiều (vd: `parking_spots`, `parking_sessions`, `staff_actions`).
   - Tên cột: `snake_case` (vd: `session_id`, `license_plate`, `entry_time`).
2. **Khóa chính**: Luôn đặt tên là `<tên_bảng_số_ít>_id` (vd: `spot_id`, `camera_id`) kiểu số nguyên tự tăng.
3. **Múi giờ**: Hệ thống sử dụng múi giờ Việt Nam `Asia/Ho_Chi_Minh` (GMT+7) cho toàn bộ các trường `DATETIME`.

---

## ✅ 6. CHECKLIST TỰ KIỂM TRA TRƯỚC KHI PUSH CODE

- [ ] Code của tôi không thêm bất kỳ màn hình nào cho tài xế hay logic thẻ RFID.
- [ ] Tôi đã kiểm tra kỹ logic phân bổ ô và tính tiền theo BR-08.
- [ ] Code không chứa các file rác, file `.env` chứa mật khẩu cá nhân.
- [ ] Frontend chạy `npm run build` không bị lỗi.
- [ ] Backend chạy `mvn compile` không bị lỗi.
- [ ] Tôi đã viết commit message đúng chuẩn và tạo PR từ nhánh feature riêng.
