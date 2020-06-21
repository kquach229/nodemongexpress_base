// Require the mongoose library
const mongoose = require("mongoose");

// Requiret the slugify package
const slugify = require("slugify");

// Require the geocoder package
const geocoder = require("../utils/geocoder");

// Define the bootcamp schema
const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
        trim: true,
        maxLength: [50, "Name cannot be more than 50 characters"]
    },
    slug: String,
    description: {
        type: String,
        required: [true, "Please add a description"]
    },
    website: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            "Please use a valid URL with HTTP or HTTPS"
        ]
    },
    phone: {
        type: String,
        maxlength: [20, "Phone number cannot be  longer than 20  characters"]
    },
    email: {
        type: String,
        match: [
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            "Please add a valid email"
        ]
    },
    address: {
        type: String,
        required: [true, "Please add an address"]
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: false
          },
          coordinates: {
            type: [Number],
            required: false,
            index: "2dsphere"
          },
          formattedAddress: String,
          street: String,
          city: String,
          state: String,
          zipcode: String,
          country: String
    },
    careers: {
        type: [String],
        required:  true,
        enum: [
            "Web Development",
            "Mobile Development",
            "UI/UX",
            "Data Science",
            "Business",
            "Other"
        ]
    },
    averageRating: {
        type:  Number,
        min: [1, "Rating must be at least 1"],
        max: [10, "Rating cannot be more than 10"]
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create bootcamp slug from name
BootcampSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true})
    next()
});


// Geocode and create location field
BootcampSchema.pre("save", async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: "Point",
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
    }
    // Do not save address in DB
    this.address = undefined;
    next()
})

// Export the schema
module.exports = mongoose.model("Bootcamp", BootcampSchema);