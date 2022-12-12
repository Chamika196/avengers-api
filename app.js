const express = require('express');
const avengers = require('./routes/avengers');
const home = require('./routes/home')
const logger = require('./middleware/logger');
const authenticator = require('./middleware/authenticator');
const app = express(); //created an express appication


app.use(express.json()); //parse json object ; telling app to use inbuilt middleware
//express = null;

app.use(logger); //telling app to use custom middleware logger
app.use(authenticator);
app.use('/api/avengers', avengers);
app.use('/', home);
app.listen(3000,() => {
    console.log("Connected..Listening to Port 3000");
});
