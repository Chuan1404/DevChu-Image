import { Request, Response } from "express";
import { ITagService } from "../services/interfaces/ITagService";
import { TagCondSchema } from "../models/types/Tag";
import { PagingSchema } from "../share/types";
import { inject, injectable } from "tsyringe";

@injectable()
export class TagController {
  constructor(@inject("ITagService") private readonly service: ITagService) {}

  async create(req: Request, res: Response) {
    try {
      const result = await this.service.create(req.body);
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

    let cond = TagCondSchema.parse(req.query);
    let result = await this.service.findAll(cond, paging);

    res.status(200).json({
      data: result,
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
