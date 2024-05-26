const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path')
const data = fs.readFileSync('../E-Commerce/index.html', 'utf8');
const userModel = require('./database');
const cors = require('cors');
const nodemailer = require('nodemailer');
app.use(cors());
app.use(express.static(path.join(__dirname, '../E-Commerce/dist')));
app.use(bodyParser.json())
app.get('/', (req, res) => {
  console.log("Request was made!");
    res.sendFile(path.join(__dirname, '../E-Commerce/dist', 'index.html'));
  });
app.post('/sendEmail', (req, res)=>{
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ftw.prathambhamare7@gmail.com',
      pass: '22regularchild_.'
    }
  });
  let mailOptions = {
    from: 'ftw.prathambhamare7@gmail.com',
    to: req.body.Email,
    subject: 'Welcome to our Newsletter',
    body: 'This Email has been sent by Prathamesh'
  }
  transporter.sendMail(mailOptions, (error, info)=>{
    if (error){
      res.json({message: "Error sending message"})
    }
    else{
      console.log(info.response);
      res.json({message: "Email sent successfully"})
    }
  })
})
app.post('/checkUser', async (req, res)=>{
  console.log(req.body);
  const user = await userModel.findOne({Name: req.body.Name, Password: req.body.Password});
  console.log(user);
  if (user){
    console.log("User is present");
    res.json({message: "Present", Name: req.body.Name, Password: req.body.Password});
  }
  else{
    console.log("User is Absent");
    res.json({message: "Absent"});
  }
})
app.post("/addtoCart", async (req, res)=>{
  console.log(req.body);
  const Person = await userModel.findOne({Name: req.body.Name, Password: req.body.Password});
  Person.Cart.push(req.body.ItemDetails);
  await Person.save();
  res.json({message: "Added to Cart"});
})
app.post("/getCart", async (req, res)=>{
  console.log(req.body);
  const Person = await userModel.findOne({Name: req.body.Name, Password: req.body.Password});
  res.json({message: "Data sent", Items: Person.Cart})
})
app.post('/addUser', async (req, res)=>{
  console.log(req.body);
  const user = await userModel.create({Name: req.body.Name, Password: req.body.Password});
  await user.save();
  console.log(user);
  res.json({message: "Created User!"});
})
app.post("/deleteItem", async (req, res)=>{
  console.log(req.body);
  let data = await userModel.findOne({Name: req.body.Name, Password: req.body.Password});
  data.Cart = data.Cart.filter(elem => elem.id != req.body.Item)
  await data.save();
  res.json({message: "Deleted Item"})
})
app.post('/clearCart', async (req, res)=>{
  console.log(req.body);
  let data = await userModel.findOne({Name: req.body.Name, Password: req.body.Password});
  data.Cart = []
  await data.save();
  res.json({message: "Cart Cleared"});
})
app.listen(3080, ()=>{
    console.log("Listening to 3080..");
})