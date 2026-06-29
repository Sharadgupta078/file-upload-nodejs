const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  return res.render("Home");
});

app.post("/upload", upload.single("profileImage"), (req, res) => {

  return res.redirect("/");
});

app.listen(8015, () => console.log("server running on PORT 8015"));
