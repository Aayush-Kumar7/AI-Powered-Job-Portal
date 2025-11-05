const JobModel = require("../models/Job");



const Jobcreate = async(req,res)=>{
    const{title,company,description,skillsRequired,location, salary} = req.body;
    try{
 const newJob = new JobModel({title,company,description,skillsRequired,location, salary});

    await newJob.save();
    res.status(201).json({ msg: 'Job created successfully', job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error while creating job' });
  }
};

const AllJob = async(req, res) =>{
    try{
    const jobs = await JobModel.find();
   res.status(201).json({ msg: 'Job get successfully',jobs });
}catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ msg: "Server error while fetching jobs" });
  }
};


module.exports = {Jobcreate,AllJob};