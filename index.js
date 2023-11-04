const express = require("express");
const router = require("./routes/routes");
const path = require("path");


const PORT = process.env.PORT || 5000;

const WEBSITE_PATH = path.join(__dirname, "website");


const app = express();

app.use(express.static(WEBSITE_PATH));


app.use("/", router);



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});