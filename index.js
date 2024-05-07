const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('./Frontend'))
const Database = require("./Database");
app.get("/", (req, res)=>{
    const data = fs.readFileSync('./Frontend/index.html');
    res.end(data);
})
app.post('/addTask', async (req, res)=>{
    console.log(req.body);
    if (req.body.Add){
        const addedTask = await Database.create({Task: req.body.Name});
        await addedTask.save();
    }
    else{
        await Database.updateOne({Task: req.body.OldName}, {$set: {Task: req.body.Name}});
    }
    res.json({
        message: "Information Received",
        ok: true
    });
})
app.post("/deleteTask", async (req, res)=>{
    console.log(req.body);
    await Database.deleteOne({Task: req.body.Name});
    res.json({
        message: "Task Deleted",
        ok: true
    })
})
app.get("/getData", async (req, res)=>{
    const data = await Database.find();
    res.json(data);
})
app.listen(5000, ()=>{
    console.log("Listening to 5000..");
})