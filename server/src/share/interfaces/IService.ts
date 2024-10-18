import { PagingDTO } from "../types";

export interface IQueryService<Entity, EntityCondDTO> {
  find(id: string): Promise<Entity>;
  findAll(cond: EntityCondDTO, paging: PagingDTO): Promise<Entity[]>;
}

export interface ICommandService<EntityCreateDTO, EntityUpdateDTO> {
  create(data: EntityCreateDTO): Promise<string>;
  update(id: string, data: EntityUpdateDTO): Promise<boolean>;
  delete(id: string, isHard?: boolean): Promise<boolean>;
}

export interface IService<Entity, EntityCondDTO, EntityCreateDTO, EntityUpdateDTO>
  extends IQueryService<Entity, EntityCondDTO>,
    ICommandService<EntityCreateDTO, EntityUpdateDTO> {}
