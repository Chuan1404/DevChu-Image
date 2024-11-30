import prisma from "../../configs/prisma";
import { EModelStatus } from "../enums";
import { IRepository } from "../interfaces/IRepository";
import { PagingDTO } from "../types";
import { convertQuery } from "../utils";

export class PrismaRepository<Entity, EntityCondDTO, EntityUpdateDTO>
  implements IRepository<Entity, EntityCondDTO, EntityUpdateDTO>
{
  constructor(private readonly modelName: string) {}

  async findByCond(cond: EntityCondDTO): Promise<Entity | null> {
    const data = await (prisma as any)[this.modelName].findFirst({
      where: cond,
    });

    if (!data) {
      return null;
    }

    return data as Entity;
  }

  async find(id: string): Promise<Entity | null> {
    const data = await (prisma as any)[this.modelName].findUnique({
      where: { id },
    });

    if (!data) {
      return null;
    }

    return data as Entity;
  }

  async findAll(cond: EntityCondDTO, paging?: PagingDTO): Promise<Entity[]> {
    const condWithStatus = {
      ...cond,
      status: { not: EModelStatus.DELETED },
    };

    const query = convertQuery(condWithStatus);
    const rows = await (prisma as any)[this.modelName].findMany({
      where: query,
      skip: paging ? (paging.page - 1) * paging.limit : undefined,
      take: paging ? paging.limit : undefined,
    });

    return rows as Entity[];
  }

  async create(data: Entity): Promise<boolean> {
    await (prisma as any)[this.modelName].create({
      data,
    });

    return true;
  }

  async update(id: string, data: EntityUpdateDTO): Promise<boolean> {
    await (prisma as any)[this.modelName].update({
      where: { id },
      data,
    });

    return true;
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    if (isHard) {
      await (prisma as any)[this.modelName].delete({
        where: { id },
      });
    } else {
      await (prisma as any)[this.modelName].update({
        where: { id },
        data: { status: EModelStatus.DELETED },
      });
    }

    return true;
  }
}
