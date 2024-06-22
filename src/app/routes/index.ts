import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { SpecialtiesRoutes } from "../modules/Specialities/specialities.route";
import { DoctorRoutes } from "../modules/doctor/doctor.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialties",
    route: SpecialtiesRoutes
  },
  {
    path: "/doctor",
    route: DoctorRoutes
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
