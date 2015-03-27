var makeRequest = require('basic-browser-request');
var renderer = require('./renderer');
var createRouter = require('./router').create;

var baseAPIURL = 'http://192.241.250.38:8080/';
// var baseAPIURL = 'http://localhost:8080/';

var router = createRouter({
  routes: {
    class: getClass,
    defaultResponder: index
  }
});

router.route();

function index() {
  console.log('Index!');
}

function getClass(base) {
  console.log('Class', base || '');
  makeRequest(
    {
      url: baseAPIURL + 'class/' + base,
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
