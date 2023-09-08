import ScheduleEntity from "../../../entities/AppointmentSchedule.js";

const ScheduleAppointment = async (
  startingTime,
  endingTime,
  slots,
  date,
  docId,dbRepository
) => {
    // console.log(res.cookies.access_token,"access token in schedule");
    console.log(startingTime, endingTime, slots, date, docId,"inusecase");
    const Apptype ="VideoBooking"
   const Details = ScheduleEntity(startingTime, endingTime, slots, date, docId,Apptype);
  console.log(Details, "in usecase");
  const newAppontment = await dbRepository.Schedule(Details);
  console.log(newAppontment,"hahghah");
  return {newAppontment}
};

export default ScheduleAppointment;
