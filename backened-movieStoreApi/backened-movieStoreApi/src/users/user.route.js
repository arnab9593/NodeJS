const express = require('express')
const Users = require('./user.mdoule')

const app = express.Router()

// try and catch method
app.get("/", async (req, res) => {
  try {
    let title = req.query.title;
    let orderby = req.query.order;
    let sort = req.query.sort;
    let Page = Number(req.query.page);
    let Limet = Number(req.query.limet);
    let user = await Users.find();
    if (title) {
      user = await Users.find({ Title: "King Kong" }, { Title: 1, Year: 1, imdbID: 1, Type: 1, Poster: 1 })
    }
    if (sort) {
      let Order = 1;
      if (orderby === "desc") {
        Order = -1;
      }
      user = await Users.find().sort({ [sort]: Order })
    }

    if (Page) {
      if (Limet) {
        let Skipcount = (Page * Limet) - Limet;
        user = await Users.find().skip(Skipcount).limit(Limet);
      } else {
        user = "You have to enter both the parameter page and limit"
      }
    }

    if (Limet) {
      user = await Users.find().limit(Limet);
    }
    res.send(user)
  } catch (err) {
    res.send(err.message);
  }
})


// get with id
app.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let user = await Users.findById(id);

    if (!user) {
      res.send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.send(err.message);
  }
})

//post 
app.post("/", async (req, res) => {

  try {
    let user = await Users.create({
      ...req.body
    });
    res.send(user);

  } catch (err) {
    res.status(404).send(err.message);
  }
})

// delete
app.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {

    let user = await Users.findByIdAndDelete(id)
    if (user) {
      res.send("user deleted successfully")
    } else {
      res.send("cannot delete non existent user")
    }
  } catch (err) {
    res.status(404).send(err.message);
  }


})

// Patch
app.patch("/:id", async (req, res) => {
  let id = req.params.id;
  try {

    let user = await Users.findByIdAndUpdate(id, { ...req.body, }, {
      new: true
    });
    res.send(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
})



module.exports = app;