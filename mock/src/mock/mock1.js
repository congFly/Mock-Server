let Mock = require('mockjs');

module.export = {
    Info: Mock.mock('http://mock1.js', 'get', {
        'list|1-3': [{
            'sid|+1': 1,
            'userId|:5': '',
            'sex|1-2': true,
            'city|2-4': {
                "01": "东莞",
                "02": "深圳",
                "03": "广州",
                "04": "惠州"
            },
            'guid': '@guid',
            'id': '@id',
            'regexp': /[a-z][A-Z][0-9]/
        }]
    })
};

// console.log(JSON.stringify(mock1, null, 4));


