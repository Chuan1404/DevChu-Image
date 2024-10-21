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
  setupUserDI();
  setupFileUploadedDI();
  setupCommentDI();
  setupRefreshTokenDI();
  setupTagDI();
  setupVerificationCodeDI();
  setupAuthDI();
};

export default setupDI;
