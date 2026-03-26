import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePrDto { // Dto สำหรับรายการเบิก PR ต้องไม่เป็นค่าว่างและเป็นตัวหนังสือเท่านั้น
  @IsNotEmpty({ message: 'กรุณาระบุชื่อรายการที่ต้องเบิก' })
  @IsString()
  title: string;
  // จำนวนรายการเบิกต้องไม่เป็นค่าว่างและเป็นตัวเลขเท่านั้น
  @IsNotEmpty({ message: 'กรุณาระบุจำนวนเงิน' })
  @IsNumber({}, { message: 'จำนวนเงินต้องเป็นตัวเลขเท่านั้น' })
  @Min(1, { message: 'จำนวนต้องมากกว่า 0' })
  amount: number;
}
