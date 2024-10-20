import { Request, Response } from "express";
import { IAuthService } from "../services/interfaces/IAuthService";

export default class AuthController {
  constructor(private readonly service: IAuthService) {}

  async register(req: Request, res: Response) {
    try {
      const result = await this.service.register(req.body);
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await this.service.login(req.body);
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const result = await this.service.refreshToken(req.body);
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
