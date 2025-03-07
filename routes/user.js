import express from "express"
const router = express.Router();
import {handleUserSignUp,handleUserLogIn} from "../controllers/user.js"

router.post("/",handleUserSignUp)
router.post("/login",handleUserLogIn)


export default router