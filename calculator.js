const args = process.argv
const realData = args.slice(2)
const command = realData[0];
const inp1 = Number(realData[1]);
const inp2 = Number(realData[2]);


if (command === "add") {
    console.log(inp1 + inp2);
}

if (command === "sub") {
    console.log(inp1 - inp2);
}

if (command === "mult") {
    console.log(inp1 * inp2);
}

if (command === "divide") {
    console.log(inp1 / inp2);
}

if (command === "random") {
    console.log(Math.random());
}

if (command === "sin") {
    console.log(Math.sin(inp1));
}

if (command === "tan") {
    console.log(Math.tan(inp1));
}

if (command === "cos") {
    console.log(Math.cos(inp1));
}

