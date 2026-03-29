import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler()); // อ่าน api เช็ค role
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest(); // ดึงข้อมูลจาก user ใน token
        const user = request.user;

        if (!user || !requiredRoles.includes(user.role)) { // request role
            throw new ForbiddenException('เฉพาะเจ้าหน้าที่ฝ่ายจัดซื้อเท่านั้นที่ทำรายการนี้ได้');
        }
        return true;
    }
}