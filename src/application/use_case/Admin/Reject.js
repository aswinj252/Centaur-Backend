const Reject = async(id,repository,mailService) =>{
    const data = await repository.Data(id)
     await repository.Reject(id)
     await mailService.rejectApplication(data.name, data.email)
      
        
        return ({status:true, message:"Application rejected"})
   

}
export default Reject