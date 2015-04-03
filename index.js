var makeRequest = require('basic-browser-request');
var renderer = require('./renderer');
var createRouter = require('./router').create;
var notificationRenderer = require('./notification-renderer');
var d3 = require('./lib/d3-small');
var lookupForm = require('./lookup-form');
var baseAPIURL = 'http://192.241.250.38:8080/';
// var baseAPIURL = 'http://localhost:8080/';

var router = createRouter({
  routes: {
    class: getClass,
    defaultResponder: index
  }
});

router.route();

lookupForm.setUp();

function index() {
  console.log('Index!');
}

function getClass(base) {
  makeRequest(
    {
      url: baseAPIURL + 'class/' + base,
      method: 'GET',
      timeLimit: 5 * 1000
    },
    renderClass
  );
}

function renderClass(error, classProfile) {
  if (error) {
    console.log(error);
    notificationRenderer.renderError(error);
  }
  else {
    notificationRenderer.hideNotification();
    console.log(classProfile);
    renderer.render(classProfile);
  }
}
