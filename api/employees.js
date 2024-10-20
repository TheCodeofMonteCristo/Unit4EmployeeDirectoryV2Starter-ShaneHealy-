// Import the required modules
const express = require('express');
const router = express.Router(); // Create a new router instance
const employees = require("../data/employees"); // Import employee data

// Route to get all employees
router.get("/", (req, res) => {
  res.json(employees); // Return the list of employees as JSON
});

// Route to get a random employee
router.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length); // Generate a random index
  res.json(employees[i]); // Return a random employee
});

// Route to get an employee by ID
router.get("/:id", (req, res, next) => {
  const { id } = req.params; // Extract the ID from the URL parameters
  const employee = employees.find((e) => e.id === +id); // Find the employee by ID
  if (employee) {
    res.json(employee); // Return the employee if found
  } else {
    next({ status: 404, message: `There is no employee with id ${id}.` }); // Pass error to the next middleware
  }
});

// Route to add a new employee
router.post("/", (req, res, next) => {
  const { name } = req.body; // Extract the name from the request body
  if (name) {
    const id = generateUniqueId(); // Generate a unique ID for the new employee
    const employee = { id, name }; // Create a new employee object
    employees.push(employee); // Add the new employee to the list
    res.status(201).json(employee); // Respond with the newly created employee
  } else {
    next({ status: 400, message: 'New employee entry must have a name provided.' }); // Pass error to the next middleware
  }
});

// Helper function to generate a unique ID
const generateUniqueId = () => {
  const existingIds = employees.map(emp => emp.id); // Get existing IDs
  let newId = 1; // Start with ID 1
  while (existingIds.includes(newId)) {
    newId++; // Increment ID until a unique one is found
  }
  return newId; // Return the unique ID
};

module.exports = router; // Export the router
