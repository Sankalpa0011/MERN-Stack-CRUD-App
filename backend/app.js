const express = require('express');
const mongoose = require('mongoose');
const router = require("./Routes/UserRoutes");
require('dotenv').config();

const app = express();
const cors = require('cors');

//Middleware for test
// app.use("/", (req, res, next) => {
//     res.send("It Is Working...");
// })

//Middleware
app.use(express.json());
app.use(cors());
app.use("/users", router);
app.use("/file", express.static("file"));


//Database connection setup
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})
.catch(err => console.log((err)));

//Register.................................
//Call Register Model
require("./Model/Register");
const User = mongoose.model("Register");
app.post("/register", async (req, res) => {
    const {name, gmail, password} = req.body;
    try {
        await User.create({
            name,
            gmail,
            password
        })
        res.send({status: "ok" });
    } catch (err) {
        res.send({status: "error" });
    }
});


//Login...................................
app.post("/login", async (req, res) => {
    const {gmail, password} = req.body;
    try {
        const user = await User.findOne({gmail});
        if (!user) {
            return res.json({err:"User not found"});
        }
        if (user.password === password) {
            return res.json({ status: "ok" });
        } else {
            return res.json({ err: "Incorrect password"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({err: "server Error"});
    }
});

//Pdf......................................
const multer = require('multer');
const storage = multer.diskStorage({
    destination:function(req, file, cb) {
        cb(null, "./file");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});

//Insert Model Part
require("./Model/PdfModel")
const pdfSchema = mongoose.model('PdfDetails');
const upload = multer({storage})

app.post("/uploadfile", upload.single("file"), async (req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const pdf = req.file.filename;
    try {
        await pdfSchema.create({title: title, pdf: pdf});
        console.log("Pdf Uploaded Successfully");
        res.send({status: 200});
    } catch (err) {
        console.log(err);
        res.status(500).send({status: "Error"});
    }
});


//Display
app.get("/getFile", async (req, res) => {
    try {
        const data = await pdfSchema.find({});
        res.send({status: 200, data: data});
    }  catch (err) {
        console.log(err);
        res.status(500).send({status: "Error"});
    }
})

//Img Part
require("./Model/ImgModel");
const ImgSchema = mongoose.model("ImgModel");

const multerimg = require("multer");

const storageimg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../frontend/src/Components/ImgUploader/files")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix +  file.originalname);
    }
});

const uploadimg = multerimg({storage: storageimg});

app.post("/uploadImg",uploadimg.single("image"), async (req, res) => {
    console.log(req.body);
    const imageName = req.file.filename;

    try {
        await ImgSchema.create({Image:imageName});
        res.json({status:"ok"})
    } catch (err) {
        res.json({status: err});
    }
});

//Display Img
app.get("/getImage", async (req, res) => {
    try {
        ImgSchema.find({}).then((data) => {
            res.send({status: "ok", data: data});
        });
    } catch(err) {
        res.json({status: err});
    }
});