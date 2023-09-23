import mongoose from "mongoose";
const bookingScheme = new mongoose.Schema({
    docId:{
        type:String,
        required:true
    },
    patientId:{
        type:String,
        required:true
    },
    timeId :{
        type:String,
        required:true
    },
    booked:{
        type:Boolean,
        required:true
    },

        createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
});
bookingScheme.pre('save',function(next){
    this.updatedAt = new Date();
    next()
});
const booking = mongoose.model('Booking',bookingScheme)
export default booking