import { Request, Response } from "express";
import { IAuthService } from "../services/interfaces/IAuthService";
import { inject, injectable } from "tsyringe";

@injectable()
export default class AuthController {
  constructor(@inject("IAuthService") private readonly service: IAuthService) {}

  async register(req: Request, res: Response) {
    try {
      let response = await this.service.register(req.body);
      res.status(201).json({ data: response });
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

  async verifyUser(req: Request, res: Response) {
    try {
      let { code } = req.params;
      let validResult = await this.service.verifyUser(code);

      if (validResult) {
        res.status(201).json({ message: "Verify user success" });
      } else {
        res.status(201).json({ message: "Verify user fail" });
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
