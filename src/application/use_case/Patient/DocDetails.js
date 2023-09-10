const DocDetails = async ( id,repository) =>{
 const details = await repository.Details(id)
 return ({details})
}
export default DocDetails