// Require the async handler to handle async call
const asyncHandler = require("../middleware/async");

// Require the User model
const User = require("../models/User");

//@desc   Register user
//@route  POST /api/v1/auth/register
//@access Public
exports.register = asyncHandler(async(req,res,next)=> {

    // Use object destructuring to pull out the values from req.body
   const { name, email, password, role } = req.body;

   // Create User
   const user = await User.create({
       name,
       email,
       password, 
       role
   });

   // Create token
   const token = user.getSignedJwtToken();
   res.status(200).json({
       success: true,
       token
   })
})