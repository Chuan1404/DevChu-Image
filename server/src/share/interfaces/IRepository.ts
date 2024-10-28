import { PagingDTO } from "../types";

export interface IQueryRepository<Entity, EntityCondDTO> {
  find(id: string): Promise<Entity | null>;
  findByCond(cond: EntityCondDTO): Promise<Entity | null>;
  findAll(cond: EntityCondDTO, paging?: PagingDTO): Promise<Entity[]>;
}

export interface ICommandRepository<Entity, EntityUpdateDTO> {
  create(data: Entity): Promise<boolean>;
  update(id: string, data: EntityUpdateDTO): Promise<boolean>;
  delete(id: string, isHard: boolean): Promise<boolean>;
}

export interface IRepository<Entity, EntityCondDTO, EntityUpdateDTO>
  extends IQueryRepository<Entity, EntityCondDTO>,
    ICommandRepository<Entity, EntityUpdateDTO> {}
