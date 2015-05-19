var _ = require('lodash');

function createRouter(opts) {
  var routes;

  if (opts) {
    routes = opts.routes;
  }

  function route(e) {
    var hash = getHash(window);
    var hashParts = _.compact(hash.split('/'));
    if (hashParts.length > 1) {
      var responder = routes[hashParts[0]];
      if (responder) {
        responder(hashParts[1]);
      }
      else if (routes.defaultResponder) {
        routes.defaultResponder(hashParts[1]);
      }
    }
    else if (routes.defaultResponder) {
      routes.defaultResponder();
    }
  }

  window.onpopstate = route;

  return {
    route: route
  };
}

// From Backbone router:
function getHash(window) {
  var match = window.location.href.match(/#(.*)$/);
  return match ? match[1] : '';
}

module.exports = {
  create: createRouter
};
