# DEVELOPER GUIDE - SMARTPARK

## 1. Project Setup
- Clone repository and ensure Java 17+, Maven 3.8+, Node.js 18+, and Docker are installed.
- Configure database connection in `backend/src/main/resources/application.yml`.

## 2. Running Services Locally
- **Frontend**:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- **Backend**:
  ```bash
  cd backend
  mvn spring-boot:run
  ```

## 3. Running with Docker Compose
```bash
docker compose up -d --build
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8088/api`
