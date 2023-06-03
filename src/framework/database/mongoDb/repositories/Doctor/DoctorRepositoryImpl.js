
import Doctor from "../../models/DOctor.js";

const DoctorRepositoryImpl = () => {
  const Data = (id) => Doctor.findOne({_id:id},{name:1,email:1})
   const DoctorExist = (email) => Doctor.findOne({ email: email });

  const create = async (doctor) => {
    console.log(doctor);
    const newDoctor = new Doctor({
      name: doctor?.getName(),
      speciality: doctor?.getSpeciality(),
      email: doctor?.getEmail(),
      phone: doctor?.getPhone(),
      password: doctor?.getPassword(),
      document:doctor?.getDocument(),
      status:"false"
    });


    return newDoctor.save()
  };
  const PendingApproval = () =>Doctor.find({status:false}) 
  const Approve = (id) =>Doctor.updateOne({_id:id},  { $set: { status: true } })
  const Reject = (id) => Doctor.deleteOne({_id:id})
  return{DoctorExist,create,PendingApproval,Approve,Reject,Data}
};

export default DoctorRepositoryImpl