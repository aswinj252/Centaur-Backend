import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  BloodGroup: {
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
  gender: {
    type: String,
    
  },
  DOB: {
    type: Date,
    
  },
  password: {
    type: String,
    required: true
  },
  
  Appointment: {
    type: mongoose.Schema.Types.ObjectId,
    
  },
  report: {
    type: mongoose.Schema.Types.ObjectId,
    
  },
  VideoData: {
    type: mongoose.Schema.Types.ObjectId,
    
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

patientSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient
