import { inject, injectable } from "tsyringe";
import { IMailService } from "./interfaces/IMailService";
import { SendMailOptions, Transporter } from "nodemailer";

@injectable()
export class MailService implements IMailService {
  constructor(
    @inject("Transporter") private readonly transporter: Transporter
  ) {}

  async sendMail(mailOptions: SendMailOptions): Promise<void> {
    try {
      // Send the email
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}
