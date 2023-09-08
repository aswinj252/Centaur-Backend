import Doctor from "../../models/DOctor.js";
import ScheduleAppointment from "../../models/ScheduleAppointment.js";
import ScheduleTime from "../../models/SplitTimes.js";
import Department from "../../models/Department.js";


const DoctorRepositoryImpl = () => {
  const Data = (id) => Doctor.findOne({ _id: id }, { name: 1, email: 1 });

  const DoctorExist = (email) => Doctor.findOne({ email: email });

  const create = async (doctor) => {
    console.log(doctor);
    const newDoctor = new Doctor({
      name: doctor?.getName(),
      speciality: doctor?.getSpeciality(),
      department:doctor?.getDepartment(),
      email: doctor?.getEmail(),
      phone: doctor?.getPhone(),
      password: doctor?.getPassword(),
      document: doctor?.getDocument(),
      picture:doctor?.getPicture(),
      reviewed: "false",
      approved:"false"
    });

    return newDoctor.save();
  };
  const PendingApproval = () => Doctor.find({ reviewed: false ,approved:false});

  const Approve = (id) =>
    Doctor.updateOne({ _id: id }, { $set: { reviewed: true ,approved:true} });

  const Reject = (id) => Doctor.updateOne({ _id: id },{$set:{reviewed:true,approved:false}});

  const Schedule = (details) => {
    console.log(details);
    const newSchedule = new ScheduleAppointment({
      startingTime: details?.getStarting(),
      endingTime: details?.getEnding(),
      slots: details?.getSlots(),
      date: details?.getDate(),
      docId: details?.getDocId(),
      type:details?.getType(),
    
    });
    return newSchedule.save();
  };
  const verifyUser = (id) => Doctor.findOne({ _id: id });
  const data = (id) => Doctor.findOne({ _id: id });
  const split = async (data) => {
    console.log(data, "data");

    const modifiedData = data.map((entry) => ({
      date: entry.date, // Verify property names here
      time: entry.time, // Verify property names here
      docId: entry.docId, // Verify property names here
      Id: entry.Id, // Verify property names here
      booked: false,
    }));
    console.log(modifiedData.date, "modifiedData");

    try {
      const insertedData = await ScheduleTime.insertMany(modifiedData);
      console.log("Data inserted successfully:", insertedData);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };
  const AllDepartments = () => Department.find({},{department:1})
  const EditDetails = async (id, name, email, phone, specialization, department) => {
    console.log(id, name, email, phone, specialization, department);
    try {
      const updated = await Doctor.updateOne(
        { _id: id },
        {
          $set: {
            name: name,
            email: email,
            phone: phone,
            speciality: specialization,
            department: department,
          },
        }
      );
      return { updated };
    } catch (error) {
      console.error("Error updating document:", error);
      throw error; // Re-throw the error to handle it at a higher level if needed.
    }
  };
  
  return {
    DoctorExist,
    create,
    PendingApproval,
    Approve,
    Reject,
    Data,
    Schedule,
    verifyUser,
    data,
    split,
    AllDepartments,
    EditDetails
  };
};

export default DoctorRepositoryImpl;
