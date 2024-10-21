import {
  Auth,
  AuthLoginDTO,
  AuthRefreshTokenDTO,
  AuthRegisterDTO,
} from "../../models/types/Auth";

export interface IAuthService {
  register(data: AuthRegisterDTO): Promise<string>;
  login(data: AuthLoginDTO): Promise<Auth | null>;
  refreshToken(data: AuthRefreshTokenDTO): Promise<Auth | null>;
}
