import User from "../models/user.js"
import {v4 as uuidv4} from "uuid"
import {setUser} from "../service/auth.js"

export async function handleUserSignUp(req,res){
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password
    });

    return res.redirect('/')
}

export async function handleUserLogIn(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    console.log("USER",user)
    if(!user){
        return res.render('login',{error:'Invalid email or password'})
    }

    const token = setUser(user);
    res.cookie("uid",token)
    return res.redirect('/')
}
