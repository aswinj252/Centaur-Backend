const  PatientEntity =(name,email,phone,password,bloodGroup,gender,dob,payment,appointment,report,videoData) =>{
     return {
      getName:()=> name,
      getBgroup:()=> bloodGroup,
      getEmail:()=> email,
      getPhone:()=> phone,
      getGender:()=>gender,
      getDob:()=>dob,
      getPassword:()=>password,
      getPayment:()=> payment,
      getAppointment:()=>appointment,
      getReport:()=>report,
      getVideodata:()=>videoData
    }


}
export default PatientEntity