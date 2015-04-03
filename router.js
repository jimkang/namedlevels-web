function createRouter(opts) {
  var routes;

  if (opts) {
    routes = opts.routes;
  }

  function route(e) {
    var hashParts = location.hash.slice(2).split('/');
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

module.exports = {
  create: createRouter
};
