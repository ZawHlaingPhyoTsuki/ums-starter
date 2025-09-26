import prisma from "@/lib/prismaClient";
import { CreateUserType, GetUserQueryType } from "@/validations/userSchema";

export async function getUserService(data: GetUserQueryType) {
  return await prisma.user.findUnique({
    where: {
      id: data.userId,
    },
  });
}

export async function createUserService(data: CreateUserType) {
  return await prisma.user.create({
    data,
  });
}
