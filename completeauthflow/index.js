require("dotenv").config();
const express = require("express");
const PORT = process.config.PORT;
const cors = require("cors");

const seq = (Math.floor(Math.random() * 10000) + 10000)
  .toString()
  .substring(1);

const nodemailer = require("nodemailer")
let user = []

const username = "flossie.anderson16@ethereal.email"
const password = "MXGJufnVBW2euv3mx9"

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'flossie.anderson16@ethereal.email',
    pass: 'MXGJufnVBW2euv3mx9'
  }
});

const app = express();
const connect = require("./config");
const UserModel = require("./user.model");
app.use(cors());
app.use(express.json());
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

//signup

app.use("/signup", async (req, res) => {
  const { name, email, password, age } = req.body;
  const token = req.headers.authorization;


  const user = await UserModel.findOne({ email });

  if (user) {
    return res.status(403).send("Use another emailid");
  }

  try {
    if (!token) {
      let newUser = new UserModel({
        name,
        email,
        password,
        age,
        otp: seq,
        role: "Student",
      });
      await newUser.save();


      //   return res.status(201).send("Student Created Successfull");

      transporter.sendMail({
        to: "dummy@gmail.com",
        from: "send@fmail.com",
        subject: "verification otp",
        text: seq
      }).then(() => {
        console.log("done")
      })

      return res.send(seq)


    }

    const verification = jwt.verify(token, "SecretKey");

    if (verification) {
      let newUser = new UserModel({
        name,
        email,
        password,
        age,
        otp: seq,
        role: "Instructor",
      });
      await newUser.save();

      return res.status(201).send("Instructor Created Successfull");
    } else {
      return res.status(401).send("Not Authorized");
    }
  } catch (e) {
    return res.send(e.message);
  }
});


app.post("/verifyotp", async (req, res) => {

  const { otp, newpassword, email } = req.body
  const user = await UserModel.findOne({ email });

  if (otp === user.otp) {

    if (newpassword) {

      await UserModel.updateOne({ email }, { $set: { password: newpassword } })
      return res.status(200).send("password is updated")
    }

    let token = jwt.sign(
      { name: user.name, id: user._id, age: user.age },
      "secretKey",
      { expiresIn: "7 days" }
    );

    let refreshtoken = jwt.sign(
      { name: user.name, id: user._id, age: user.age },
      "refreshToken",
      { expiresIn: "28 days" }
    );

    return res.status(401).send({ token, refreshtoken });


  } else {
    return res.status(201).send("OTP is not valid");
  }



});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email, password });

  if (!user) {
    return res.status(404).send("User Not Found");
  }

  try {
    let token = jwt.sign(
      { name: user.name, id: user._id, age: user.age },
      "secretKey",
      { expiresIn: "7 days" }
    );

    let refreshtoken = jwt.sign(
      { name: user.name, id: user._id, age: user.age },
      "refreshToken",
      { expiresIn: "28 days" }
    );

    return res.status(401).send({ token, refreshtoken });
  } catch (e) {
    return res.send(e.message);
  }
});


app.post("/passwordupdate", async (req, res) => {

  const { email } = req.body

  const user = await UserModel.findOne({ email })

  if (!user) {

    return res.status(404).send("not found")
  }



  transporter.sendMail({
    to: "dummy@gmail.com",
    from: "send@fmail.com",
    subject: "verification otp",
    text: seq
  }).then(() => {
    console.log("done")
  })

  await UserModel.updateOne({ email }, { $set: { otp: seq } })
  return res.send(seq)

})


mongoose.connect("mongodb://localhost:27017/b21").then(() => {
  app.listen(8080, () => {
    console.log(`http://localhost:8080`);
  });
});
