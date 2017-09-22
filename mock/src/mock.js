let mock1 = require('./mock/mock1');

let $ = require('jQuery');

$.ajax({
    url: 'http://mock1.js',
    dataType:'json'
}).done(function(data, status, xhr){
    console.log(
        JSON.stringify(data, null, 4)
    )
});
