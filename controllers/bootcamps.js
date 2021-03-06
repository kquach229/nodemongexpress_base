// Require the bootcamp model
const Bootcamp = require("../models/Bootcamp");

// Require the error response
const ErrorResponse = require("../utils/errorResponse");

// Require the async handler to implement async calls
const asyncHandler = require("../middleware/async");

// Require the geocoder
const geocoder = require("../utils/geocoder");

//@desc   Get all bootcamps
//@route  GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler(async (req,res,next) => {
    try {
       const bootcamps = await Bootcamp.find();
       
       res.status(200).json({
           success: true,
           count: bootcamps.length,
           data: bootcamps
       })
    } catch(err) {
      next(err)
    }
   
})

//@desc   Get single bootcamp
//@route  GET /api/v1/bootcamps
//@access Public
exports.getBootcamp = asyncHandler(async (req,res,next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch(err) {
       next(err)
    }
})

//@desc   Create new bootcamp
//@route  POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler(async (req,res,next) => {
    try {
        const bootcamp = await
        Bootcamp.create(req.body);
    
        res.status(201).json({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        next(err)
    }
   
})

//@desc   Update bootcamp
//@route  PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = asyncHandler(async (req,res,next) => {
    try {
        bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
    
        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }
    
        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch(err) {
        next(err)
    }
    
})


//@desc   Delete bootcamp
//@route  DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = asyncHandler(async (req,res,next) => {
   try {
       const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

       if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
       }

       res.status(200).json({
           success: true,
           data: bootcamp
       })
   } catch(err) {
    next(err)
   }
})


//@desc   Get bootcamps within a radius
//@route  GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
exports.getBootcampsInRadius = asyncHandler(async (req,res,next) => {
   const { zipcode, distance } = req.params;

   // Get lat and lng from geocoder
   const loc = await geocoder.geocode(zipcode);
   const lat = loc[0].latitude;
   const lng = loc[0].longitude;

   // Calc radius using radians
   // Divide distance by radius of earth
   // Radius of Earth = 3,963 mi / km = 6,378 km
   const radius = distance / 3963;
   const bootcamps = await Bootcamp.find({
       location: { $geoWithin: { $centerSphere:[[lng, lat],radius]}}
   })
   res.status(200).json({
       success: true,
       count: bootcamps.length,
       data: bootcamps
   })
 })
 