const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(3000, () => {
  console.log("Server running on port " + listener.address().port);
});

app.get("/api", (req, res) => {
  const current = new Date();

  res.json({
    unix: current.getTime(),
    utc: current.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  const date = req.params.date;

  let d;

  // Check if it's a Unix timestamp (only digits)
  if (/^\d+$/.test(date)) {
    d = new Date(Number(date));
  } else {
    d = new Date(date);
  }

  // Invalid date
  if (d.toString() === "Invalid Date") {
    return res.json({
      error: "Invalid Date"
    });
  }

  // Valid date
  res.json({
    unix: d.getTime(),
    utc: d.toUTCString()
  });
});