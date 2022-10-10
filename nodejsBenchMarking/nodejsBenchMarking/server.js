// In node there are 3 steps
// 1 import
const http = require("http");
const fs = require("fs");
const db = require("./db.json");
// const fsPromises = require('fs').promises;

// 2 create
const server = http.createServer((req, res) => {
  //console.log({req});
  console.log(req.method, req.url);

  if (req.method === "GET") {
    if (req.url === "/") {
      res.write("<h1>Hello, You are in home page</h1>");
    } else if (req.url === "/textpromise") {
      fs.promises
        .readFile("./textpromise.txt", "utf-8")
        .then((result) => {
          console.log(result);
          res.write(result);
        })
        
        .catch((error) => {
          console.log(error);
          res.write(error);
        });
    }
  }

  res.end();
});

// another route textpromis

// 3 listen/start
server.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});
