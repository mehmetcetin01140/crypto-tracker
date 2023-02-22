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


app.listen(3000, function () {
  console.log("Sunucu 3000 portunda çalışıyor...");
});
