import mongoose from 'mongoose';


const DepartmentSchema = new mongoose.Schema({
    department:{
        type:String,
        required:true
      },description:{
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

DepartmentSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
  });

const Department = mongoose.model('Department',DepartmentSchema)
export default Department