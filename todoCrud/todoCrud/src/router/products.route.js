const Express=require("express");
const app=Express.Router();
app.get("",(req,res)=>{
    res.send("products")
})

module.exports=app;