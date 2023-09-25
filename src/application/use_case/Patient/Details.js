const GetData = async(token,repository) =>{
 const data = await repository.Data(token)
 return ({data})
}
export default GetData