# HƯỚNG DẪN DÀNH CHO NHÂN VIÊN VẬN HÀNH (STAFF) - SMARTPARK

## 1. Giới thiệu
Nhân viên trực tại bốt điều khiển sử dụng Staff Portal để giám sát xe vào, phân bổ ô trống, hướng dẫn tài xế, đối chiếu xe ra và xác nhận thanh toán.

## 2. Quy trình làm việc tiêu chuẩn

### 2.1. Quy trình xe vào cổng
1. Xe đến cổng vào, camera AI tự động chụp ảnh và đọc biển số.
2. Nhân viên kiểm tra biển số hiển thị trên màn hình.
3. Nhân viên quan sát danh sách ô trống màu xanh (`AVAILABLE`) và chọn 1 ô phù hợp.
4. Ô đỗ chuyển sang trạng thái vàng cam (`ASSIGNED`).
5. Nhân viên thông báo vị trí cho tài xế bằng lời (ví dụ: *"Mời anh vào ô A03 ở tầng hầm"*).
6. Thanh chắn barrier mở cho xe vào bãi.

### 2.2. Quy trình xe ra cổng
1. Xe đến cổng ra, AI nhận diện biển số và đối chiếu lượt gửi tương ứng.
2. Màn hình hiển thị thời gian gửi xe và số tiền cần thanh toán.
3. Nhân viên thu tiền mặt hoặc đưa mã QR cho tài xế quét.
4. Bấm "Xác nhận thanh toán", barrier mở cho xe ra khỏi bãi.

### 2.3. Xử lý ngoại lệ & Cảnh báo
- Xe đỗ sai ô (`WRONG_SPOT`): Hệ thống gửi chuông cảnh báo, nhân viên kiểm tra camera tầng hầm để điều phối.
- Biển số sai/mờ: Chuyển sang chế độ nhập biển số thủ công (có ghi nhật ký kiểm toán).
