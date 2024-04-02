// require all modules
const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// database connection
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
client.connect();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let count = 0; // for counting number of requsets

// routes
app
  .route("/")
  .get((req, res) => {
    count++;
    console.log(`New Request Received - ${req.ip} - count: ${count}`);
    res.status(200).json({ message: "Hello from Server!!" });
  })
  .post((req, res) => {
    console.log(req.body);
    const { useremail, userfirst, userlast, userage } = req.body;
    const insertQuery = `insert into users values('${useremail}', '${userfirst}', '${userlast}', ${Number(
      userage
    )});`;

    client.query(insertQuery, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Data insert successful");
      client.end();
    });

    console.log(insertQuery);

    res.json({ message: "successful", name: req.body.userfirst });
  });

app.route("/users").get((req, res) => {
  const fetchQuery = `select firstname || ' ' ||lastname from users;`;
  const data = "";
  client.query(fetchQuery, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Data Fetched Successful");
    console.log(res);
  });
  res.json(data.rows);
});

app.listen(PORT, () => {
  console.log(`Server is UP and RUNNING at PORT: ${PORT}`);
});
