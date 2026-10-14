# DEPLOYMENT GUIDE - SMARTPARK

## 1. Yêu cầu môi trường
- Docker Engine >= 24.0 & Docker Compose >= 2.0
- Node.js >= 18.0 & npm >= 9.0 (nếu chạy local)
- Java OpenJDK >= 17 & Maven >= 3.8 (nếu chạy local)

## 2. Triển khai bằng Docker Compose (Khuyên dùng)
Chạy toàn bộ MySQL, Spring Boot và React Nginx:
```powershell
docker compose up -d --build
```

Kiểm tra trạng thái:
```powershell
docker compose ps
```

Dừng hệ thống:
```powershell
docker compose down
```

## 3. Triển khai thủ công từng phần (Local Development)
- **Frontend**:
  ```powershell
  cd frontend
  npm install
  npm run dev
  ```
- **Backend**:
  ```powershell
  cd backend
  mvn spring-boot:run
  ```
