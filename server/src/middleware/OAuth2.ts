import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthPayloadSchema } from "../models/types/Auth";
import { EUserRole } from "../share/enums";
import { ErrUnAuthentication } from "../share/errors";

export function authToken(req: Request, res: Response, next: NextFunction) {
  let accessToken: string = process.env.ACCESS_TOKEN_SECRET || "accessToken";

  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    res.status(401).json({
      error: "Unauthorize",
    });
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, accessToken, (err, data) => {
    if (err) {
      res.status(401).json({
        error: ErrUnAuthentication.message,
      });
      return;
    }
    const { success, data: parsedData } = AuthPayloadSchema.safeParse(data);

    if (!success) {
      res.status(401).json({
        error: ErrUnAuthentication.message,
      });
      return;
    }

    req.userId = parsedData.id;
    req.userRole = parsedData.role;
    next();
  });
}

export function authorizeUser(acceptRoles: EUserRole[] = []) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.userRole) {
      res.status(403).json({
        error: "You dont have permission to access this",
      });
      return;
    }

    if (
      req.userRole === EUserRole.ROLE_ADMIN ||
      acceptRoles.includes(req.userRole)
    ) {
      next();
      return;
    }
    res.status(403).json({
      error: "You dont have permission to access this",
    });
  };
}
