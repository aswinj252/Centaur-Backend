import mongoose from "mongoose";
const SplitSchema = new mongoose.Schema({
    date:{
        type: String,
    required: true
    },
    time:{
        type: String,
    required: true
    },
    booked:{
        type: String,
    required: true
    },
    docId:{
        type: String,
       required: true
    },
    Id:{
        type: String,
       required: true
    },createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
});
SplitSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
  });
  const ScheduleTime = mongoose.model('ScheduleTime',SplitSchema)
  export default ScheduleTime