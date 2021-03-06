const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();

});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.set('view_engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  var now = new Date().toString();
  var logMessage = `${now}: ${req.method} ${req.url}`;
  console.log(logMessage);
  fs.appendFile('server.log', logMessage + '\n');
  next();
});

/*app.use((req, res, next) => {
  res.render('maintenance.hbs');
});*/

app.get('/', (req, res) => {
  //res.send('<b>Hello</b> <i>Express</i>!');
  res.render('home.hbs', {
    pageTitle: 'Start page!',
    welcomeMessage: 'Hello User!'
  });
});
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page!'
  });
});
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
     pageTitle: 'Projects'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});

app.listen(port, () => {
  console.log(`Server up and running on port ${port}.`);
});
