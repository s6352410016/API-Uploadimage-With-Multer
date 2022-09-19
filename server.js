const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname , 'public')));

const storage = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null , 'public/images/');
    },
    filename: (req , file , cb) => {
        const randomFileName = `${Date.now()}-img-${file.originalname}`;
        cb(null , randomFileName);
    }
});

const upload = multer({storage: storage});

app.get('/' , (req , res) => {
    res.sendFile('index.html');
});

app.post('/upload' , upload.single('image') , (req , res) => {
    res.send('Upload success');
});

app.listen(5000 , () => {
    console.log('Starting server...');
})