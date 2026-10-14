# ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)
## SMARTPARK – HỆ THỐNG QUẢN LÝ BÃI ĐỖ XE Ô TÔ THÔNG MINH ỨNG DỤNG AI VÀ ITS
**Phiên bản 1.2 | Môn: Hệ thống giao thông thông minh (ITS) | 12/10/2026**

### PHẠM VI ĐÃ THỐNG NHẤT:
Chỉ có giao diện Admin và Nhân viên. Tài xế không có tài khoản, không truy cập website, không tự xem ô trống. Không sử dụng thẻ RFID.

---

### 1. Giới thiệu
- **Mục đích**: Đặc tả chức năng, quy tắc nghiệp vụ, dữ liệu, giao diện và tiêu chí nghiệm thu của SmartPark phục vụ xây dựng demo và báo cáo ITS.
- **Phạm vi**: Quản lý một bãi ô tô gồm nhiều khu/tầng. Camera cổng nhận diện biển số; camera tầng hầm phát hiện ô có xe/trống; nhân viên xem web, chọn ô khả dụng và hướng dẫn tài xế bằng lời; hệ thống ghi thời gian, tính phí và lưu lịch sử. Barrier và thanh toán có thể mô phỏng trong bản demo.

---

### 2. Quy trình nghiệp vụ
- **Xe vào bãi**:
  1. Xe đến cổng; camera chụp ảnh và AI nhận diện biển số.
  2. Backend kiểm tra biển số hợp lệ, chưa có lượt gửi hoạt động và bãi còn chỗ khả dụng.
  3. Tạo lượt gửi, lưu ảnh và giờ vào từ máy chủ.
  4. Web nhân viên hiển thị biển số và danh sách ô trống.
  5. Nhân viên chọn ô phù hợp, hệ thống khóa ô ở trạng thái ASSIGNED và lưu phân bổ.
  6. Nhân viên nói vị trí cho tài xế; hệ thống mở barrier (mô phỏng khi demo).
  7. Camera tầng hầm xác nhận có xe tại ô, cập nhật OCCUPIED.
- **Xe ra bãi**:
  1. Xe rời ô; camera tầng hầm xác nhận ô trống và cập nhật AVAILABLE, nhưng lượt gửi vẫn ACTIVE.
  2. Xe đến cổng ra; camera nhận diện biển số.
  3. Backend tìm lượt gửi đang hoạt động và đối chiếu biển số/ảnh.
  4. Nếu hợp lệ, ghi thời điểm tính phí và tính số tiền theo bảng giá.
  5. Nhân viên xem phí và xác nhận thanh toán hoặc hệ thống nhận xác nhận giao dịch.
  6. Sau khi đủ điều kiện, barrier mở; xác nhận xe qua cổng và kết thúc lượt gửi COMPLETED.

---

### 3. Yêu cầu chức năng (FR-01 đến FR-12)
- **FR-01**: Đăng nhập, đăng xuất và phân quyền Admin/Staff (Không có đăng ký/đăng nhập tài xế)
- **FR-02**: AI nhận diện biển số ở cổng vào, lưu ảnh và giờ vào
- **FR-03**: Hiển thị danh sách ô AVAILABLE theo khu/tầng
- **FR-04**: Nhân viên phân bổ ô và hướng dẫn tài xế bằng lời (chuyển ASSIGNED, không cấp trùng)
- **FR-05**: Camera AI phát hiện ô có xe / trống (cập nhật OCCUPIED / AVAILABLE)
- **FR-06**: Giám sát xe đỗ sai ô, camera lỗi và cảnh báo
- **FR-07**: AI nhận diện biển số cổng ra và đối chiếu lượt gửi
- **FR-08**: Tính phí theo giờ vào/ra và bảng giá hiệu lực
- **FR-09**: Ghi nhận thanh toán và cho xe ra
- **FR-10**: Admin quản lý khu, ô đỗ, camera, bảng giá
- **FR-11**: Admin quản lý tài khoản nhân viên
- **FR-12**: Dashboard, lịch sử và báo cáo
