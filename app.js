/* global d3 */

var makeRequest = require('basic-browser-request');
var renderer = require('./renderer');
var notificationRenderer = require('./notification-renderer');
var lookupForm = require('./lookup-form');
var _ = require('lodash');
var director = require('director');

var currentUrlClass;
var baseAPIURL = 'https://smidgeo.com/namedlevels-api/';
// var baseAPIURL = 'http://localhost:8080/';

var routes = {
  '/class/:base': getClass
};

var router = director.Router(routes);
router.notfound = getClass;
router.init();

lookupForm.setUp();

function getClass(base) {
  currentUrlClass = base;
  lookupForm.updateLookupInstructions(true);
  setTimeout(showWaitingMessage, 250);

  var apiURL = baseAPIURL + 'class/';
  if (currentUrlClass) {
    apiURL += currentUrlClass;
  }

  makeRequest(
    {
      url: apiURL,
      method: 'GET',
      timeLimit: 20 * 1000
    },
    updateWithClass
  );

  function showWaitingMessage() {
    if (d3.select('#class-page').classed('hidden')) {
      notificationRenderer.showMessage(
        'Furiously flipping around for the ' + _.capitalize(base) + ' page…'
      );
    }
  }
}

function updateWithClass(error, classProfile) {
  if (error) {
    console.log(error);
    notificationRenderer.renderError(error);
  } else {
    if (currentUrlClass !== classProfile.className.toLowerCase()) {
      currentUrlClass = classProfile.className.toLowerCase();
      syncURLToCurrentClass();
    }
    notificationRenderer.hideMessage();
    renderer.render(classProfile);
  }
}

function syncURLToCurrentClass() {
  if (currentUrlClass) {
    var newURL =
      location.protocol +
      '//' +
      location.host +
      location.pathname +
      '#/' +
      'class/' +
      currentUrlClass;

    window.history.pushState(null, null, newURL);
  }
}
