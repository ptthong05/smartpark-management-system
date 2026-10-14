# HƯỚNG DẪN DÀNH CHO LẬP TRÌNH VIÊN (DEVELOPER) - SMARTPARK

## 1. Khởi tạo môi trường
- Đảm bảo máy đã cài đặt: **Java 17+**, **Maven 3.8+**, **Node.js 18+**, **Docker** (tùy chọn).
- Clone source code và mở bằng IDE (IntelliJ IDEA hoặc VS Code).

## 2. Chạy ứng dụng trực tiếp (Local)
- **Frontend (ReactJS + Vite + Tailwind CSS)**:
  ```powershell
  cd frontend
  npm install
  npm run dev
  ```
  Truy cập: `http://localhost:3000`

- **Backend (Java Spring Boot)**:
  ```powershell
  cd backend
  mvn spring-boot:run
  ```
  API Docs / Health: `http://localhost:8088/api/health`

## 3. Khởi chạy toàn bộ bằng Docker Compose
```powershell
docker compose up -d --build
```
Dừng hệ thống:
```powershell
docker compose down
```
