# 🏢 PR System - Backend (NestJS + Prisma)

ระบบจัดการใบขออนุมัติสั่งซื้อ (Purchase Request) พัฒนาด้วย NestJS และ PostgreSQL

## 🚀 ฟีเจอร์หลัก (Features)
- **Authentication**: ระบบสมัครสมาชิก และเข้าสู่ระบบด้วย JWT (Json Web Token)
- **Purchase Request (PR)**: 
  - สร้างใบขอซื้อใหม่ (ผูกกับพนักงานที่ Login อัตโนมัติ)
  - ดึงรายการใบขอซื้อทั้งหมดของตนเองออกมาดู
  - อัปเดตสถานะใบ PR (Approved / Rejected)
- **Database**: ออกแบบ Schema แบบ Relation (One-to-Many) ระหว่าง User และ PR

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL (Docker / Local)
- **Security**: Passport-JWT, Bcrypt (Password Hashing)
- **Validation**: Class-validator, Class-transformer

## 📋 รายการ API (Endpoints)

### Auth Module
- `POST /auth/register`: สมัครสมาชิกใหม่
- `POST /auth/login`: เข้าสู่ระบบเพื่อรับ Token

### PR Module (Security & Rules)
- **POST `/pr`**: สร้างใบขอซื้อใหม่ (ผูกกับ User ID จาก Token)
- **GET `/pr`**: ดูรายการใบขอซื้อทั้งหมดของตนเอง
- **PATCH `/pr/:id/status`**: อัปเดตสถานะ (เฉพาะ Admin/Purchasing เท่านั้น)
- **DELETE `/pr/:id`**: ลบใบขอซื้อโดยมีเงื่อนไข
  - ต้องเป็นเจ้าของใบ PR นั้นๆ เท่านั้น
  - **สถานะต้องเป็น `Pending` เท่านั้น** ถึงจะลบได้เพื่อป้องกันการลบเอกสารที่อนุมัติไปแล้ว