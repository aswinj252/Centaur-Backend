const deleteDetails =  async(token,repository) =>{
const Delete = await repository.DeleteData(token)
console.log(Delete);

}
export default deleteDetails