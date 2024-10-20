import {
  RefreshToken,
  RefreshTokenCondDTO,
  RefreshTokenUpdateDTO,
} from "../../models/types/RefreshToken";
import { IRepository } from "../../share/interfaces/IRepository";

export interface IRefreshTokenRepository
  extends IRepository<
    RefreshToken,
    RefreshTokenCondDTO,
    RefreshTokenUpdateDTO
  > {}
