//folder: config
//filename: dbConnection.js
const mongoose = require("mongoose");

// Connects to the MongoDB database using Mongoose.
const connectDb = async () => {
    try {
        const connect = await
            mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "Connected to Databse",
            connect.connection.host,
            connect.connection.name
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
module.exports = connectDb;