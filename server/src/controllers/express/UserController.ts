import { Request, Response } from "express";
import { IUserService } from "../../services/interfaces/IUserService";
import { UserCondDTO } from "../../models/types/User";

export class UserController {
  constructor(private readonly service: IUserService) {}

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

  async findAll(req: Request, res: Response) {
    let cond: UserCondDTO = req.body as UserCondDTO
    // let result = await this.useCase.list(cond, paging);
    console.log(cond)

    res.status(200).json({
      // data: result,
      // paging,
    });
  }
}
