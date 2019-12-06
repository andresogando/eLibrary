var mongoose    = require('mongoose');



// SCHEMA SETUP DB 
var booksSchema = new mongoose.Schema({
    name: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
    description: String,
    categoria: String,
    author: 
    {
        id: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String

    },
    comments: 
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
       
    ]
});

// SETTING SCHEMA  
module.exports = mongoose.model("Book", booksSchema);