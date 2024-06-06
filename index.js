const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
require('dotenv').config({ path: './config/config.env' })
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*', // Replace with your frontend domain or '*' for all origins
    methods: 'POST',
    allowedHeaders: 'Content-Type'
}));

app.use(bodyParser.json());

app.post('/feedback',async (req, res)=>{
    
    const { name, email, message } = req.body;
   
    try{
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port:587,
        service: process.env.SMPT_SERVICE ,
        auth:{
            user: process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        }
    })
    
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: "info@sspl.co",
        subject: 'Feedback Received',
        text : `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    }
  

    await transporter.sendMail(mailOptions)

    res.status(200).json({
        success:true,
        message:`Feedback Received successfully`
    })


}catch(err){
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Server error' });
} })



app.listen(PORT, () => {
    console.log('Server listening on port 4000');
  })
