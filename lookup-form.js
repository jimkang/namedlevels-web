var createStrokeRouter = require('strokerouter', d3.event);
var createSimpleScroll = require('simplescroll');
var sanitizeClassSegment = require('./sanitize-class-segment');

var simpleScroll = createSimpleScroll({
  d3: d3
});

function goToClass() {
  var nextClass = sanitizeClassSegment(d3.select('#lookup-class').node().value);
  if (nextClass) {
    location.hash = '/class/' + nextClass;
    simpleScroll.scrollTo(0, 500);
  }
}

function setUp() {
  d3.select('#go').on('click', goToClass);

  var lookupForm = d3.select('#lookup-class');
  var lookupEl = lookupForm.node();

  var formStrokeRouter = createStrokeRouter(lookupForm);
  formStrokeRouter.routeKeyUp('enter', null, goToClass);
  formStrokeRouter.routeKeyUp('escape', null, lookupEl.blur.bind(lookupEl));

  var docStrokeRouter = createStrokeRouter(d3.select(document));
  docStrokeRouter.routeKeyUp('l', null, focusOnLookupField);
}

function focusOnLookupField() {
  var el = d3.select('#lookup-class').node();
  simpleScroll.scrollToElement(el, 500);
  setTimeout(el.focus.bind(el), 500);
}

function updateLookupInstructions(classSpecified) {
  var message = '(L) Look up another character class:';
  if (!classSpecified) {
    message = '(L) Look up a character class:';
  }
  d3.select('#lookup-instructions').text(message);
}

module.exports = {
  setUp: setUp,
  updateLookupInstructions: updateLookupInstructions
};
