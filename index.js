var page = require('page');
var makeRequest = require('basic-browser-request');
var renderer = require('./renderer');

var baseAPIURL = 'http://192.241.250.38:8080/';
// var baseAPIURL = 'http://localhost:8080/';

// For production:
// page.base('/namedlevels');

page('/', index);
page('/class/:base', getClass);
page({
  hashbang:true
});

function index() {
  console.log('Index!');
}

function getClass(ctx) {
  console.log('Class', ctx.params.base || '');
  makeRequest(
    {
      url: baseAPIURL + 'class/' + ctx.params.base,
      method: 'GET'
    },
    renderClass
  );
}

function renderClass(error, classProfile) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(classProfile);
    renderer.render(classProfile);
  }
}

