

// const getAdmin = catchAsync(async (req, res) => {
//   const filters = pick(req.query, adminFilterField);
//   const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

//   const result = await adminServices.getAllAdmin(filters, options);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Admin data fetched!",
//     data: result.data,
//     meta: result.meta,
//   });
// });
// const getSingleAdmin = catchAsync(async (req, res) => {
//   const result = await adminServices.getSingleAdmin(req.params.id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Admin data fetched!",
//     data: result,
//   });
// });

// const updateSingleAdmin = catchAsync(async (req, res) => {
//   const result = await adminServices.updateAdmin(req.params.id, req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Admin data updated!",
//     data: result,
//   });
// });

// const deleteSingleAdmin = catchAsync(async (req, res) => {
//   const result = await adminServices.deleteAdmin(req.params.id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Admin data deleted!",
//     data: result,
//   });
// });

// const softDeleteSingleAdmin = catchAsync(async (req, res) => {
//   const result = await adminServices.softDeleteAdmin(req.params.id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Admin data deleted!",
//     data: result,
//   });
// });

export const doctorController = {
  
};
