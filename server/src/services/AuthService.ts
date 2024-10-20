import jwt, { JwtPayload } from "jsonwebtoken";
import { v7 } from "uuid";
import {
  Auth,
  AuthLoginDTO,
  AuthLoginSchema,
  AuthPayloadDTO,
  AuthRefreshTokenDTO,
  AuthRefreshTokenSchema,
  AuthRegisterDTO,
  AuthRegisterSchema,
} from "../models/types/Auth";
import { RefreshToken } from "../models/types/RefreshToken";
import { User } from "../models/types/User";
import { IRefreshTokenRepository } from "../repositories/interfaces/IRefreshTokenRepository";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { IAuthService } from "../services/interfaces/IAuthService";
import { EAccountStatus, EModelStatus } from "../share/enums";
import {
  ErrDataExisted,
  ErrDataInvalid,
  ErrDataNotFound,
} from "../share/errors";
import { IComparePassword } from "../share/interfaces/IComparePassword";
import { IHashPassword } from "../share/interfaces/IHashPassword";

export default class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    private readonly hashPassword: IHashPassword,
    private readonly comparePassword: IComparePassword
  ) {}

  async register(data: AuthRegisterDTO): Promise<Auth | null> {
    const {
      success,
      data: parsedData,
      error,
    } = AuthRegisterSchema.safeParse(data);

    if (!success) {
      console.log(error);
      throw ErrDataInvalid;
    }

    const existedUser = await this.userRepository.findByCond({
      email: parsedData.email,
    });

    if (existedUser) {
      throw ErrDataExisted;
    }

    const hashPassword = this.hashPassword.hash(parsedData.password);

    let newId = v7();
    let newUser: User = {
      id: newId,
      email: parsedData.email,
      password: hashPassword,
      name: parsedData.name,
      avatar: "",
      role: parsedData.role,
      status: EModelStatus.ACTIVE,
      accountStatus: EAccountStatus.UNVERIFIED,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.userRepository.create(newUser);

    const payload: AuthPayloadDTO = {
      id: newId,
      email: parsedData.email,
      role: parsedData.role,
    };

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE ?? "1h";
    const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE ?? "24h";
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
    const refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET ?? "refreshToken";

    let accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: accessTokenLife,
    });

    let refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: refreshTokenLife,
    });

    let newToken: RefreshToken = {
      id: v7(),
      token: refreshToken,
      status: EModelStatus.ACTIVE,
      userId: newId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.refreshTokenRepository.create(newToken);

    const response: Auth = {
      accessToken,
      refreshToken,
    };

    return response;
  }

  async login(data: AuthLoginDTO): Promise<Auth | null> {
    let { success, data: parsedData, error } = AuthLoginSchema.safeParse(data);

    if (!success) {
      console.log(error);
      throw ErrDataInvalid;
    }

    const user = await this.userRepository.findByCond({
      email: parsedData?.email,
      role: parsedData?.role,
    });

    if (!user) {
      throw new Error("Email or password is not correct");
    }

    const isValidPassword = this.comparePassword.compare(
      parsedData!.password,
      user.password
    );

    if (!isValidPassword) {
      throw new Error("Email or password is not correct");
    }

    const payload: AuthPayloadDTO = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE ?? "1h";
    const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE ?? "24h";
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
    const refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET ?? "refreshToken";

    let accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: accessTokenLife,
    });
    let refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: refreshTokenLife,
    });

    let newToken: RefreshToken = {
      id: v7(),
      token: refreshToken,
      status: EModelStatus.ACTIVE,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.refreshTokenRepository.create(newToken);

    const response: Auth = {
      accessToken,
      refreshToken,
    };

    return response;
  }

  async refreshToken(data: AuthRefreshTokenDTO): Promise<Auth | null> {
    const {
      success,
      data: parsedData,
      error,
    } = AuthRefreshTokenSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    const token = parsedData.token;

    const tokenModel = await this.refreshTokenRepository.findByCond({ token });

    if (!tokenModel) {
      throw ErrDataNotFound;
    }

    const refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET ?? "refreshToken";

    let decoded = jwt.verify(
      tokenModel.token,
      refreshTokenSecret
    ) as JwtPayload;

    if (!decoded) {
      await this.refreshTokenRepository.delete(tokenModel.id, true);
      throw new Error("Token is expired");
    }

    const payload: AuthPayloadDTO = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE ?? "1h";
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "accessToken";

    let accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: accessTokenLife,
    });

    return {
      accessToken,
      refreshToken: token,
    };
  }
}
