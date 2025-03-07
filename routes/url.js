import express from "express"
const router = express.Router()
import {handleGenerateNewShortUrl, handleGetAnalytics} from "../controllers/url.js"

router.post("/",handleGenerateNewShortUrl);

router.get("/analytics/:shortId",handleGetAnalytics) 

export default router