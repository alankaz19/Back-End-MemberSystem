const config = require('../config');

const uploadAvatar = (req, res, next) => {
    if(!req.file) {
        res.josn({status: 400, msg: 'BAD REQUEST'});
    }else{
        // let fileArr = req.file.originalName.split('.');
        let filePath = config.urlRoot + req.file.originalname;
        res.json({status: 200, msg: {filePath: filePath}});
    }
}

module.exports = {
    uploadAvatar
}