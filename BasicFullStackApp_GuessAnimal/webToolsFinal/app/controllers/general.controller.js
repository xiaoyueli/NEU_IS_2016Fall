const InfoModel = require('../models/info_model');

module.exports = {
    registration: registration,
    checkusername: checkusername,
    checkuserinfo: checkuserinfo,
    getuserlist: getuserlist,
    emptydb: emptydb,
    deleteuser:deleteuser
}

function deleteuser(req, res) {
    const username = req.body.username;


    InfoModel.findOne({username}, function (err, doc) {
        if (err) console.log(err);
        if (doc) {
            InfoModel.remove({username}, function (err) {
                if (err) console.log(err);
                res.send(true);
            });
        }
        else res.send(false);
    })



}

function emptydb(req, res) {
    InfoModel.remove({}, function (err) {
        if (err) console.log(err);
        res.send(true);
    })
}

function registration(req, res) {
    const user_info = req.body;
    const newUser = new InfoModel(user_info);
    newUser.save();
    res.send(newUser);

}

function checkusername(req, res) {
    const username = req.body.username;
    InfoModel.findOne({username}, function (err, user) {

        if(err) {console.log(err)};
        if (user) res.send(user);
        else res.send({});
    })
}

function checkuserinfo(req, res) {
    const username = req.body.username;
    const passwrod = req.body.password;

    InfoModel.findOne({username}, function (err, doc) {
        let info = null;
        if (doc && doc.password === passwrod) info = doc;
        res.send({info});
    })
}

function getuserlist(req, res) {
    const info = InfoModel.find({}).sort({score: -1}).limit(10);
    info.exec(function (err, users) {
        const list = users.map(user=>{
            return [user.username, user.score, user.rate];
        });
        res.send(list);
    })
}