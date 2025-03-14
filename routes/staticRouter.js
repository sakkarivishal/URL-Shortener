import express from "express"
import URL from "../models/url.js"
import { restrictTo } from "../middleware/auth.js"
const router = express.Router()


router.get('/admin/urls',restrictTo(["ADMIN"]),async (req,res)=>{
    if(!req.user) return res.redirect("/login")
    const allURLs = await URL.find({})
    return res.render('home',{urls:allURLs})
})


router.get('/',restrictTo(["NORMAL","ADMIN"]),async (req,res)=>{
    if(!req.user) return res.redirect("/login")
    const allURLs = await URL.find({createdBy: req.user._id})
    return res.render('home',{urls:allURLs})
})

router.get('/signup',async (req,res)=>{
    return res.render('signup')
})

router.get('/login',async (req,res)=>{
    return res.render('login')
})




export default router