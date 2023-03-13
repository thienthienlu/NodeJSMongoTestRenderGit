const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const port = 9000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbName = "node-demo-01";
// const url = "mongodb://127.0.0.1:27017";
// const client = new MongoClient(url);
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;

var $ = (jQuery = require("jquery")(window));

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get mongoose to use the global promise library
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/node-demo-01");
// Get Data from MongooseDB

const nameSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    reason: "'Fisrt Name' must be a string and is required",
  },
  lastName: {
    type: String,
    required: true,
    reason: "'Last Name' must be a string and is required",
  },
  birthDay: {
    type: Date,
    format: "MM/DD/YYYY",
    required: true,
    reason: "'Birthday' must be in the format [ DD/MM/YYYY]",
  },
  gender: {
    type: String,
    required: true,
    reason: "'Gender' must be required",
  },
  email: {
    type: String,
    required: true,
    reason: "'Email' must be in the format and is required",
  },
  phoneNumber: {
    type: String,
    required: true,
    reason: "'Phone number' must be required",
  },
  city: {
    type: String,
    required: true,
    reason: "'City' must be required",
  },
});

const User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
  res.render("pages/index");
  
});
app.get("/home", (req, res) => {
  res.render("pages/index");
});

main().catch(console.error);

async function main() {
  const data = await User.find();
  // await client.connect();
  // const db = client.db(dbName);
  const tagline = "Welcome To DashBoard";
  app.get("/dashboard", (req, res) => {
    res.render("pages/dashboard", {
      data: data,
      tagline: tagline,
    });
  });
  // const data_01 = await User.find()
  app.post("/addUser", (req, res) => {
    const myData = new User(req.body);
    const tagline = "Success!!!";
    // window.location = './pages/dashboard';
    myData
      .save()
      .then((item) => {
        //   res.send("item saved to database");
        res.render("pages/dashboard", {
          data: data,
          tagline: tagline,
        });
      })
      .catch((err) => {
        res.status(400).send("unable to save to database");
      });
  });
}
app.listen(port, () => {
  console.log(`App is listening the PORT ${port}`);
});
