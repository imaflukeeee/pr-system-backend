import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// Data Transfer Object รับข้อมูลจาก client register/login
export class AuthDto {
  // ตรวจสอบรูปแบบ email ต้องไม่เป็นค่าว่าง
  @IsEmail({}, { message: 'รูปแบบอีเมลไม่ถูกต้อง ' })
  @IsNotEmpty({ message: 'กรุณากรอกอีเมล' })
  email!: string;
  // ตรวจสอบ password ความยาว 8 ตัวอักษรและไม่เป็นค่าว่าง
  @IsNotEmpty({ message: 'กรุณากรอกรหัสผ่าน' })
  @MinLength(8, { message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร' })
  password!: string;
}
