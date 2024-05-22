const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your-email@gmail.com', // Your email
        pass: 'your-email-password' // Your email password
    }
});

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'your-email@yourdomain.com', // Your domain email
        subject: 'New Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent successfully');
    });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all to handle React routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
