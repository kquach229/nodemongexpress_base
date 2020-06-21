// Require the fs module that is included with node
const fs = require("fs");

// Require the mongoose package
const mongoose = require("mongoose");

// Require the colors package
const colors = require("colors");

// Require the dotenv package
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" })

// Load model
const Bootcamp = require("./models/Bootcamp");
const User = require("./models/User");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`,'utf-8'))

// Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await User.create(users)
        console.log("Data imported...".green.inverse);
        process.exit();
    } catch(err) {
        console.log(err)
    }
}


// Delete data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await User.deleteMany();
        console.log("Data destypyed...".red.inverse)
        process.exit()
    } catch(err) {
        console.log(err)
    }
}

// If node seeder is "-i" then import data, if "-d" then delete
if(process.argv[2]==="-i") {
    importData()
} else if(process.argv[2]==="-d") {
    deleteData()
}