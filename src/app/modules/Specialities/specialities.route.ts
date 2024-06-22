import express, { NextFunction, Request, Response } from "express";
import { specialtiesController } from "./specialities.controller";
import { fileUploader } from "../../../helpers/fileUploader";
import { SpecialtiesValidation } from "./specialties.validation";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
    '/',
    specialtiesController.getAllFromDB
);

router.post("/",
    // auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      console.log(req.body)
        req.body = SpecialtiesValidation.create.parse(JSON.parse(req.body.data))
        return specialtiesController.createSpecialties(req, res, next)
    }

);

router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    specialtiesController.deleteFromDB
);

    

export const SpecialtiesRoutes = router;
