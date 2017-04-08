const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

// create a schema
const userInfoSchema = new Schema({
   username: {
       type: String,
       unique: true
   },
    password: String,
    score: {
       type: Number,
        default: 0
    },
    win: {
       type: Number,
        default: 0
    },
    total: {
       type: Number,
        default: 0
    },
    rate: {
       type: String,
        default: '0%'
    },
    history: {
       type: Array,
        default: []
    }
});

userInfoSchema.pre('save', function (next) {

    next();
})


const userInfoModel = mongoose.model('UserInformation', userInfoSchema);

module.exports = userInfoModel;