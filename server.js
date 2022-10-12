const express = require("express");
const app = express();
require("dotenv").config(); //this is hidding from github. You can store secrets, apikey for authorization
const mongoose = require("mongoose");
//cross origin resource sharing- allow other developrs to access API provided and we can allow access to multiple environemtns of the same project. Read more here: https://www.stackhawk.com/blog/nodejs-cors-guide-what-it-is-and-how-to-enable-it/
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
//app.use so that we can mount specified middle functions at the path. Were using this mostly for middleware setup. Read more: https://www.geeksforgeeks.org/express-js-app-use-function/
//expres.json vs express.urlencoded
app.use(express.json()); //express.json() is a method recognize the incoming Req Object as a JSON Object. Called as a middleware in application.
//enable all CORS request.
app.use(cors());

//MONGODB CONNECTION AND DB
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true, //server selelction, server discovery and monitoring
});

const db = mongoose.connection;
//on signifies the event will be called every time that it occurs
db.on("error", console.error.bind(console, "connection error: "));
//once signifies event will be called once-when mongoose connection is made with the db
db.once("open", () => {
  console.log("Database connected");
});

//ROUTES
//use api/users. Whatever we have in this users route, add on to the path below.
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

//TESTING
app.get("/", (req, res) => {
  res.send("HELLO WORLD PEOPLE!");
});

app.use(express.static("dist"));

//PORT-.env to store in root directory of file
const port = process.env.PORT || 8000;

//404 error handler for unknown routes
app.use((req, res) => {
  //sendStatus is cleaner vs res.status(404).send();
  return res.sendStatus(404);
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//Listen for PORT
app.listen(port, () => {
  console.log(`Serving on Port ${port}...`);
});
