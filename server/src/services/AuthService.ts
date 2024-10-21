import jwt, { JwtPayload } from "jsonwebtoken";
import { SendMailOptions } from "nodemailer";
import { inject, injectable } from "tsyringe";
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
import { VerificationCode } from "../models/types/VerificationCode";
import { IRefreshTokenRepository } from "../repositories/interfaces/IRefreshTokenRepository";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { IVerificationCodeRepository } from "../repositories/interfaces/IVerificationCodeRepository";
import { IAuthService } from "../services/interfaces/IAuthService";
import { EAccountStatus, EModelStatus } from "../share/enums";
import {
  ErrAccountBanned,
  ErrDataExisted,
  ErrDataInvalid,
  ErrDataNotFound,
  ErrLoginFail,
  ErrUnVertifyAccount,
} from "../share/errors";
import { IComparePassword } from "../share/interfaces/IComparePassword";
import { IHashPassword } from "../share/interfaces/IHashPassword";
import { emailContent, emailTitle } from "../share/messages";
import { IMailService } from "./interfaces/IMailService";

@injectable()
export default class AuthService implements IAuthService {
  constructor(
    @inject("IUserRepository") private readonly userRepository: IUserRepository,
    @inject("IRefreshTokenRepository") private readonly refreshTokenRepository: IRefreshTokenRepository,
    @inject("IVerificationCodeRepository") private readonly verificationCodeRepository: IVerificationCodeRepository,
    @inject("IHashPassword") private readonly hashPassword: IHashPassword,
    @inject("IComparePassword") private readonly comparePassword: IComparePassword,
    @inject("IMailService") private readonly mailService: IMailService
  ) {}

  async register(data: AuthRegisterDTO): Promise<string> {
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

    // create verification code
    const verificationCodeValue = v7();
    let verificationModel: VerificationCode = {
      id: verificationCodeValue,
      userId: newId,
      value: verificationCodeValue,
      status: EModelStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.verificationCodeRepository.create(verificationModel);

    // send mail
    let mailOptions: SendMailOptions = {
      from: process.env.MAIL_USERNAME,
      to: parsedData.email,
      subject: emailTitle,
      html: emailContent
        .replace("[[name]]", parsedData.name)
        .replace(
          "[[URL]]",
          `${process.env.HOST}/auth/vertify?code=${verificationCodeValue}`
        ),
    };

    await this.mailService.sendMail(mailOptions);
    return newId;
  }

  async login(data: AuthLoginDTO): Promise<Auth | null> {
    let { success, data: parsedData, error } = AuthLoginSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    console.log(this.userRepository)
    const user = await this.userRepository.findByCond({
      email: parsedData?.email,
      role: parsedData?.role,
    });
    console.log(user)

    if (!user) {
      throw ErrLoginFail;
    }

    const isValidPassword = this.comparePassword.compare(
      parsedData!.password,
      user.password
    );

    if (!isValidPassword) {
      throw ErrLoginFail;
    }

    if (user.accountStatus === EAccountStatus.UNVERIFIED) {
      throw ErrUnVertifyAccount;
    }

    if (user.accountStatus === EAccountStatus.BANNED) {
      throw ErrAccountBanned;
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
