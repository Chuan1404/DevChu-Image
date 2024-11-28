import { modelName } from "../models/interfaces/IRefreshToken";
import {
  RefreshToken,
  RefreshTokenCondDTO,
  RefreshTokenUpdateDTO,
} from "../models/types/RefreshToken";
import { MongoRepository } from "../share/components/MongoRepository";
import { PrismaRepository } from "../share/components/PrismaRepository";

export class RefreshTokenRepository extends PrismaRepository<
  RefreshToken,
  RefreshTokenCondDTO,
  RefreshTokenUpdateDTO
> {
  constructor() {
    super(modelName);
  }
}
