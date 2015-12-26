var probable = require('probable');

var randomEncounterTable = probable.createRangeTableFromDict({
  'basilisk': 3,
  'carrion crawler': 7,
  'adventurer': 6,
  'erinyes': 1,
  'djinni': 2,
  'dragon': 2,
  'green slime': 4,
  'hydra, 8-9 heads': 3,
  'jackalwere': 4,
  'lammasu': 4,
  'werebear': 2,
  'weretiger': 3,
  'manticore': 9,
  'medusa': 5,
  'mold, brown': 1,
  'mold, yellow': 2,
  'ogre magi': 2,
  'otyugh': 8,
  'rakshasa': 2,
  'salamander': 2,
  'phase spider': 4,
  'troll': 11, 
  'wight': 5,
  'wind walker': 2,
  'wraith': 3,
  'wyvern': 1
});

function renderError(error) {
  var message = "Doh, something went wrong. Maybe go grab a Mountain Dew and come back in a bit.";
  if (error.message === 'Timed out') {
    message = 'Our server is not responding to us. ' + 
      'Probably being attacked by a ' + 
      randomEncounterTable.roll() + ' again. ' +
      'Try again in a few moments!'
  }

  showMessage(message);
}

function showMessage(message) {
  d3.select('#message-box')
    .text(message)
    .classed({
      'non-existent': false,
      hidden: false,
      existent: true,
      revealed: true
    });
}

function hideMessage() {
  d3.select('#message-box')
    .classed({
      'non-existent': true,
      hidden: true,
      existent: false,
      revealed: false
    });  
}

module.exports = {
  renderError: renderError,
  hideMessage: hideMessage,
  showMessage: showMessage
};
