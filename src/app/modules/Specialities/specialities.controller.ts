import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { specialtiesServices } from "./specialities.service";


const createSpecialties = catchAsync(async (req, res) => {
  const result = await specialtiesServices.createSpecialties(req);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
    const result = await specialtiesServices.getAllFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Specialties data fetched successfully',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await specialtiesServices.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Specialty deleted successfully',
        data: result,
    });
});



export const specialtiesController = {
  createSpecialties,
  getAllFromDB,
  deleteFromDB
};