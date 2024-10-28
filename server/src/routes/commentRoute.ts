import express from "express";
import { container } from "tsyringe";
import { CommentController } from "../controllers/CommentController";
import { authToken } from "../middleware/OAuth2";

const setupCommentRouter = () => {
    
    const commentController = container.resolve(CommentController)
    const commentRouter = express.Router();
    
    commentRouter.get("/:id", commentController.find.bind(commentController));
    commentRouter.get("/", commentController.findAll.bind(commentController));
    commentRouter.post("/", authToken, commentController.create.bind(commentController));
    commentRouter.patch("/:id", authToken, commentController.update.bind(commentController));
    commentRouter.delete("/:id", authToken, commentController.delete.bind(commentController));

    return commentRouter
}


export default setupCommentRouter;
