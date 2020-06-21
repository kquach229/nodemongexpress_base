// Initialize asynchandler
const asyncHandler = fn => (req,res,next)=> {
    Promise 
        .resolve(fn(req,res,next))
        .catch(next)
}

// Export async handler
module.exports= asyncHandler;