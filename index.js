const bodyParser = require("body-parser"); 
const express = require("express");
const router = require("./routes/routes");
const path = require("path")




const PORT = process.env.PORT || 5000;

const WEBSITE_PATH = path.join(__dirname, "website");





const app = express();

app.use(express.static(WEBSITE_PATH));



app.use(bodyParser.json())


app.use(bodyParser.urlencoded({ 
    extended: true
})); 




app.use("/", (req, res) => {
    res.sendFile("index.html");
});



app.use("/api", router);




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});