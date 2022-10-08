//1 import
const http = require("http");
const db = require("./db.json");
const fs = require("fs")

//2 create
const server = http.createServer((req, res) => {
    // console.log({ req });
    if (req.method === "GET") {
        if (req.url === "/") {
            res.write("Your are in home page");
        }
        else if (req.url === "/login") {
            res.write("Your are in login page");
            res.write(JSON.stringify(db.users))
        }
        else if (req.url === "/products") {
            res.write("Your are in products page");
            res.write(JSON.stringify(db.products))
        }
        else {
            res.write("Page not found")
        }
    }
    else if (req.method === "POST") {
        if (req.url === "/products") {
            //update products
            db.products.push({ id: Date.now(), productDetails: "New product added" })
            res.write(JSON.stringify(db.products))
        }
        else if (req.url === "/users") {
            //update users
            db.users.push({ id: Date.now(), userDetails: "New user added" })
            res.write(JSON.stringify(db.users))
        }
        fs.writeFileSync("./db.json", JSON.stringify(db))
    }
    res.end()
})

//3 listen/start
server.listen(8080, () => {
    console.log("Server is up and running at port 8080");
})
