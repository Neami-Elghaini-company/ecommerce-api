const jwt = require('jsonwebtoken');
module.exports = (payload)=>{
    // const token =  jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"2m"})
    const token =  jwt.sign(payload,"afa48@@U#$U$H",{expiresIn:"2m"})
    return token;
}