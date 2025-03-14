import express from "express"
import path from "path"
import URL from "./models/url.js"
import cookieParser from "cookie-parser"
import { checkForAuthentication,restrictTo } from "./middleware/auth.js"
const app = express()
const port = 8000
import connectToMongoDb from "./connect.js"
import urlRoute from "./routes/url.js"
import staticRoute from "./routes/staticRouter.js"
import userRoute from "./routes/user.js"


import { handleRedirect } from "./controllers/url.js"


connectToMongoDb("mongodb://127.0.0.1:27017/short-url")

app.set("view engine","ejs")
app.set('views',path.resolve("./views"))

// app.get("/test",async (req,res)=>{
//     const allUrls = await URL.find({});
//     return res.render('home',{urls:allUrls})
// })

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(checkForAuthentication)

app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute)
app.use("/user",userRoute)
app.use("/",staticRoute)

app.get("/url/:shortId",handleRedirect)


app.listen(port, () => {console.log(`Server at ${port}`)})