import mongoose from "mongoose";
const scheduleSchema = new mongoose.Schema({
    startingTime:{
        type: String,
        required: true
    },endingTime:{
        type: String,
    required: true
    },slots:{
        type: String,
    required: true
    },date:{
        type: String,
    required: true
    },
    docId:{
        type: String,
    // required: true
    },createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
});
scheduleSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
  });
  const ScheduleAppointment = mongoose.model('scheduleApointment',scheduleSchema)
  export default ScheduleAppointment