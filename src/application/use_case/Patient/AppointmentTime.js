const AppointmentTime = async ( id,date,repository) => {
    const Time = await repository.GetTime(id,date)
return({Time})
}
export default AppointmentTime