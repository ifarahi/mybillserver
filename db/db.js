const mongoose = require("mongoose");
const uri = "mongodb+srv://chakour:chakour@mybill.apbt6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;

db.on("error", () => {
    console.log("error occurred from the database");
});
db.once("open", () => {
    console.log("successfully opened the database");
});

module.exports = mongoose;