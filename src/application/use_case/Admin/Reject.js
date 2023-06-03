const Reject = async(id,repository) =>{
    const data = await repository.Data(id)
    const reject = await repository.Reject(id)
    if (reject) {
      
        
        return ({status:true, data , message:"Application rejected"})
    }

}
export default Reject