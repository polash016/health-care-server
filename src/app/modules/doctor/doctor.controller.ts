import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DoctorService } from "./doctor.service";


const updateIntoDB = catchAsync(async (req, res) => {

    const { id } = req.params;
    const result = await DoctorService.updateIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Doctor data updated!",
        data: result
    })
});

export const doctorController = {
  updateIntoDB
};
