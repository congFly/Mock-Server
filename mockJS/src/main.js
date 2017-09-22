process.env.NODE_ENV == 'mork' && require('./mork/1.js');
process.env.NODE_ENV == 'mork' && require('./mork/2.js');
let $ = require('jquery');
$(function () {

    $.ajax({
        url: 'http://1.json',
        type: 'get'
    }).done(function (data, status) {
        console.log('我是请求1' + data)
    });


    $.ajax({
        url: 'http://2.json',
        type: 'post'
    }).done(function (data, status) {
        console.log('我是请求2' + data)
    })
});