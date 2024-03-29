import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import config from "../../config";

const createAdmin = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(
    data.password,
    Number(config.salt_rounds)
  );
  console.log(hashedPassword);
  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transClient) => {
    await transClient.user.create({
      data: userData,
    });

    const createAdminData = await transClient.admin.create({
      data: data.admin,
    });
    return createAdminData;
  });
  return result;
};

export const userService = {
  createAdmin,
};
