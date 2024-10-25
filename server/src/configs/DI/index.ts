import { Transporter } from "nodemailer";
import "reflect-metadata";
import { container } from "tsyringe";
import { mailTransporter } from "../transporter";
import { IMailService } from "../../services/interfaces/IMailService";
import { MailService } from "../../services/MailService";
import { ComparePassword, HashPassword } from "../../share/components/password";
import { IComparePassword } from "../../share/interfaces/IComparePassword";
import { IHashPassword } from "../../share/interfaces/IHashPassword";
import setupAuthDI from "./authDI";
import setupCommentDI from "./commentDI";
import setupFileUploadedDI from "./fileUploadedDI";
import setupRefreshTokenDI from "./refreshTokenDI";
import setupTagDI from "./tagDI";
import setupUserDI from "./userDI";
import setupVerificationCodeDI from "./verificationCode";
import { IImageHandler } from "../../share/interfaces/IImageHandler";
import ImageHandler from "../../share/components/ImageHandler";
import IUploader from "../../share/interfaces/IUploader";
import AWS from "../AWS";

const setupDI = () => {
  container.register<IHashPassword>("IHashPassword", {
    useClass: HashPassword,
  });
  container.register<IComparePassword>("IComparePassword", {
    useClass: ComparePassword,
  });
  container.register<IMailService>("IMailService", {
    useClass: MailService,
  });
  container.register<Transporter>("Transporter", {
    useValue: mailTransporter,
  });
  container.register<IImageHandler>("IImageHandler", {
    useClass: ImageHandler,
  });
  container.register<IUploader>("IUploader", {
    useClass: AWS,
  });
  setupUserDI();
  setupFileUploadedDI();
  setupCommentDI();
  setupRefreshTokenDI();
  setupTagDI();
  setupVerificationCodeDI();
  setupAuthDI();
};

export default setupDI;
