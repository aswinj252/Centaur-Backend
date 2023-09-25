import Patient from "../../models/Patient.js";
import Department from "../../models/Department.js";
import Doctor from "../../models/DOctor.js";
import ScheduleTime from "../../models/SplitTimes.js";
import booking from "../../models/Booking.js";
const PatientRepositoryImp = () => {
  const PatientExist = (email) => Patient.findOne({ email: email });

  const create = async (patient) => {
    const newpatient = new Patient({
      name: patient?.getName(),
      email: patient?.getEmail(),
      phone: patient?.getPhone(),
      password: patient?.getPassword(),
    });
    return newpatient.save();
  };
  const getDepartments = () => Department.find({})
  const getDoctors = () => Doctor.find({reviewed:true,approved:true},{speciality:1,name:1,picture:1})
  const getDetails = ( id) => Doctor.findOne({_id:id},{speciality:1,picture:1,name:1,department:1})
  const GetTime = (id,date) => ScheduleTime.find({docId:id,date:date})
  const Book = (timeId,docId) =>ScheduleTime.updateOne({_id:timeId,docId:docId},{$set:{booked:"true"}})
  const Booked = (details) =>{
    const BookingDetails = new booking({
      patientId:details.getPatientId(),
      docId:details.getDocId(),
      timeId:details.gettimeId(),
      booked:true


    })
    return BookingDetails.save();
  };
  const update  = (id,token) =>Patient.updateOne({_id:id},{$set:{verifyToken:token}})
  const DeleteData = (token) => Patient.deleteOne({verifyToken:token})
  const Data = (token) => Patient.findOne({verifyToken:token})
  


  return { PatientExist, create ,getDepartments,getDoctors,getDetails,GetTime,Book,Booked,update,DeleteData,Data};
};

export default PatientRepositoryImp;
