const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const asyncHandler = require('express-async-handler');
const {
  useErrorResponse,
  useSuccessResponse,
} = require('../utilities/apiResponses/apiResponses');

// CRUD INTERNALNOTES
// POST User

const PostUser = asyncHandler(async (req, res) => {
  const { profile_Id, description, owner_Id } = req.body;
  try {
    const User = await prisma.internalNotes.findMany({
      where: {
        profile_Id,
        owner_Id,
      },
    });
    if (User.length > 0) {
      return useErrorResponse(res, 'User already exists', 400);
    }
    const internalnote = await prisma.internalNotes.create({
      data: {
        profile_Id,
        description,
        owner_Id,
      },
    });
    useSuccessResponse(res, 'User Created Successfully', internalnote, 201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET User

const GetUser = asyncHandler(async (req, res) => {
  try {
    const Users = await prisma.internalNotes.findMany();
    useSuccessResponse(res, 'User Getting Successfull', Users, 200);
  
  } catch (error) {
    useErrorResponse(res, 'User Getting Failed');
 
  }
});
// GetById
const GetUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const GetUserById = await prisma.internalNotes.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    useSuccessResponse(res, 'Notes Fetched Successfull', GetUserById, 200);
  
  } catch (error) {
    useErrorResponse(res, 'Notes Fetching Failed');
    
  }
});
// DELETE User

const DeleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params; // Use req.params to get the ID from the URL
  try {
    const deleteUser = await prisma.internalNotes.delete({
      where: {
        internalNotes_id: parseInt(id), // Use the correct field from your model
      },
    });
    useSuccessResponse(res, 'Note Delete Successfull');

  } catch (error) {
    useErrorResponse(res, 'Note Deleting Failed');
   
  }
});

// Edit User

const EditUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { profile_Id, description, owner_Id } = req.body;
  try {
    const EditUser = await prisma.internalNotes.update({
      where: { internalNotes_id: parseInt(id) },
      data: {
        profile_Id: profile_Id !== undefined ? parseInt(profile_Id) : undefined,
        description: description !== undefined ? description : undefined,
        owner_Id: owner_Id !== undefined ? parseInt(owner_Id) : undefined,
      },
    });
    useSuccessResponse(res, 'Note Edit Successfull', EditUser, 200);
 
  } catch (error) {
    useErrorResponse(res, 'Note Edit Failed', 500);
   
  }
});

module.exports = {
  DeleteUser,
  EditUser,
  GetUser,
  GetUserById,
  PostUser,
};
