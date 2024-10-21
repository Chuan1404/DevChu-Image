// import { container } from "tsyringe";
// import { IReceiptRepository } from "../repositories/interfaces/IReceiptRepository";
// import { IReceiptService } from "../services/interfaces/IReceiptService";
// import { ReceiptRepository } from "../repositories/ReceiptRepository";
// import { ReceiptService } from "../services/ReceiptService";
// import { ReceiptController } from "../controllers/ReceiptController";

// export default function setupReceiptDI() {
//     container.register<IReceiptRepository>("IReceiptRepository", {
//         useClass: ReceiptRepository,
//       });
//       container.register<IReceiptService>("IReceiptService", {
//         useClass: ReceiptService,
//       });
//       container.register<ReceiptController>('ReceiptController', {
//         useClass: ReceiptController,
//       });
// }