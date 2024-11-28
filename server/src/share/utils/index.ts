export const convertQuery = (rawQuery: { [key: string]: any }) => {
  const convertedQuery = Object.keys(rawQuery).reduce(
    (acc: { [string: string]: any }, key) => {
      if (Array.isArray(rawQuery[key])) {
        if (rawQuery[key].length > 0)
          acc[key] = {
            in: rawQuery[key],
          };
      } else {
        acc[key] = rawQuery[key];
      }
      return acc;
    },
    {}
  );
  return convertedQuery;
};
