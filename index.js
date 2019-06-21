const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const app = express();

const config = require('./config');

const router = require('./routes')


app.use(bodyParser.json());//允許JSON
app.use(bodyParser.urlencoded({extended: false}));//允許x-www-form-urlencoded

//以ap為路徑名開啟路由
app.use('/api', router);    

    // app.listen(config.port, () => {
    //   console.log('listening on ' + config.port);
    // });

mongoose.connect(config.mongodb,{useNewUrlParser: true}).then(() => {

    app.listen(config.port, () => {
        console.log('listening on ' + config.port);
    });

}).catch((err) => {
    console.log(err);
})