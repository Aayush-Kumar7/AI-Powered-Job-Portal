const mongoose = require( 'mongoose');

const applicationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
 
   
    status:{
        type:String,
        enum:['applied','interviewing','offered','rejected'],
        default:'applied'
    },
    appliedon:{
        type:Date,
        default:Date.now
    }
});


const ApplicationModel = mongoose.model('Application',applicationSchema);
module.exports = ApplicationModel;
