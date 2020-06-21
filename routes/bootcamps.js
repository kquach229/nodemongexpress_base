// Require the express package
const express = require("express");

// Bring in the controllers
const { getBootcamp, 
        getBootcamps, 
        createBootcamp, 
        updateBootcamp, 
        deleteBootcamp ,
        getBootcampsInRadius
    } = require("../controllers/bootcamps");

// Initialize the express router
const router = express.Router();

// Route for getting bootcamps within the radius
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

// Route to GET and POST bootcamps
router.route('/')
    .get(getBootcamps)
    .post(createBootcamp)

// Route to GET,UPDATE, and DELETE specific bootcamps
router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp)

// Export the router
module.exports = router;