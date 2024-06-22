// {specialtiesId: string, icon: string}

import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import prisma from "../../../shared/prisma";
import { Specialties } from "@prisma/client";

const createSpecialties = async (req: Request ) => {
    const file = req.file;
    const data = req.body;
  
    if(file) {
      const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
  
      data.icon = uploadToCloudinary?.secure_url;
    }

    const result = await prisma.specialties.create({
        data 
    })
};

const getAllFromDB = async (): Promise<Specialties[]> => {
    return await prisma.specialties.findMany();
}

const deleteFromDB = async (id: string): Promise<Specialties> => {
    const result = await prisma.specialties.delete({
        where: {
            id,
        },
    });
    return result;
};


export const specialtiesServices = {
  createSpecialties,
  getAllFromDB,
  deleteFromDB
};
