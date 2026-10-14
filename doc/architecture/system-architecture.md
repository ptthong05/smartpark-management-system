# SYSTEM ARCHITECTURE - SMARTPARK

## 1. Overview
SmartPark is an Intelligent Transportation System (ITS) for smart parking management applying AI for license plate recognition (LPR) and parking spot occupancy detection.

## 2. Architecture Diagram

```mermaid
graph TD
    Client["Frontend Client (ReactJS + Vite + Tailwind CSS)<br/>- Admin Portal<br/>- Staff Portal"]
    Backend["Backend Service (Java Spring Boot 3)<br/>- REST API Controller<br/>- Spring Security + JWT<br/>- WebSocket Push<br/>- Fee Engine & State Manager"]
    DB[("MySQL Database<br/>- 11 Core Tables")]
    AI["AI Vision Service (Python)<br/>- Entry/Exit License Plate OCR<br/>- Basement Spot Occupancy (YOLO)"]
    Barrier["Barrier Simulator / Hardware Interface"]

    Client <-->|REST API / WebSocket| Backend
    AI -->|HTTP Webhooks| Backend
    Backend <-->|Spring Data JPA| DB
    Backend -->|GPIO / Simulation Event| Barrier
```

## 3. Technology Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Java 17+, Spring Boot 3.3.4, Spring Security (JWT), Spring Data JPA, WebSocket
- **Database**: MySQL 8.0
- **AI Service**: Python (YOLOv8, OpenCV, EasyOCR / PaddleOCR)
- **Deployment**: Docker & Docker Compose
