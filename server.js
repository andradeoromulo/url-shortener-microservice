// Imports
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require("./routes/index");

// Environment variables
require('dotenv').config();

// Database connection
const uri = process.env.ATLAS_URI;
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

mongoose.connect(uri, connectionParams)
  .then(() =>
    console.log("Database successfully connected")
  )
  .catch((err) => 
    console.log(`Error connecting to the database:\n${err}`)  
  );

const connection = mongoose.connection;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors({optionsSuccessStatus: 200}));

app.use(bodyParser.urlencoded({
  extended: false
}));

// Static files
app.use(express.static(`${__dirname}/public`));

// Routing
app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.use('/api/shorturl', router);

// Server listening
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
