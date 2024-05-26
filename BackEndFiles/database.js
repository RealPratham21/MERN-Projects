const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://ftwprathambhamare7:nkf2onecQRtEquHH@cluster0.n8ggr2m.mongodb.net/People").then(()=>{
    console.log("Connected!");
})

const userSchema = new mongoose.Schema({
    Name: String,
    Password: String,
    Cart: [mongoose.Schema.Types.Mixed]
})


const userModel = mongoose.model("Users", userSchema, "Users");
module.exports = userModel;