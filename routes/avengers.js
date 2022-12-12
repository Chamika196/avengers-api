const express = require('express'); //imported express module
const router =  express.Router(); //created an express appication

let avengerArray = [
    { id : 1, name: "Captain America"},
    { id : 2, name: "Thor"},
    { id : 3, name: "Black Widow"}
];

//GET ALL
router.get("/",(req,res) => {
    console.log("GET Method called ........ ");
    res.send(avengerArray);
});

//Get with params
router.get("/:avengerId",(req,res) => {
    let avenger = avengerArray.find((a) => a.id == req.params.avengerId);
    if(!avenger){
        return res.status(404).send("The given ID does not exist on our system");
    }
    res.status(200).send(avenger);

}); 
router.post("/", (req,res) => {
//valdation
if(!req.body.avengerName)
{
    return res.status(400).send("Not all mandatory values are sent");
} 

    let newAvengerObj = {
        id : avengerArray.length + 1,
        //name : req.body.name
        name : req.body.avengerName
    };
    avengerArray.push(newAvengerObj);
    res.send(newAvengerObj);
});

router.put('/:avengerId', (req,res) => {
    let avenger = avengerArray.find((a)=>a.id == req.params.avengerId);
    //let avenger = avengerArray.find(a=>a.id === parseInt(req.params.avengerId));
    if(!avenger){
       return res.status(400).send("The given ID does not exist on our system");
    }
//validation
if(!req.body.avengerName){
    return res.status(400).send("Not all mandatory values are sent");

}
    

    avenger.name = req.body.avengerName;
    res.send(avenger);

});

router.delete("/:avengerId",(req,res) => {
    let avenger = avengerArray.find((a) => a.id == req.params.avengerId);

    if(!avenger){
        return res.status(404).send("The given ID does not exist on our system");
    }

    let indexOfAvenger = avengerArray.indexOf(avenger);
    avengerArray.splice(indexOfAvenger,1);

    res.send(avenger);
});

module.exports = router;