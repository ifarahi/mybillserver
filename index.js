const express = require("express");
const app = express();
const PORT = process.env.PORT || 1998;
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.disable("x-powered-by");
app.use(cors());
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api", require("./routes"));

app.use((req, response, next) => {
  const error = new Error();
  error.message = "Resource Not Found";
  error.status = 404;
  next(error);
});


app.listen(PORT);