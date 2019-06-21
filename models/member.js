const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: {
        first: String,
        last: String,
    },
    phone: Number,
    password: String,
    gender: Number,
    job: String
});


//靜態方法 => 通常多用在搜尋這個Table裡的內容
memberSchema.statics.findByAccount = function(phone, password) {
    return this.find({phone:phone, password: password})
}

// Query Hleper => 利用mongoose提供的查詢方法 建立預設的查詢條件
memberSchema.query.byAccount = function (phone, password) {
    return this.where({
        phone: phone,
        password: password
    })
}

module.exports = mongoose.model('Member' , memberSchema);