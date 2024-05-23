// const express = require("express");
import express from "express";
import router from "./routes/start.js";
import cors from "cors";
import CardRoutes from "./routes/CardRoute.js"

import bodyParser from "body-parser";

 
import ip from "ip";
const app = express();

const ipAddr=ip.address();


let lastHouseVisited = "Gryffindor";

app.use (cors());


app.use(
  bodyParser.json()
);

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);

app.get("/",(req,res) => {
  res.json({lastHouseVisited:lastHouseVisited});
});

app.post("/",(req,res) => {
  lastHouseVisited = req.body.lastHouseVisited;
  res.json({lastHouseVisited:lastHouseVisited});
});

app.use(CardRoutes);



app.listen(3000, () => {
  console.log("Server run http://" + ip.address() + ":3000");
});


