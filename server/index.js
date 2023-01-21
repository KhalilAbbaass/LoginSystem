const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/Auth");
const adminRoute = require("./routes/Admin");


dotenv.config();
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connection successfull"))
.catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoute);


app.listen(process.env.PORT, () => {
    console.log("Backend server is running")
})