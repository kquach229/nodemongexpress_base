// Require the express package
const express = require("express");

// Import in the register controller
const { register } = require("../controllers/auth");

// Initialize the express router
const router = express.Router();

// Set the url for posting a user
router.post("/register", register);

// Export the router
module.exports = router;

