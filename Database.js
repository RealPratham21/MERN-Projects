const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/People").then(()=>{
    console.log("Connected");
})
const userSchema = new mongoose.Schema({
    Task: {type: String}
})
const userModel = mongoose.model("students", userSchema);
module.exports = userModel;