const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const GeoLocationRoute = require('./Routes/GeoLocationRoute');
const InternalNotesRoute = require('./Routes/InternalNotesRoute');
const app = express();
const asyncHandler = require('express-async-handler');

require('dotenv').config();
const Employee = {};
app.use(express.json());

app.use('/api/geolocation', GeoLocationRoute);
app.use('api/internalnotes', InternalNotesRoute);

// Listen
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
