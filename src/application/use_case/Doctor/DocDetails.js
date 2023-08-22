const DocDetails = async(id,repository) =>{
    console.log(id,"dodododododo");
    const Data = await repository.data(id)
    console.log(Data,"in usecase");
 
     if (Data){
        return ({Data})
     }
     else{
        return({ message:"no details found"})
     }

}
export default DocDetails