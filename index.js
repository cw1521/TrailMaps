const bodyParser = require("body-parser"); 

const express = require("express");
const router = require('./routes/routes');

const PORT = process.env.PORT || 3500;




const server = express();

server.use(bodyParser.json())


server.use(bodyParser.urlencoded({ 
    extended: true
})); 

server.use("/api", router);




server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});