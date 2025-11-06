const mongoose = require( 'mongoose');

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',           // ✅ Add reference to User model
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',            // ✅ Add reference to Job model
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
