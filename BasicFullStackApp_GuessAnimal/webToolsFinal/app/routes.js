const express = require('express'),
    router = express.Router(),
    path = require('path'),
    generalController = require('./controllers/general.controller'),
    guessController = require('./controllers/guess.controller');

module.exports = router;

router.post("/register", generalController.registration);
router.post("/checkusername", generalController.checkusername);
router.post("/checkuserinfo", generalController.checkuserinfo);
router.post("/updatescore", guessController.updatescore);
router.get("/getuserlist", generalController.getuserlist);
router.get("/emptydb", generalController.emptydb);
router.post("/deleteuser", generalController.deleteuser);