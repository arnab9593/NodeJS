const Express = require("express");
const postRoutes = require("./router/post.router");
const productRoutes = require("./router/products.route");
const app = Express();

app.use(Express.json())
// API
app.use("/posts", postRoutes);
app.use("/products", productRoutes);
app.get("/", (req, res) => {
    res.send("Hello This is home page")
})

app.listen(8080, () => {
    console.log("http://localhost:8080");
});