const express = require('express');
const {
  postData,
  getData,
  getDataById,
  deleteData,
  editData,
} = require('../Controllers/GeoLocationController');

const router = express.Router();

router.get('/get', getData);
router.post('/post', postData);
router.patch('/update/:id', editData);
router.delete('/remove/:id', deleteData);
router.get('/view/:id', getDataById);

module.exports = router;
