import mongoose from "mongoose";
import { EModelStatus } from "../enums";
import { IRepository } from "../interfaces/IRepository";
import { PagingDTO } from "../types";

export class MongoRepository<Entity, EntityCondDTO, EntityUpdateDTO>
  implements IRepository<Entity, EntityCondDTO, EntityUpdateDTO>
{
  constructor(private readonly modelName: string) {}

  async findByCond(cond: EntityCondDTO): Promise<Entity | null> {
    let data = await mongoose.models[this.modelName].findOne(cond as any);

    if (!data) {
      return null;
    }

    return data;
  }

  async find(id: string): Promise<Entity | null> {
    let data = await mongoose.models[this.modelName].findOne({ id });

    if (!data) {
      return null;
    }

    return data;
  }

  async findAll(cond: EntityCondDTO, paging: PagingDTO): Promise<Entity[]> {
    const { page, limit } = paging;
    const condSQL = { ...cond, status: { $ne: EModelStatus.DELETED } };

    const rows = await mongoose.models[this.modelName]
      .find(condSQL)
      .limit(limit)
      .skip((page - 1) * limit);

    return rows;
  }

  async create(data: Entity): Promise<boolean> {
    await mongoose.models[this.modelName].create(data as any);

    return true;
  }

  async update(id: string, data: EntityUpdateDTO): Promise<boolean> {
    await mongoose.models[this.modelName].updateOne({ id }, data as any);
    return true;
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    if (isHard) {
      await mongoose.models[this.modelName].deleteOne({ id });
    } else {
      await mongoose.models[this.modelName].updateOne(
        { id },
        { status: EModelStatus.DELETED }
      );
    }

    return true;
  }
}
