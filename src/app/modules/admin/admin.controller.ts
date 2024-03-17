import { Request, Response } from "express";
import { adminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterField } from "./admin.constant";

const getAdmin = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterField);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await adminServices.getAllAdmin(filters, options);
    res.status(200).json({
      success: true,
      message: "Admin data fetched!",
      data: result,
    });
  } catch (err: any) {
    res.status(200).json({
      success: false,
      message: err?.name || "Error",
      error: err,
    });
  }
};

export const adminController = {
  getAdmin,
};
