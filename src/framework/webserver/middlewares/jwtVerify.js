 
const auth = (req,res,next)=>{
  const accessToken = req.cookies.access_token;
 
 console.log(accessToken,"access token in middleware");
 next()  
}

 export default auth