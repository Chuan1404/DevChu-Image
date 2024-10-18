import {
  RefreshToken,
  RefreshTokenCondDTO,
  RefreshTokenCreateDTO,
  RefreshTokenUpdateDTO,
} from "../../models/types/RefreshToken";
import { IService } from "../../share/interfaces/IService";

export interface IRefreshTokenService
  extends IService<
    RefreshToken,
    RefreshTokenCondDTO,
    RefreshTokenCreateDTO,
    RefreshTokenUpdateDTO
  > {}
