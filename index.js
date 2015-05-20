var makeRequest = require('basic-browser-request');
var renderer = require('./renderer');
var createRouter = require('./router').create;
var notificationRenderer = require('./notification-renderer');
var d3 = require('./lib/d3-small');
var lookupForm = require('./lookup-form');
var _ = require('lodash');

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
  lookupForm.updateLookupInstructions(false);
}

function getClass(base) {
  lookupForm.updateLookupInstructions(true);
  setTimeout(showWaitingMessage, 250);

  makeRequest(
    {
      url: baseAPIURL + 'class/' + base,
      method: 'GET',
      timeLimit: 20 * 1000
    },
    renderClass
  );

  function showWaitingMessage() {
    if (d3.select('#class-page').classed('hidden')) {
      notificationRenderer.showMessage(
        'Furiously flipping around for the ' + _.capitalize(base) + ' page…'
      );
    }
  }
}

function renderClass(error, classProfile) {
  if (error) {
    console.log(error);
    notificationRenderer.renderError(error);
  }
  else {
    notificationRenderer.hideMessage();
    renderer.render(classProfile);
  }
}
