import { EModelStatus } from "@prisma/client";
import { injectable } from "tsyringe";
import prisma from "../configs/prisma";
import { modelName } from "../models/interfaces/IUploadedFile";
import {
  UploadedFile,
  UploadedFileCondDTO,
  UploadedFileUpdateDTO,
} from "../models/types/UploadedFile";
import { PrismaRepository } from "../share/components/PrismaRepository";
import { PagingDTO } from "../share/types";
import { convertQuery, queryByTextIndex } from "../share/utils";

@injectable()
export class UploadedFileRepository extends PrismaRepository<
  UploadedFile,
  UploadedFileCondDTO,
  UploadedFileUpdateDTO
> {
  constructor() {
    super(modelName);
  }

  async findAll(
    cond: UploadedFileCondDTO,
    paging?: PagingDTO
  ): Promise<UploadedFile[]> {
    const condWithStatus = {
      ...cond,
      status: { not: EModelStatus.DELETED },
    };

    let query = convertQuery(condWithStatus);
    let ids = [];

    if (query.title) {
      ids = await queryByTextIndex(prisma, "uploaded_files", query.title);
    }
    delete query.title;

    if (ids.length > 0)
      query = {
        ...query,
        id: { in: ids },
      };

    const rows = await prisma.uploadedFile.findMany({
      where: {
        ...query,
      },
      skip: paging ? (paging.page - 1) * paging.limit : undefined,
      take: paging ? paging.limit : undefined,
    });

    return rows as UploadedFile[];
  }

  async search(kw: string, paging: PagingDTO): Promise<string[]> {
    const rows = await prisma.uploadedFile.findMany({
      where: {
        title: {
          startsWith: kw,
        },
      },
      skip: paging ? (paging.page - 1) * paging.limit : undefined,
      take: paging ? paging.limit : undefined,
    });

    return rows.map((item) => item.title as string);
  }
}
