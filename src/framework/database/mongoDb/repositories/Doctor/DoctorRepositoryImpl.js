import Doctor from "../../models/DOctor.js";
import ScheduleAppointment from "../../models/ScheduleAppointment.js";
import  ScheduleTime from "../../models/SplitTimes.js"
const DoctorRepositoryImpl = () => {
  const Data = (id) => Doctor.findOne({ _id: id }, { name: 1, email: 1 });
  const DoctorExist = (email) => Doctor.findOne({ email: email });

  const create = async (doctor) => {
    console.log(doctor);
    const newDoctor = new Doctor({
      name: doctor?.getName(),
      speciality: doctor?.getSpeciality(),
      email: doctor?.getEmail(),
      phone: doctor?.getPhone(),
      password: doctor?.getPassword(),
      document: doctor?.getDocument(),
      status: "false",
    });

    return newDoctor.save();
  };
  const PendingApproval = () => Doctor.find({ status: false });
  const Approve = (id) =>
    Doctor.updateOne({ _id: id }, { $set: { status: true } });
  const Reject = (id) => Doctor.deleteOne({ _id: id });
  const Schedule = (details) => {
    console.log(details);
    const newSchedule = new ScheduleAppointment({
      startingTime: details?.getStarting(),
      endingTime: details?.getEnding(),
      slots: details?.getSlots(),
      date: details?.getDate(),
      docId: details?.getDocId(),
    });
    return newSchedule.save();
  };
  const verifyUser = (id) =>Doctor.findOne({_id:id})
  const data = (id) =>Doctor.findOne({_id:id})
  const split = async (data) => {
    console.log(data, "data");
  
    const modifiedData = data.map(entry => ({
      date: entry.date,      // Verify property names here
      time: entry.time,      // Verify property names here
      docId: entry.docId,    // Verify property names here
      Id: entry.Id,          // Verify property names here
      booked: false
    }));
    console.log(modifiedData.date, "modifiedData");
   
try {
  const insertedData = await ScheduleTime.insertMany(modifiedData);
  console.log("Data inserted successfully:", insertedData);
} catch (error) {
  console.error("Error inserting data:", error);
}
  } 

  return {
    DoctorExist,
    create,
    PendingApproval,
    Approve,
    Reject,
    Data,
    Schedule,
    verifyUser,data,split
  };
};

export default DoctorRepositoryImpl;
