import express from "express";
import { container } from "tsyringe";
import { CommentController } from "../controllers/CommentController";

const setupCommentRouter = () => {
    
    const commentController = container.resolve(CommentController)
    const commentRouter = express.Router();
    
    commentRouter.get("/", commentController.findAll.bind(commentController));
    commentRouter.get("/:id", commentController.find.bind(commentController));
    commentRouter.post("/", commentController.create.bind(commentController));
    commentRouter.patch("/:id", commentController.update.bind(commentController));
    commentRouter.delete("/:id", commentController.delete.bind(commentController));

    
    return commentRouter
}


export default setupCommentRouter;
