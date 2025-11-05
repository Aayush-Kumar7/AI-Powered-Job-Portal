const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url)
.then(() =>{
    console.log("Mongodb connnected");
}).catch((err) =>{
    console.log("Mongodb connection error",err);
})