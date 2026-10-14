# AI DESIGN - SMARTPARK

## 1. Mục tiêu
Hệ thống AI phục vụ 2 tác vụ thị giác máy tính chính:
1. **Nhận diện biển số (License Plate Recognition - LPR)** tại cổng vào và cổng ra.
2. **Phát hiện trạng thái ô đỗ (Parking Spot Occupancy Detection)** tại camera tầng hầm (`AVAILABLE` hoặc `OCCUPIED`).

## 2. Quy trình xử lý (Pipelines)

### 2.1. Pipeline nhận diện biển số cổng vào / cổng ra
```text
[Camera Frame] ──► [Phát hiện xe / vùng biển số (YOLOv8)] 
               ──► [Cắt ảnh biển số (Crop & Preprocess)] 
               ──► [Nhận diện ký tự OCR (EasyOCR / CRNN)] 
               ──► [Lọc định dạng chuẩn biển số VN] 
               ──► [Gửi HTTP POST tới Spring Boot: /api/sessions/entry-event]
```

### 2.2. Pipeline phát hiện ô đỗ tầng hầm
```text
[Camera Tầng Hầm] ──► [Phát hiện xe tại các vùng ROI (Region of Interest)]
                  ──► [Xác định độ tin cậy IOU với tọa độ ô đỗ]
                  ──► [Cập nhật trạng thái: OCCUPIED / AVAILABLE]
                  ──► [Gửi HTTP POST tới Spring Boot: /api/ai/spot-events]
```

## 3. Tiêu chí nghiệm thu (NFR-02)
- Độ chính xác nhận diện biển số: `>= 90%` trên tập ảnh kiểm thử.
- Thời gian trễ xử lý (Latency): `< 1.5 giây` cho mỗi khung hình chụp tại cổng.
