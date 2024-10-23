import {
  Auth,
  AuthLoginDTO,
  AuthRefreshTokenDTO,
  AuthRegisterDTO,
} from "../../models/types/Auth";
import { GoogleAuthDTO } from "../../models/types/GoogleAuth";

export interface IAuthService {
  register(data: AuthRegisterDTO): Promise<string>;
  login(data: AuthLoginDTO): Promise<Auth | null>;
  loginByGoogle( data: GoogleAuthDTO, isAllowCustommer: boolean): Promise<Auth | null>;
  refreshToken(data: AuthRefreshTokenDTO): Promise<Auth | null>;
  verifyUser(code: string): Promise<boolean>;
}
