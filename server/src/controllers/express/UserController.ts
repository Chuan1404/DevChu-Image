import { Request, Response } from "express";
import { IUserService } from "../../services/interfaces/IUserService";
import { UserCondSchema } from "../../models/types/User";
import { PagingSchema } from "../../share/types";

export class UserController {
  constructor(private readonly service: IUserService) {}

  async create(req: Request, res: Response) {
    try {
      const result = await this.service.create(req.body);
      res.status(201).json({ data: result });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async find(req: Request, res: Response) {
    const { id } = req.params;
    try {
      let User = await this.service.find(id);

      res.status(200).json({
        data: User,
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

    let cond = UserCondSchema.parse(req.query);
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
