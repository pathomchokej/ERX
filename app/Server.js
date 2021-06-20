const express = require('express');

let server = express();

server.listen(3000, function() {
    console.log('Server Listen at http://localhost:3000');
});