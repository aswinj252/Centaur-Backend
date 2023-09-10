const Doctors = async(repository) =>{
    const doctors = await repository.getDoctors()
    return ({doctors})
}
export default Doctors