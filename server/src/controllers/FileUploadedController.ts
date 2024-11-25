import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  FileUploadedCondSchema,
  FileUploadedCreateDTO,
} from "../models/types/FileUploaded";
import { IFileUploadedService } from "../services/interfaces/IFileUploadedService";
import { PagingSchema } from "../share/types";

@injectable()
export class FileUploadedController {
  constructor(
    @inject("IFileUploadedService")
    private readonly service: IFileUploadedService
  ) {}
  async checkFile(req: Request, res: Response) {
    try {
      let file = req.file;
      if (!file) {
        res.status(400).json({ error: "File is required" });
        return;
      }

      await this.service.checkBeforeCreate(file);
      res.status(200).json({ message: "Check file successfully" });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async upload(req: Request, res: Response) {
    try {
      let body: FileUploadedCreateDTO = {
        price: Number(req.body.price),
        title: req.body.title,
        userId: "123",
        file: req.file,
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

    // Validate query
    const query: any = { ...req.query };

    if (query.fromPrice || query.toPrice) {
      query.price = {
        ...(query.fromPrice && { $gte: Number(query.fromPrice) }),
        ...(query.toPrice && { $lte: Number(query.toPrice) }),
      };
      delete query.fromPrice;
      delete query.toPrice;
    }

    // Query repository
    const cond = FileUploadedCondSchema.parse(query);
    const result = await this.service.findAll(cond, paging);

    console.log(query)
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
