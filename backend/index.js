const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");
const {port} = require("./config");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
