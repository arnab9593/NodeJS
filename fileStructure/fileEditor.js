const allFile = "../fileStructure"
const fs = require("fs");

// fs.readFile("./sampleData.txt", "utf-8", (err, data) => {
//     console.log(data);
// })

// fs.writeFile("./temp.txt", "I write quality code", "utf-8", (err, data) => {
//     console.log(data);
// })

// fs.appendFile("./sampleData.txt", " Arnab", "utf-8", (err, data) => {
//     console.log(data);
// })

// fs.rename("./sampleData.txt", "originalData.txt", (err) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("File renamed");
//     }

// })

// fs.unlink("./temp.txt", (err) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("File deleted");
//     }

// })

fs.readdir("../fileStructure", (err, files) => {
    if (err) {
        console.log(err);
    }
    else {
        files.forEach(ele => { console.log(ele); })
    }
})