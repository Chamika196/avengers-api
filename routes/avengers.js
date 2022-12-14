const express = require('express'); //imported express module
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
router.get("/:avengerId", (req, res) => {
    let avenger = avengerArray.find((a) => a.id == req.params.avengerId);
    if (!avenger) {
        return res.status(404).send("The given ID does not exist on our system");
    }
    res.status(200).send(avenger);

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

router.put('/:avengerId', (req, res) => {
    let avenger = avengerArray.find((a) => a.id == req.params.avengerId);
    //let avenger = avengerArray.find(a=>a.id === parseInt(req.params.avengerId));
    if (!avenger) {
        return res.status(400).send("The given ID does not exist on our system");
    }
    //validation
    if (!req.body.avengerName) {
        return res.status(400).send("Not all mandatory values are sent");

    }


    avenger.name = req.body.avengerName;
    res.send(avenger);

});

router.delete("/:avengerId", (req, res) => {
    let avenger = avengerArray.find((a) => a.id == req.params.avengerId);

    if (!avenger) {
        return res.status(404).send("The given ID does not exist on our system");
    }

    let indexOfAvenger = avengerArray.indexOf(avenger);
    avengerArray.splice(indexOfAvenger, 1);

    res.send(avenger);
});

module.exports = router;