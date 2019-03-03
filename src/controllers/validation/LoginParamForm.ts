import { IsString, IsUUID, IsOptional } from "class-validator";
import { User } from "src/domain/User/User";

export class LoginParamForm {

    @IsString()
    public login: string;

    @IsString()
    public password: string;

}