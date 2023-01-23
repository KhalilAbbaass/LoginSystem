const router = require("express").Router();

const QuoteSchema = require("../models/Quote");

const {validateUser} = require("../middleware/Auth")



router.get("/getQuotes",validateUser,async(req , res) => {
    try{
        const allQuotes = await QuoteSchema.find();
        res.status(200).json(allQuotes)
    }catch(err){
        console.log("error getting quotes")
        res.status(500).json(err)
    }

})

module.exports = router;