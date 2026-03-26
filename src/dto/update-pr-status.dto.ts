import { IsNotEmpty, IsString, IsIn } from "class-validator";

export class UpdatePrStatusDto {
    @IsNotEmpty({ message: 'กรุณาระบุสถานะ' })
    @IsString()
    @IsIn(['Approved', 'Rejected'], { message: 'สถานะต้องเป็น Approved หรือ Rejected เท่านั้น' })
    status: string;
}