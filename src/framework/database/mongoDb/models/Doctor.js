import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
   
  },
  department: {
    type: String,
    
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  
  document: {
    type: String,
  
  },
 
  picture: {
    type: String,
    required:true
   
  },
  reviewed:{
    type:String,
    required:true
  },
  approved:{
    type:String,
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

doctorSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});


const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
