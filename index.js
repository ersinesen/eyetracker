var express = require('express')
var fs = require('fs')
var app = express()
const session = require('express-session')
const passwordProtected = require('express-password-protect')

// for local webcam access
var https = require('https')

const config = {
    username: "demo",
    password: "e2os-2020",
    maxAge: 600000 // ms
}
app.use(passwordProtected(config))

app.use(express.static(__dirname+'/js'))
app.use(express.static(__dirname+'/weights'))
app.use(express.static(__dirname+'/css'))

/*
app.get('/', function (req, res) {
  res.send('eyetracker demo hello')
})

app.get('/eyetracker', function(req,res){
 res.sendFile(__dirname + '/eyetracker.html');
}); 
*/

app.use(function(req, res) {
  res.sendFile(__dirname + '/eyetracker.html');
})

https.createServer({
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt')
}, app).listen(8080, function () {
  console.log('Nodejs is listening at port 8080.')
})


 

