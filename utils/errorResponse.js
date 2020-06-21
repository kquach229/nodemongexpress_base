// Create your own ErrorResponse class and extend it to the error class
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// Export the class
module.exports = ErrorResponse;