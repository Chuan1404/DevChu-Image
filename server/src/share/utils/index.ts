import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";

export const convertQuery = (rawQuery: { [key: string]: any }) => {
  const convertedQuery = Object.keys(rawQuery).reduce(
    (acc: { [string: string]: any }, key) => {
      // array
      if (Array.isArray(rawQuery[key])) {
        if (rawQuery[key].length > 0)
          acc[key] = {
            in: rawQuery[key],
          };
      }
      // others
      else {
        acc[key] = rawQuery[key];
      }
      return acc;
    },
    {}
  );
  return convertedQuery;
};

export const queryByTextIndex = async (
  prisma: PrismaClient,
  model: string,
  keyword: string
) => {
  const databaseType = process.env.DATABASE_TYPE || "mongodb";
  let result = [];

  if (databaseType === "mongodb") {
    const q = {
      aggregate: model,
      pipeline: [
        {
          $match: {
            $text: { $search: keyword },
          },
        },
        {
          $project: {
            _id: 1,
          },
        },
      ],
      cursor: {},
    };

    const res = await prisma.$runCommandRaw(q);
    if (Array.isArray((res.cursor as JsonObject)?.firstBatch)) {
      const arr: [] = (res.cursor as JsonObject).firstBatch as [];
      result = arr.map((item: any) => item._id);
    }
  }
  return result;
};
