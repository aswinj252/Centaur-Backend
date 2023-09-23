import bookingEntity from "../../../entities/Booking.js";
const bookappointment = async (patientId,timeId,docId,repository) =>{
console.log("hi");
const book = await repository.Book(timeId,docId)
const bookingDetails = bookingEntity(patientId,timeId,docId)
const booked = await  repository.Booked(bookingDetails)
console.log(booked);
return({book})

}
export default bookappointment