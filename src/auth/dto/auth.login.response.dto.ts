import { IsString } from "class-validator";

export class AuthLoginResponseDTO {
    @IsString()
    access_token: string;
}