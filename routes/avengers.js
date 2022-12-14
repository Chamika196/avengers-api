const express = require("express"); //imported express module
const Avenger = require("../models/avenger");
const router = express.Router(); //created an express appication

let avengerArray = [
    { id: 1, name: "Captain America" },
    { id: 2, name: "Thor" },
    { id: 3, name: "Black Widow" }
];

//GET ALL
router.get("/", async (req, res) => {

    try {
        let avengers = await Avenger.find().sort({name: "asc"});
        return res.send(avengers);
    }
    catch (ex) {
        return res.status(500).send("Error: " + ex.message);
    }

});

//Get with params
router.get("/:avengerId",async (req, res) => {
    
    
    try{
        let avenger = await Avenger.findById(req.params.avengerId);
        return res.send(avenger);
        //res.status(200).send(avenger);
    }
    catch(ex){
       // 
       return res.status(500).send("Error: " + ex.message);
    }   
    if (!avenger) {
        return res.status(404).send("The given ID does not exist on our system");
    } 

});
router.post("/", async (req, res) => {
    if (!req.body.avengerName) {
        return res.status(400).send("Not all mandatory values are sent");
    }

    try {
        let avenger = new Avenger({
            name: req.body.avengerName,
            birthName: req.body.birthName,
            movies: req.body.movies,
            imgUrl: req.body.imgUrl,
            likeCount: req.body.likeCount,
            deceased: req.body.deceased

        });

        avenger = await avenger.save();  //save is mongoose method
        return res.send(avenger);

    }
    catch (ex) {
        return res.status(500).send("Error: " + ex.message);
    }



});

//update]
router.put('/:avengerId',async (req, res) => {
    
    //let avenger = avengerArray.find(a=>a.id === parseInt(req.params.avengerId));
    
 try{
    let avenger = await Avenger.findById(req.params.avengerId);
    avenger.set({likeCount: req.body.likeCount});
    avenger = await avenger.save();
    //avenger.name = req.body.avengerName; (ealier)
    return res.send(avenger);

 }
 catch(ex){
    return res.status(500).send("Error: " + ex.message);
 }
 if (!avenger) {
    return res.status(404).send("The given ID does not exist on our system");
}
//validation
if (!req.body.likeCount) {
    return res.status(400).send("Not all mandatory values are sent");

}
    

});

router.delete("/:avengerId", async (req, res) => {

    try{
        let avenger =await Avenger.findOneAndDelete({_id: req.params.avengerId})
        return res.send(avenger);
    }
    catch (ex){
        return res.status(500).send("Error: " + ex.message);
    }
    if (!avenger) {
        return res.status(404).send("The given ID does not exist on our system");
    }

    // let indexOfAvenger = avengerArray.indexOf(avenger);
    // avengerArray.splice(indexOfAvenger, 1);

    
});

module.exports = router;