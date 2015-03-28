function createRouter(opts) {
  var routes;
  var defaultResponder;

  if (opts) {
    routes = opts.routes;
    defaultResponder = opts.defaultResponder;
  }

  function route(e) {
    // if (e.state) {
    // }

    var hashParts = location.hash.slice(2).split('/');
    if (hashParts.length > 1) {
      var responder = routes[hashParts[0]];
      if (responder) {
        responder(hashParts[1]);
      }
      else if (defaultResponder) {
        defaultResponder(hashParts[1]);
      }
    }
  }

  window.onpopstate = route;

  return {
    route: route
  };
}

module.exports = {
  create: createRouter
};
