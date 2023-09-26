const verified =  async(token,repositories) =>{
    const verify = await repositories.Verify(token)
    console.log(verify,"verify");
    return ({verify})

}

export default verified