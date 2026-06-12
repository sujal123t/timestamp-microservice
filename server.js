const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
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

  if (/^\d+$/.test(date)) {
    d = new Date(Number(date));
  } else {
    d = new Date(date);
  }

  if (d.toString() === "Invalid Date") {
    return res.json({
      error: "Invalid Date",
    });
  }

  res.json({
    unix: d.getTime(),
    utc: d.toUTCString(),
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});