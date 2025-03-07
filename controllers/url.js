import { nanoid } from "nanoid";
import URL from "../models/url.js"

export async function handleGenerateNewShortUrl(req,res) {
    console.log("Received body:", req.body);
    const body = req.body;
    if(!body.url) return res.status(400).json({err:"url is required"})
    const shortId = nanoid(8)
    await URL.create({
        shortId : shortId,
        redirectURL: body.url,
        visitHistory:[],
        createdBy: req.user._id
    })
    return res.render('home', {id: shortId} )
    
};

export async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({totalClicks:result.visitHistory.length, analytics : result.visitHistory})

}
export async function handleRedirect(req,res){
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {shortId},
        {$push:{visitHistory:{timestamp:Date.now()}}}
    );
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectURL)
}
