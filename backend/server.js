const express = require("express");
const app = express();
const morgan = require("morgan");
const multer = require("multer");
const indexRouter = require("./routes");
const userRouter = require("./routes/user");
const brokerRouter = require("./routes/seller");
const postRouter = require("./routes/post");
const { sequelize } = require("./models");

const PORT = 8000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan("dev"));

sequelize.sync({force: true}).then(() => console.log("db 접속 성공")).catch(err => console.log(err));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/seller", brokerRouter);
app.use("/post", postRouter);


app.listen(PORT, () => console.log(`this server listening on ${PORT}`));