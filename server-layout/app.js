const express = require("express");
const cors = require("cors");

const dataController=require("./controllers-layer/data-controller");

const server = express();
server.use(cors());
server.use(express.json());

server.use("/api", dataController);

server.use("*", (req, res) => {
    res.status(404).send(`Route not found ${req.originalUrl}`);
});

server.listen(4000, () => {
    console.log("Listening on 4000");
}).on("error", (err) => {
    console.log(err);
    if (err.code === "EADDRINUSE")
        console.log("Error: Address in use");
    else 
        console.log("Error: Unknown error");
});