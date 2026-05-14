import { Role } from "@/modules/auth/roles/roles.enum";
import { IsString, IsOptional, IsEmail, IsEnum, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email!: string;

    @IsOptional()
    @IsString()
    username?: string;

    @IsString()
    @MinLength(4)
    password!: string;

    @IsOptional()
    @IsEnum(Role)
    role = Role.USER;
}
