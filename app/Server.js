const express = require('express');
const QuestionnaireControllerModule = require('./controllers/QuestionnaireController');

let _server = express();
let _controller = QuestionnaireControllerModule.Instance;

_server.listen(3000, function() {
    console.log('Server Listen at http://localhost:3000');
    console.log(_controller.GetInformation());
});

_server.get('/user', function(req, res, next) {
    return res.status(200).json({
        code: 1,
        message: 'OK',
        //data: users
    })
});