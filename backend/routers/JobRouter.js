const express = require("express");
const {Jobcreate,AllJob} = require("../controller/Jobcontroller");


const router = express.Router();

router.post("/newjob",Jobcreate);
router.get("/alljob",AllJob);

module.exports = router;