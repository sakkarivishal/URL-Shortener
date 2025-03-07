import { getUser } from "../service/auth.js";

export async function restrictToLoggedInUserOnly(req,res,next){
    const useruid = req.cookies?.uid;
    if(!useruid) return res.redirect("/login");
    const user = getUser(useruid);
    if(!user) return res.redirect("/login");

    req.user=user;
    next();
}

export async function checkAuth(req,res,next){
    const useruid = req.cookies?.uid;
    
    const user = getUser(useruid);

    req.user=user;
    next();
}