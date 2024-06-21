import express from "express";

const router = express.Router();

// router.get(
//   "/",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   adminController.getAdmin
// );

// router.get(
//   "/:id",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   adminController.getSingleAdmin
// );

// router.patch(
//   "/:id",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   validateRequest(AdminValidation.updateAdmin),
//   adminController.updateSingleAdmin
// );

// router.delete(
//   "/soft/:id",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   adminController.softDeleteSingleAdmin
// );

export const DoctorRoutes = router;
