const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connection successfull"))
.catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());


app.listen(process.env.PORT, () => {
    console.log("Backend server is running")
})