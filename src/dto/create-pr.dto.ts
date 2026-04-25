import { IsNotEmpty, IsNumber, IsString, Min, IsOptional } from 'class-validator';

export class CreatePrDto { 
  @IsNotEmpty({ message: 'กรุณาระบุชื่อรายการที่ต้องเบิก' })
  @IsString()
  title: string;

  // เพิ่มฟิลด์แผนก (บังคับกรอก)
  @IsNotEmpty({ message: 'กรุณาระบุแผนก' })
  @IsString()
  department: string;

  @IsNotEmpty({ message: 'กรุณาระบุจำนวนเงิน' })
  @IsNumber({}, { message: 'จำนวนเงินต้องเป็นตัวเลขเท่านั้น' })
  @Min(1, { message: 'จำนวนต้องมากกว่า 0' })
  amount: number;

  // เพิ่มฟิลด์เหตุผล (ไม่บังคับกรอก ใช้ @IsOptional)
  @IsOptional()
  @IsString()
  reason?: string;
}