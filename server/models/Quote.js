const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema(
    {
        quote:{
            type: String
        }
    }
)

module.exports = mongoose.model("quote", QuoteSchema);