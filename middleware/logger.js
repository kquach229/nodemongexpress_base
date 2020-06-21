// Custom middleware that logs request to console
const logger = (req,res,next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
     next();
 }
 
// Export the logger
module.exports = logger;