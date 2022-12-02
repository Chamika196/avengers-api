const express = require('express');
const app = express(); //created an express appication

app.use(express.json());
//express = null;

app.listen(3000,() => {
    console.log("Connected..Listening to Port 3000");
});

let avengerArray = [
    {id : 1, name: "Captain America" },
    {id : 2, name: "Thor" },
    {id : 3, name: "Black Widow" },
];

//callback function here is called a route handler
app.get('/', (req, res) => {
    res.send('You have succesfully connected to our API !')

});


//get all  methods
app.get('/api/avengers',(req,res) => {

    let avengers = ["iron man","captain america","thor"]
    res.send(avengers);

    //validations
if(!req.body.avengerName){
    return res.status(400).send("Not all mandatory values are sent");
}
});



//get with para
app.get('/api/avengers/:avengerId', (req,res) => {
 //   eg: localhost:3000/api/avengers/?filterBy="avengerType"
    let optionalParam = req.query.filterBy; //accessing optional parameter

    res.send('You have requsted for the Avenger Id ' + req.params.avengerId + 'and the optional parameters passed for filterBy is '+ optionalParam);
});

app.get('/api/avengers/:avengerId', (req,res) => {
    let avenger = avengerArray.find(a=>a.id == req.params.avengerId);
    //let avenger = avengerArray.find(a=>a.id === parseInt(req.params.avengerId));
    if(!avenger){
       return res.status(404).send("The given ID does not exist on our system");
    }
    res.status(200).send(avenger); 

});
app.post("/api/avengers", (req,res) => {
    let newAvengerObj = {
        id : avengerArray.length + 1,
        //name : req.body.name
        name : req.body.avengerName
    };
    avengerArray.push(newAvengerObj);
    res.send(newAvengerObj);
});

app.put('/api/avengers/:avengerId', (req,res) => {
    let avenger = avengerArray.find(a=>a.id == req.params.avengerId);
    //let avenger = avengerArray.find(a=>a.id === parseInt(req.params.avengerId));
    if(!avenger){
       return res.status(404).send("The given ID does not exist on our system");
    }

    //valdation
    if(!req.body.avengerName)
    {
        return res.status(400).send("Not all mandatory values are sent");
    }

    avenger.name = req.body.avengerName;
    res.send(avenger);

});

app.delete('/api/avengers/:avengerId', (req,res) => {
    let avenger = avengerArray.find(a=>a.id == req.params.avengerId);
    //let avenger = avengerArray.find(a=>a.id === parseInt(req.params.avengerId));
    if(!avenger){
       return res.status(404).send("The given ID does not exist on our system");
    }

    //valdation
    if(!req.body.avengerName)
    {
        return res.status(400).send("Not all mandatory values are sent");
    }

    let indexOfAvenger = avengerArray.indexOf(avenger);
    avengerArray.splice(indexOfAvenger,1);
    
    res.send(avenger);



});

