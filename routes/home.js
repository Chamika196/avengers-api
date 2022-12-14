const express = require('express'); //imported express module
const router = express.Router(); //created an express appication

//callback function here is called a route handler
router.get("/", (req, res) => {
    res.send('You have succesfully connected to our API !')

});

module.exports = router;