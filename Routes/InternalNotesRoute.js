const express = require('express');
const {
  DeleteUser,
  EditUser,
  GetUser,
  GetUserById,
  PostUser,
} = require('../Controllers/InternalNotesController');

const router = express.Router();

router.get('/get', GetUser);
router.post('/post', PostUser);
router.patch('/update/:id', EditUser);
router.delete('/remove/:id', DeleteUser);
router.get('/view/:id', GetUserById);

module.exports = router;
