import { z } from "zod";

const updateDoctor = z.object({
  body: z.object({
    
  }),
});


export const DoctorValidation = {
  updateDoctor,
};
