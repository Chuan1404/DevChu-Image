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
> {}
