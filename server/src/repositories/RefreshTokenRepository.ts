import { modelName } from "../models/interfaces/IRefreshToken";
import {
  RefreshToken,
  RefreshTokenCondDTO,
  RefreshTokenUpdateDTO,
} from "../models/types/RefreshToken";
import { MongoRepository } from "../share/components/MongoRepository";

export class RefreshTokenRepository extends MongoRepository<
  RefreshToken,
  RefreshTokenCondDTO,
  RefreshTokenUpdateDTO
> {
  constructor() {
    super(modelName);
  }
}
