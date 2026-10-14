# HƯỚNG DẪN DÀNH CHO QUẢN TRỊ VIÊN (ADMIN) - SMARTPARK

## 1. Giới thiệu
Quản trị viên có toàn quyền truy cập Admin Portal để thiết lập bãi đỗ xe, thiết bị camera, tài khoản nhân viên và theo dõi thống kê doanh thu.

## 2. Các chức năng chính
1. **Quản lý bãi xe và ô đỗ (`/management`)**:
   - Thêm/sửa/xóa khu vực, tầng hầm, phân khu.
   - Quản lý danh sách ô đỗ, tạm đóng bảo trì (`OUT_OF_SERVICE`).
2. **Quản lý Camera**:
   - Thêm camera cổng vào (`ENTRY`), cổng ra (`EXIT`), tầng hầm (`PARKING`).
   - Cấu hình luồng RTSP và góc chiếu tương ứng từng ô đỗ.
3. **Bảng giá (`/rates`)**:
   - Thiết lập biểu phí: mặc định 20.000đ giờ đầu, 10.000đ mỗi giờ tiếp theo.
4. **Quản lý tài khoản nhân viên (`/staff`)**:
   - Tạo mới nhân viên trực ca, cấp quyền, khóa tài khoản khi cần.
5. **Báo cáo doanh thu (`/reports`)**:
   - Xem tổng doanh thu theo ngày, tháng, xuất file thống kê lượt xe.
