const Pending = async(repository) =>{
    const pending = await repository.PendingApproval()

    if (pending) {
       return( {status:true,pending,message:"pendings fetched"} )
       
    }
    else{
       return({status:false,pending,message:"no pendings"})
    }
    
   }
   export default Pending