import { Prisma,  UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../../config";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpers/fileUploader";
import { TPaginationOptions } from "../../interfaces/pagination";
import calculatePagination from "../../../helpers/paginationHelper";
import { userSearchableField } from "./user.const";

const createAdmin = async (req:any) => {

  const file = req.file;
  const data = req.body;

  if(file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);

    data.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }


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

const createDoctor = async (req:any) => {

  const file = req.file;
  const data = req.body;

  if(file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);

    data.doctor.profilePhoto = uploadToCloudinary?.secure_url;
  }


  const hashedPassword: string = await bcrypt.hash(
    data.password,
    Number(config.salt_rounds)
  );
  console.log(hashedPassword);
  const userData = {
    email: data.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transClient) => {
    await transClient.user.create({
      data: userData,
    });

    const createDoctorData = await transClient.admin.create({
      data: data.doctor,
    });
    return createDoctorData;
  });
  return result;
};

const createPatient = async (req:any) => {

  const file = req.file;
  const data = req.body;

  if(file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);

    data.patient.profilePhoto = uploadToCloudinary?.secure_url;
  }


  const hashedPassword: string = await bcrypt.hash(
    data.password,
    Number(config.salt_rounds)
  );
  console.log(hashedPassword);
  const userData = {
    email: data.patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async (transClient) => {
    await transClient.user.create({
      data: userData,
    });

    const createPatientData = await transClient.admin.create({
      data: data.patient,
    });
    return createPatientData;
  });
  return result;
};

const getAllUsers = async (
  params: any,
  options: TPaginationOptions
) => {
  const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);
  const andConditions: Prisma.UserWhereInput[] = [];

  const { searchTerm, ...filterData } = params;

  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchableField.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  

  const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? { AND: andConditions }: { };
  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
          select: {
            id: true,
            email: true,
            role: true,
            needPasswordChange: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            admin: true,
            patient: true,
            doctor: true
          }

          // {
          //   admin: true,
          //   patient: true,
          //   doctor: true
          // }
  });

  const total = await prisma.user.count({ where: whereConditions });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};


export const userService = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUsers
};
