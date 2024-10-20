// Import the required modules
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

// Set up the employee routes
app.use('/employees', require('./api/employees'));

// 404 error handling middleware
app.use((req, res, next) => {
  next({ status: 404, message: 'Endpoint not found.' }); // Pass a 404 error to the next middleware
});

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error
  res.status(err.status ?? 500); // Set the response status code
  res.json(err.message ?? 'Sorry, something broke :('); // Respond with error message
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`); // Log the server's status
});
