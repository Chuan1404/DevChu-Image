import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CommentCondSchema, CommentCreateDTO } from "../models/types/Comment";
import { ICommentService } from "../services/interfaces/ICommentService";
import { PagingSchema } from "../share/types";

@injectable()
export class CommentController {
  constructor(
    @inject("ICommentService") private readonly service: ICommentService,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const body: CommentCreateDTO = {
        content: req.body.content,
        fileId: req.body.fileId,
        userId: req.userId!,
      };
      const result = await this.service.create(body);
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async find(req: Request, res: Response) {
    const { id } = req.params;
    try {
      let data = await this.service.find(id);

      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.service.update(id, req.body);
      res.status(200).json({
        data: id,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async findAll(req: Request, res: Response) {
    const { success, data: paging, error } = PagingSchema.safeParse(req.query);

    if (!success) {
      res.status(400).json({
        error: error.message,
      });
      return;
    }

    let cond = CommentCondSchema.parse(req.query);
    let comments = await this.service.findAll(cond, paging);

    res.status(200).json({
      data: comments,
      paging,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.service.delete(id);
      res.status(200).json({
        data: id,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
