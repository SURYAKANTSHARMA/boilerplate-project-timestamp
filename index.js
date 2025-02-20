// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:time", function(req, res){
   let time = req.params.time
   let timestamp;
   if (!isNaN(time)) {
     timestamp = new Date(parseInt(time, 10));
   } else {
     timestamp = new Date(time);
   }
 
   if (isNaN(timestamp.getTime())) {
    return res.json({ error: 'Invalid date' });
  }
  
   res.json({ unix : timestamp.getTime(), 
    utc: timestamp.toUTCString()
   })
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
