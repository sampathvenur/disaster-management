const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Import route files
const reportRoutes = require('./routes/reports');
const resourceRoutes = require('./routes/resources');
const sosRoutes = require('./routes/sosRoutes');  // Ensure the correct path and file name

// Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/reports', reportRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/sos', sosRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Disaster Management API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
