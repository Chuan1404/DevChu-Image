import { container } from "tsyringe";
import { ICommentRepository } from "../../repositories/interfaces/ICommentRepository";
import { ICommentService } from "../../services/interfaces/ICommentService";
import { CommentRepository } from "../../repositories/CommentRepository";
import { CommentService } from "../../services/CommentService";
import { CommentController } from "../../controllers/CommentController";

export default function setupCommentDI() {
  container.register<ICommentRepository>("ICommentRepository", {
    useClass: CommentRepository,
  });
  container.register<ICommentService>("ICommentService", {
    useClass: CommentService,
  });
  container.register<CommentController>(CommentController, {
    useClass: CommentController,
  });
}
