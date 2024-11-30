import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  UploadedFileCondSchema,
  UploadedFileCreateDTO,
} from "../models/types/UploadedFile";
import { IUploadedFileService } from "../services/interfaces/IUploadedFileService";
import { PagingSchema } from "../share/types";

@injectable()
export class UploadedFileController {
  constructor(
    @inject("IUploadedFileService")
    private readonly service: IUploadedFileService
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
      let body: UploadedFileCreateDTO = {
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
    
    if (query.min || query.max) {
      query.price = {
        ...(query.min && { gte: Number(query.min) }),
        ...(query.max && { lte: Number(query.max) }),
      };
      delete query.min;
      delete query.max;
    }

    if(query.type) {
      query.fileType = query.type.split(',')
      delete query.type
    }

    // Query repository
    const cond = UploadedFileCondSchema.parse(query);
    const result = await this.service.findAll(cond, paging);

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
