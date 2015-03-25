var page = require('page');
var makeRequest = require('basic-browser-request');

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
    var root = d3.select('#root');
    root.append('div').text(classProfile.className);
    root.append('div').text(classProfile.hitDie + '-sided Dice for Accumulated Hit Points');
    var levelRoot = root.append('div').attr('id', 'levelRoot');
    var levelNames = levelRoot.selectAll('.level-name')
      .data(classProfile.levelNames);
    levelNames.enter().append('div').classed('level-name', true);
    levelNames.text(function theData(d) { return d; });
  }
}
