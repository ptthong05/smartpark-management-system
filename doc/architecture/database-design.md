# DATABASE DESIGN - SMARTPARK (ERD)

## 1. Tổng quan
Hệ thống sử dụng cơ sở dữ liệu quan hệ **MySQL 8.0** gồm 11 bảng chuẩn theo sơ đồ ERD:

```text
users ───────────< staff_actions
                      |
parking_areas ───< parking_spots ───< camera_spots >─── cameras
                         |                                 |
                         |                                 |
                  parking_sessions ───────────────< parking_events
                      |     |
                      |     +───< images
                      +─────────< payments
                      +─────────< system_alerts
```

## 2. Chi tiết 11 bảng dữ liệu

1. **`users`**: Tài khoản quản trị và nhân viên vận hành (`ADMIN`, `STAFF`).
2. **`parking_areas`**: Quản lý tầng, phân khu (`TANG_HAM`, `KHU_A`, `KHU_B`).
3. **`parking_spots`**: Ô đỗ xe (`AVAILABLE`, `ASSIGNED`, `OCCUPIED`, `UNKNOWN`, `OUT_OF_SERVICE`).
4. **`cameras`**: Thiết bị camera và luồng RTSP (`ENTRY`, `EXIT`, `PARKING`).
5. **`camera_spots`**: Bảng liên kết nhiều-nhiều giữa camera tầng hầm và các ô đỗ quan sát được.
6. **`parking_sessions`**: Lượt gửi xe (biển số, giờ vào, giờ ra, ô đỗ, trạng thái `ACTIVE`, `COMPLETED`, tổng tiền).
7. **`images`**: Lưu URL ảnh chụp tại cổng vào, cổng ra và tại ô đỗ.
8. **`parking_events`**: Nhật ký sự kiện (`VEHICLE_DETECTED`, `PLATE_RECOGNIZED`, `BARRIER_OPEN`, `BARRIER_CLOSE`...).
9. **`staff_actions`**: Nhật ký thao tác nhân viên (phân bổ ô, mở barrier thủ công khi có sự cố).
10. **`parking_rates`**: Bảng giá biểu phí đỗ xe (mặc định 20.000đ giờ đầu, 10.000đ giờ tiếp theo).
11. **`payments`**: Giao dịch thanh toán (`CASH`, `QR`, `BANK_TRANSFER`, trạng thái `PENDING`, `SUCCESS`).
