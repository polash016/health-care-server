import prisma from "../../../shared/prisma";

const updateIntoDB = async (id: string, payload: any) => {
  const { specialties, ...doctorData } = payload;

  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.$transaction(async (transClient) => {
    await transClient.doctor.update({
      where: {
        id,
      },
      data: doctorData,
    });

    if (specialties && specialties.length > 0) {
      const deleteSpecialtiesIds = specialties.filter(
        (specialty) => specialty.isDeleted
      );
      for (const specialty of deleteSpecialtiesIds) {
        await transClient.doctorSpecialties.deleteMany({
          where: {
            doctorId: doctorInfo.id,
            specialtiesId: specialty.specialtiesId,
          },
        });

        const createSpecialtiesIds = specialties.filter(
          (specialty) => specialty.isDeleted
        );

        for (const specialty of createSpecialtiesIds) {
          await transClient.doctorSpecialties.create({
            data: {
              doctorId: doctorInfo.id,
              specialtiesId: specialty.specialtiesId,
            },
          });
        }
      }
    }
  });
  const result = await prisma.doctor.findUnique({
    where: {
      id: doctorInfo.id,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
    },
  });

  return result;
};

export const DoctorService = {
  updateIntoDB,
};
