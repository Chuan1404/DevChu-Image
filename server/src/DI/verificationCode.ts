import { container } from "tsyringe";
import { IVerificationCodeRepository } from "../repositories/interfaces/IVerificationCodeRepository";
import { VerificationCodeRepository } from "../repositories/VerificationCodeRepository";
import { IVerificationCodeService } from "../services/interfaces/IVertificationCodeService";
import { VerificationCodeService } from "../services/VertificationCodeService";

export default function setupVerificationCodeDI() {
  container.register<IVerificationCodeRepository>(
    "IVerificationCodeRepository",
    {
      useClass: VerificationCodeRepository,
    }
  );
  container.register<IVerificationCodeService>("IVerificationCodeService", {
    useClass: VerificationCodeService,
  });
}
