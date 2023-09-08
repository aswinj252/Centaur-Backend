const approvedDoc = async(repository) =>{

    const doctors = await repository.ApprovedDoc()
    return ({doctors})
}
export default approvedDoc