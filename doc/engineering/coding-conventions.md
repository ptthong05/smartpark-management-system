# QUY TẮC & NGUYÊN TẮC LÀM VIỆC NHÓM (TEAM CONVENTIONS)

> Xem bản đầy đủ chính thức tại: [CONTRIBUTING.md](../../CONTRIBUTING.md)

Tài liệu này tóm tắt các nguyên tắc cốt lõi dành cho các thành viên trong nhóm phát triển dự án **SmartPark**:

1. **Phạm vi nghiệp vụ (SRS)**:
   - Chỉ có giao diện **Admin** và **Staff**.
   - Tuyệt đối không tạo giao diện/app cho tài xế. Không sử dụng RFID.
   - Phân bổ ô phải đảm bảo tính Transaction nguyên tử (`@Transactional`, khóa dòng chống cấp trùng ô `AVAILABLE`).

2. **Quy chuẩn Git**:
   - Nhánh tính năng: `feature/<tên-tính-năng>`.
   - Nhánh sửa lỗi: `bugfix/<tên-lỗi>`.
   - Commit chuẩn: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`.
   - Bắt buộc kiểm tra `npm run build` và `mvn compile` trước khi tạo Pull Request vào nhánh `main`.

3. **Quy chuẩn Tên Lớp (Classes)**:
   - PascalCase cho toàn bộ Class/Interface: `User`, `ParkingSpotRepository`, `ParkingSessionService`, `AuthController`, `SpotGrid.jsx`.

4. **Quy chuẩn Hàm, Biến, Tham số (Methods, Variables, Parameters)**:
   - **Hàm**: Bắt đầu bằng động từ `camelCase`: `get...`, `find...`, `calculate...`, `is...`, `has...`, `create...`, `handle...`.
   - **Biến/Thuộc tính**: Tiếng Anh rõ nghĩa `camelCase` (`licensePlate`, `entryTime`). Cấm viết tắt 1 chữ cái (`a`, `p`, `s`).
   - **Biến Boolean**: Bắt buộc có trợ động từ `is`, `has`, `can` (`isAvailable`, `isPaid`).
   - **Hằng số**: Viết hoa `UPPER_SNAKE_CASE` (`DEFAULT_FIRST_HOUR_FEE = 20000`). Tuyệt đối không dùng Magic Numbers.
   - **Tham số**: Viết rõ ràng `assignSpot(Long spotId, Long sessionId)` thay vì viết tắt.

5. **Phong cách viết code (Code Style)**:
   - Thụt lề: 4 spaces cho Java, 2 spaces cho React/JS.
   - Dấu ngoặc nhọn `{` mở cùng dòng (1TBS).
   - Hàm ngắn gọn: dưới 30 - 40 dòng, làm duy nhất 1 nhiệm vụ.
   - Xử lý Null an toàn bằng `Optional<T>` (Java) và Optional Chaining `?.` (React).
