const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const asyncHandler = require('express-async-handler');
const {
  useErrorResponse,
  useSuccessResponse,
} = require('../utilities/apiResponses/apiResponses');
// CRUD GEOLOCATION
// Post

const postData = asyncHandler(async (req, res) => {
  const { city, streetName, country, pointLocations } = req.body;
  pointLocations.time = new Date();
  try {
    const existingGeoLocation = await prisma.geoLocation.findMany({
      where: {
        city,
        streetName,
        country,
      },
    });

    if (existingGeoLocation.length > 0) {
      return useErrorResponse(res, `geolocation not found`, 404);
    }
    const geoLocation = await prisma.geoLocation.create({
      data: {
        city,
        streetName,
        country,
        pointLocation: {
          create: pointLocations,
        },
      },
    });
    return useSuccessResponse(res, 'geolocation Created', geoLocation, 201);
  } catch (error) {
    console.error(error);
    useErrorResponse(res, 'Something went wrong', 500);
  }
});

// GET
const getData = asyncHandler(async (req, res) => {
  try {
    const geoLocations = await prisma.geoLocation.findMany({
      include: {
        pointLocation: true,
      },
    });
    useSuccessResponse(res, 'Data Get Successfully', geoLocations, 200);
  } catch (error) {
    console.error(error);
    useErrorResponse(res, 'Something went wrong', 500);
  }
});
// GETBYID
const getDataById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getById = await prisma.geoLocation.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    useSuccessResponse(res, 'getById Successfull', getById, 200);
  } catch (error) {
    console.error(error);
    useErrorResponse(res, 'Something went wrong', 500);
  }
});
// Delete
const deleteData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const Delete = await prisma.geoLocation.delete({
      where: { id: parseInt(id) },
    });
    useSuccessResponse(res, 'Data Deleted Successfully', Delete, 200);
  } catch (error) {
    console.error(error);
    useErrorResponse(res, 'Something went wrong', 500);
  }
});

// Edit

const editData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { city, streetName, country, pointLocations } = req.body;

  try {
    const updatedGeoLocation = await prisma.geoLocation.update({
      where: { id: parseInt(id) },
      data: {
        city: city !== undefined ? city : undefined,
        streetName: streetName !== undefined ? streetName : undefined,
        country: country !== undefined ? country : undefined,
        pointLocation: {
          deleteMany: {},
          create: pointLocations,
        },
      },
    });
    useSuccessResponse(
      res,
      'Data Updated Successfull',
      updatedGeoLocation,
      200
    );
  } catch (error) {
    console.error(error);
    useErrorResponse(res, 'Something went wrong', 500);
  }
});

//  '/api/geolocation/edit/:id',
module.exports = {
  postData,
  getData,
  getDataById,
  deleteData,
  editData,
};
