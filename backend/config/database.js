
const mongoose = require("mongoose");

require("dotenv").config();

const connection = mongoose.connect(process.env.MONGODB_URI);

const PORT = process.env.PORT;

module.exports = { connection, PORT };