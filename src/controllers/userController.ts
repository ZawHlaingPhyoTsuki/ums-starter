import { Request, Response } from "express";
import { getUserService, createUserService } from "@/services/userService";

export async function getUserController(req: Request, res: Response) {
  try {
    const user = await getUserService(req.validatedQuery);
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function createUserController(req: Request, res: Response) {
  try {
    const user = await createUserService(req.validatedBody);
    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}
