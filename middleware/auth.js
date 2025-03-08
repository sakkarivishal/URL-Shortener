import { getUser } from "../service/auth.js";

export async function restrictToLoggedInUserOnly(req,res,next){
    // const useruid = req.cookies?.uid;
    const userUid = req.headers['authorization'];
    if(!userUid) return res.redirect("/login");
    const token = userUid.split('Bearer ')[1];
    const user = getUser(userUid);
    if(!user) return res.redirect("/login");

    req.user=user;
    next();
}

export async function checkAuth(req,res,next){
    // const useruid = req.cookies?.uid;
    const userUid = req.headers['authorization'];
    const token = userUid.split('Bearer ')[1];
    const user = getUser(token);

    req.user=user;
    next();
}