const mongoose = require("mongoose");
mongoose.connect ("mongodb+srv://liji:abc@cluster0.n8yaa.mongodb.net/RecipeApp")


const Schema = mongoose.Schema ;
var recipeSchema = new Schema ({
    
    Title : String,
    Duration : Number,
    Serving : Number,
    
});

 let newrecipe = mongoose.model("RecipeLists", recipeSchema)

 module.exports = newrecipe


