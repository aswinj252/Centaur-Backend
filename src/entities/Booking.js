const bookingEntity = (patientId,timeId,docId)=>{
    return {
        getPatientId: () => patientId,
        gettimeId :() =>timeId,
        getDocId : () => docId
    }
}
export default bookingEntity