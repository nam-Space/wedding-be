const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const job = require('./cron/cron');

const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const path = require("path");

require("dotenv").config();

dbConnect();
job.start()

const PORT = process.env.PORT || 8081

app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", UserRouter);

app.get("/", (request, response) => {
    response.send({ message: "Hello world app API!" });
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});