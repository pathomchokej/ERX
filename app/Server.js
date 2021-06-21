const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const { QustionnaireSuccess } = require('./controllers/QuestionnaireController');
const QuestionnaireControllerModule = require('./controllers/QuestionnaireController');

let _server = express();
_server.use(bodyParser.json());
_server.use(morgan('dev'));
_server.use(cors());
let _controller = QuestionnaireControllerModule.Instance;

_server.listen(8000, function () {
    console.log('Server Listen at http://localhost:8000');
    console.log(_controller.GetInformation());
});


_server.get('/info', function (req, res, next) {
    let questionnaireInfo = 'Number of qestionnaire is ' + _controller.NumberOfQuestionnaire;
    let info = questionnaireInfo + '\n' + _controller.GetInformation();
    return res.status(200).json({
        code: 1,
        message: 'OK',
        data: info
    })
});


_server.post('/createquestionnaire', function (req, res, next) {
    let index = _controller.CreateQuestionnaire();
    console.log('Create questionnaire :', index, '/', _controller.NumberOfQuestionnaire);
    return res.status(201).json({
        code: 1,
        message: 'OK',
        data: index
    });
});

_server.get('/getquestion', function (req, res, next) {
    try {
        let questionnaireIndex = Number(req.body.questionnaireIndex);
        if (questionnaireIndex < 0 || questionnaireIndex >= _controller.NumberOfQuestionnaire) {
            return res.status(404).json({
                code: 1,
                message: 'Questionnaire index is out of range',
            })
        }

        let questionIndex = Number(req.body.questionIndex);
        let result = _controller.GetQuestion(questionnaireIndex, questionIndex);
        if (result.Result == QustionnaireSuccess) {
            let question = { name: result.Data.Name, choices: result.Data.Choices };
            return res.status(200).json({
                code: 1,
                message: 'OK',
                data: question
            })
        }
        else {
            return res.status(204).json({
                code: 1,
                message: 'Question index is out of range',
            })

        }

    }
    catch (error) {
        return res.status(404).json({
            code: 1,
            message: error,
        })
    }
});

_server.post('/answer', function (req, res, next) {
    try {
        let questionnaireIndex = Number(req.body.questionnaireIndex);
        if (questionnaireIndex < 0 || questionnaireIndex >= _controller.NumberOfQuestionnaire) {
            return res.status(404).json({
                code: 1,
                message: 'Questionnaire index is out of range',
            })
        }

        let questionIndex = Number(req.body.questionIndex);
        let answer = req.body.ans;
        let result = _controller.SetAnswer(questionnaireIndex, questionIndex, answer);
        if (result.Result == QustionnaireSuccess) {
            return res.status(200).json({
                code: 1,
                message: 'OK',
            })
        }
        else {
            return res.status(204).json({
                code: 1,
                message: 'Question index is out of range',
            })

        }
    }
    catch (error) {
        return res.status(404).json({
            code: 1,
            message: error,
        })
    }
});

_server.get('/csv', function (req, res, next) {
    try {
        let questionnaireIndex = Number(req.body.questionnaireIndex);
        let result = _controller.GenerateCSV(questionnaireIndex);
        if (result.Result == QustionnaireSuccess) {
            return res.status(200).json({
                code: 1,
                message: 'OK',
                data: result.Data
            })
        }
        else {
            return res.status(404).json({
                code: 1,
                message: 'Questionnaire index is out of range',
            })
        }
    }
    catch (error) {
        return res.status(404).json({
            code: 1,
            message: error,
        })
    }
});


