import {
  RefreshToken,
  RefreshTokenCondDTO,
  RefreshTokenCreateDTO,
  RefreshTokenUpdateDTO,
} from "../models/types/RefreshToken";
import { PagingDTO } from "../share/types";
import { IReceiptService } from "./interfaces/IReceiptService";
import { IRefreshTokenService } from "./interfaces/IRefreshTokenService";

export class RefreshTokenService implements IRefreshTokenService {
  find(id: string): Promise<RefreshToken> {
    throw new Error("Method not implemented.");
  }
  findAll(
    cond: RefreshTokenCondDTO,
    paging: PagingDTO
  ): Promise<RefreshToken[]> {
    throw new Error("Method not implemented.");
  }
  create(data: RefreshTokenCreateDTO): Promise<string> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: RefreshTokenUpdateDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string, isHard?: boolean): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
