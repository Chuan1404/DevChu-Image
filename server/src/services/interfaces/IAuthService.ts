import {
  Auth,
  AuthLoginDTO,
  AuthRefreshTokenDTO,
  AuthRegisterDTO,
} from "../../models/types/Auth";

export interface IAuthService {
  register(data: AuthRegisterDTO): Promise<Auth | null>;
  login(data: AuthLoginDTO): Promise<Auth | null>;
  refreshToken(data: AuthRefreshTokenDTO): Promise<Auth | null>;
}
