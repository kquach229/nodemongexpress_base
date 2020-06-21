// Require mongoose
const mongoose = require("mongoose");

// Use async call to connect to the mongo database
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false ,
        useUnifiedTopology: true
    });
    console.log(`MongoDB connected ${conn.connection.host}`.cyan.underline.bold)
}

// Export the connectDB function
module.exports = connectDB;