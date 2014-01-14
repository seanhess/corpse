var express = require('express')
var app = express()
app.use(express.static('public'))
var PORT = process.env.PORT || 3004
app.listen(PORT)
console.log("Started Server on " + 3004)