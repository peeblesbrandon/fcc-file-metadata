'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var upload = multer();

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'),function(req, res) {
  console.log('BODY:\n', req.body);
  console.log('\nFILE:\n', req.file);
  res.status(200).json({name: req.file.originalname, type: req.file.mimetype, size: req.file.size})
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
