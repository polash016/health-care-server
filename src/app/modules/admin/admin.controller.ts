import { NextFunction, Request, Response } from "express";
import { adminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterField } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, adminFilterField);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await adminServices.getAllAdmin(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data fetched!",
      data: result.data,
      meta: result.meta,
    });
  } catch (err: any) {
    next(err);
  }
};
const getSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await adminServices.getSingleAdmin(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data fetched!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const updateSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await adminServices.updateAdmin(req.params.id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data updated!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await adminServices.deleteAdmin(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data deleted!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const softDeleteSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await adminServices.softDeleteAdmin(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data deleted!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const adminController = {
  getAdmin,
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin,
  softDeleteSingleAdmin,
};
