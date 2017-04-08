const InfoModel = require('../models/info_model');

module.exports = {
    updatescore:updatescore
}

function updatescore(req, res) {

    const username = req.body.username;

    InfoModel.findOne({username}, function (err, info) {
        if (err) {
            res.status(500).send(err);
        }
        info.score = req.body.score || 0;
        info.win = req.body.win || 0;
        info.total = req.body.total || 0;
        info.history = [setTime() + "#" + req.body.win + "#"
            + req.body.total + "#" + req.body.score, ...info.history];
        info.rate = (req.body.win / req.body.total * 100).toFixed(2) + '%';
        info.save();
        res.send(info);
    })
}

function setTime() {
    const d = new Date();
    return d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
        d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}