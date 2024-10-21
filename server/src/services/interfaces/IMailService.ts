import { SendMailOptions } from "nodemailer";

export interface IMailService {
    sendMail(options: SendMailOptions): Promise<void>
}