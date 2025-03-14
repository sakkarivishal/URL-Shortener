import jwt from "jsonwebtoken"
const secret = "Vishal$123"

export function setUser(user){
    return jwt.sign({
        _id : user._id,
        email :user.email,
        role:user.role
    },secret)
};

export function getUser(token){
    if(!token) return null
    try{
        return jwt.verify(token,secret)
    }
    catch(err){
        return null
        }
}
