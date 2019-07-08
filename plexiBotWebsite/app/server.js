// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.set('view engine', 'ejs');
const PlexiAPI = require('plexi-api');
const bots = new PlexiAPI.Client()
const path = require('path')
const moment = require('moment');
//moment(1464082005441).format("DD MMM YYYY hh:mm a"))

app.get('/lookup', function(req, res, err) {
  //send a getInfo request to Plexi's API
  bots.getInfo(req.query.id).then(info => { 
    console.log("[Website] Gathering info from Plexi's API...")
    //Send the user to plexibot.ejs
    res.sendFile(path.join(__dirname + '/views/plexibot.ejs'));
//console.log(info)
    console.log(`[Website] Sending search request to Plexi API..`)
    console.log(`[Website] Looking up bot ID: ${req.query.id}...`)
    //We render the plexibot.ejs page...
  res.render('plexibot', { 
    //Now that we rendered the page, we now load the information.
    botUsername: `Bot Name: ${info.bot.username || "Error: Could not get info."}`,
    botOwner: `Bot Owner: ${info.owner.username}#${info.owner.discriminator || "Error: Could not get info."}`,
    botCreationDate:`Bot Creation Date: ${moment(info.bot.createdTimestamp).format("MMM DD YYYY") || "Error: Could not get info."}`,
    botStatus:`Status: ${info.status || "Error: Could not get info."}`,
    botPrefix:`Prefix: ${info.prefix || "Error: Could not get info."}`,
    botIcon:`${info.bot.avatarURL}`,
    botStatusColor:``,
  }).then(console.log("[Website] Info gathered! Rendering info..."))
    
  }).catch(error => {
//   res.send("heet")
    res.redirect("/404")
app.get('/404', function(req, res, err) {
res.sendFile(path.join(__dirname + '/views/404.ejs'));
    res.render('404', { 
  error: error.error
  })
  console.log(error.error)
})
})
});

//This is no longer in use, just keeping it here for now tho.
app.use((err, req, res, next) => {
console.log(err.message);
  switch (err.message) {
    case 'NoCodeProvided':
      return res.status(400).send({
        status: 'ERROR',
        error: "We've looked far and wide but could not find the page you were looking for.",
        errorStatus: "400"
      });
    default:
      return res.status(500).send({
        status: 'ERROR',
        error: "Ouch, something went wrong. Please try again later.",
        errorCode: "500",
      });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////