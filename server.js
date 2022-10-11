const express = require('express');
var cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const usersRouter = require("./Users/users")
const feedRouter = require("./feed/feed")
const questionRouter = require('./questions/questions')
const repliesRouter = require("./replies/replies")
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json()


app.use(cors());

app.use("/users",usersRouter);
app.use("/feed",feedRouter);
app.use("/questions",questionRouter);
app.use("/replies",repliesRouter);



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});





