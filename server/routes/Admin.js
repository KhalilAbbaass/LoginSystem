const router = require("express").Router();

const QuoteSchema = require("../models/Quote");

const {validateAdmin} = require("../middleware/Auth")

router.get("/getQuotes",validateAdmin,async(req , res) => {
    try{
        const allQuotes = await QuoteSchema.find();
        res.status(200).json(allQuotes)
    }catch(err){
        console.log("error getting quotes")
        res.status(500).json(err)
    }

})
router.post("/addQuote",validateAdmin, async (req , res) => {
    try{
        const quoteInfo = req.body;
        const newQuote = new QuoteSchema({
            quote: quoteInfo.quote
        })
            await newQuote.save();
            res.status(200).json("quote added successfully")
    }catch(err){
        console.log("error adding quotes")
        res.status(500).json(err)
    }
})
router.put("/editQuote/:id",validateAdmin, async (req, res) => {
    try{
        const quoteInfo = req.body
        await QuoteSchema.findByIdAndUpdate(req.params.id,
            {$set: {quote: quoteInfo.quote}},
            {new:true}
            )
            res.status(200).json("quote edited succesfully")
    }catch(err){
        console.log("error editing quotes")
        res.status(500).json(err)
    }
})
router.delete("/deleteQuote/:id",validateAdmin, async (req,res) => {
    try{
        await QuoteSchema.findByIdAndDelete(req.params.id)
        res.status(200).json("quote has been deleted")
    } catch(err) {
        console.log("error at admin delete quote route")
        res.status(500).json(err)
    }
})



module.exports = router;