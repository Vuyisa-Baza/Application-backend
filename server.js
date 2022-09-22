const express = require('express');
var cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const usersRouter = require("./Users/users")
const feedRouter = require("./feed/feed")

const bodyParser = require("body-parser");
var jsonParser = bodyParser.json()


app.use(cors());

app.use("/users",usersRouter);
app.use("/feed",feedRouter);




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});





