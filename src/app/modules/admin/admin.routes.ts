import express from "express";
import { adminController } from "./admin.controller";

const router = express.Router();

router.get("/", adminController.getAdmin);
router.get("/:id", adminController.getSingleAdmin);
router.patch("/:id", adminController.updateSingleAdmin);
router.delete("/soft/:id", adminController.softDeleteSingleAdmin);

export const AdminRoutes = router;
