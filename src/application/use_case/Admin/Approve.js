const Approve = async(id,repository) =>{
   const data = await repository.Data(id)
 const approve = await repository.Approve(id)
 if (approve) {
    return({status:true,data,message:"Doctor Approved"})
 }
}
export default Approve