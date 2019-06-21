const express = require('express');

const multer = require('multer');

const router = express.Router();

const uploadController = require('../controller/uplaodController');

const storage = multer.diskStorage({
    destination: './member_system/dist/img',
    filename: (req, file, cb) => {
        // let fileArr = file.originalname.split('.');
        
        cb( null, file.originalname);
    }
});

const upload = multer({storage:storage});

router.post('/avatar', upload.single('avatar'), uploadController.uploadAvatar);

module.exports = router;