import mongoose from "mongoose";
import { EModelStatus } from "../enums";
import { PagingDTO } from "../types";
import {
  IRepository
} from "../interfaces/IRepository";

export class MongoRepository<Entity, EntityCondDTO, EntityUpdateDTO>
  implements IRepository<Entity, EntityCondDTO, EntityUpdateDTO>
{
  constructor(private readonly modelName: string) {}
  async find(id: string): Promise<Entity | null> {
    let data = await mongoose.models[this.modelName].findOne({ id });
    console.log({data})
    if (!data) {
      return null;
    }

    return data;
  }

  async findAll(cond: EntityCondDTO, paging: PagingDTO): Promise<Entity[]> {
    const { page, limit } = paging;
    const condSQL = { ...cond, status: { $eq: EModelStatus.ACTIVE } };

    let data = await mongoose.models[this.modelName]
      .find(condSQL)
      .limit(limit)
      .skip((page - 1) * limit);

    return data;
  }

  async create(data: Entity): Promise<boolean> {
    await mongoose.models[this.modelName].create(data as any);

    return true;
  }

  async update(id: string, data: EntityUpdateDTO): Promise<boolean> {
    await mongoose.models[this.modelName].updateOne({ id }, data as any);
    return true;
  }
  
  async delete(id: string, isHard: boolean): Promise<boolean> {
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
