
const nodemailer = require("nodemailer");

const emailUsername = "freida.cassin@ethereal.email"
const emailPasswd = "HzcAZ9TY8KMeZkBsdN"

const transport = nodemailer.createTransport({

    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: emailUsername,
        pass: emailPasswd,
    }

})

transport.sendMail({
    to: "arnabpal679@gmail.com",
    from: "contactwitharnab@gmail.com",
    subject: "Hello Arnab !",
    text: "Test email"
}).then(() => {
    console.log("success");
})  
