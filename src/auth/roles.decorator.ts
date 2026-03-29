import { SetMetadata } from '@nestjs/common'; // function setmetada ลงไปที่ method class

export const Roles = (...roles: String[]) => SetMetadata('roles', roles); // custom decorator กำหนด roles ที่ให้เข้าถึง
