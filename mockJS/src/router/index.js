/**
 * Created by 18829 on 2017/9/13.
 */

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let mockjs = require('mockjs');
let router = express.Router();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.send('123456');
});



app.get('/1', function (req, res) {
    res.json(mockjs.mock({
        'data|11': [/[1-9]{1,3}|0/],
        'issue':/[1-9]{8}/
    }))
});

app.get('/2', function (req, res) {
    let data=mockjs.mock({
        'data': [/[1-3]/,/[4-5]/,/[6-7]/,/[8-9]/,/1[0-1]/]
    }).data;
    res.json({
        data:data
    })
});

app.listen(8003, function () {
    console.log('Example app listening on port 8003!');
});

module.exports = router;