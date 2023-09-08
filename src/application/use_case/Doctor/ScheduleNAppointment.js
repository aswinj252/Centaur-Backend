import ScheduleEntity from "../../../entities/AppointmentSchedule.js";

const ScheduleNAppointment = async (
  startingTime,
  endingTime,
  slots,
  date,
  docid,
  dbRepository
) => {
   console.log(docid,"jaiiii");
    console.log(startingTime, endingTime, slots, date, docid,"inusecase");
    const Apptype = "NormalBooking"
   const Details = ScheduleEntity(startingTime, endingTime, slots, date, docid,Apptype);
  console.log(Details, "in usecase");
  const newAppontment = await dbRepository.Schedule(Details);
  console.log(newAppontment,"hahghah");
  return {newAppontment}
};

export default ScheduleNAppointment;
