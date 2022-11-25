const express = require('express');
const app = express(); //created an express appication

//express = null;

app.listen(3000,() => {
    console.log("Connected..Listening to Port 3000");
});

//callback function here is called a route handler
app.get('/', (req, res) => {
    res.send('You have succesfully connected to our API !')

});


//get all  methods
app.get('/api/avengers',(req,res) => {

    let avengers = ["iron man","captain america","thor"]
    res.send(avengers);
});


//get with para
app.get('/api/avengers/:avengerId', (req,res) => {
    //eg: localhost:3000/api/avengers/?filterBy="avengerType"
    let optionalParam = req.query.filterBy; //accessing optional parameter

    res.send('You have requsted for the Avenger Id ' + req.params.avengerId + 'and the optional parameters passed for filterBy is '+ optionalParam);
});

