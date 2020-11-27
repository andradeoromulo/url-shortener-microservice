// Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require("./routes/index");
const db = require("./database/database");
const dotenv = require("dotenv");

// Basic Configuration, Envirnment variables and db connection
dotenv.config();
db.connect();

const port = process.env.PORT || 3000;

const app = express();

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

// No matching route
app.use(function(req, res) {
  res.status(404).sendFile(`${__dirname}/views/404.html`);
});

// Server listening
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
