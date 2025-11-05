const express = require('express');

const cors = require('cors');
const path = require('path');
require("dotenv").config(); 
require("./models/db")


 const UserRouter = require("./routers/UserRouter");
const JobRouter = require("./routers/JobRouter")
const adminRoutes = require("./routers/AdminRouter");
const applicationRoutes = require('./routers/ApplicationRouter');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.use("/user", UserRouter)
app.use("/job", JobRouter);
app.use("/admin", adminRoutes);
app.use('/applications', applicationRoutes);


app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});