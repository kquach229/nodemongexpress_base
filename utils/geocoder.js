// Require the geocoder package
const nodeGeocoder = require("node-geocoder");

// Set the options
const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
}

// Create a const that holds the geocoding functionalities
const geocoder = nodeGeocoder(options);

// Export the geocoder
module.exports = geocoder;