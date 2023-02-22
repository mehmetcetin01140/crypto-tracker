const express = require("express");
const cors = require("cors");
const news = require("./json/news.json");
const app = express();

app.use(cors());


app.get("/getnews", function (req, res) {
  const index = req.query.index;
  if (!index) {
    res.send(news);
  } else {
    res.send(news[Number(index)]);
  }
});

const port = process.env.PORT || 9001

app.listen(port, function () {
  console.log("Sunucu 3000 portunda çalışıyor...");
});
module.exports = app
