# TEST PLAN & DEMO SCENARIOS - SMARTPARK

## 1. Mục tiêu kiểm thử
Xác thực các yêu cầu chức năng (FR-01 đến FR-12) và phi chức năng (NFR-01 đến NFR-07) phục vụ báo cáo và nghiệm thu đề tài ITS.

## 2. Kịch bản kiểm thử (Test Cases theo SRS Mục 10)

| Mã TC | Thao tác thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- |
| **TC-01** | Nạp ảnh/video cổng vào | AI nhận diện biển số, hệ thống tạo lượt gửi và lưu ảnh + giờ vào |
| **TC-02** | Nhân viên chọn ô trống A03 trên web | Ô A03 đổi sang `ASSIGNED`, barrier mở, nhân viên nói vị trí cho tài xế |
| **TC-03** | Nạp video xe đỗ đúng ô A03 | Camera tầng hầm xác nhận xe đỗ, ô A03 đổi sang `OCCUPIED` |
| **TC-04** | Xe đỗ sai sang ô A04 | Hệ thống phát hiện bất thường, gửi cảnh báo `WRONG_SPOT` cho nhân viên |
| **TC-05** | Nạp video xe rời khỏi ô A03 | Ô A03 chuyển về `AVAILABLE`, lượt gửi của xe vẫn ở trạng thái `ACTIVE` |
| **TC-06** | Nạp ảnh/video xe đến cổng ra | AI đọc biển số, tìm thấy session đang chạy, tính phí đỗ xe chính xác |
| **TC-07** | Nhân viên bấm "Xác nhận thanh toán" | Trạng thái chuyển `COMPLETED`, barrier cổng ra mở để xe rời bãi |
| **TC-08** | Biển số xe cổng ra không khớp | Cảnh báo đỏ, barrier không tự mở, chuyển sang quy trình xử lý thủ công |
| **TC-09** | Bãi đỗ không còn ô `AVAILABLE` | Cảnh báo bãi đầy (`PARKING_FULL`), từ chối tạo lượt gửi mới tại cổng vào |
| **TC-10** | Hai nhân viên cùng chọn ô A03 cùng lúc | Database transaction khóa dòng; chỉ 1 người thành công, người kia báo trùng |
