Router.map(function() {
  // Read paths from a JSON configuration file.
  // Formatted as { '/path': 'template', ... }
  // This seems nicer in a config file than hard coding it here.
  // Pull this from routes.js
  var routes = {
    "/": "welcome",
    "/welcome": "welcome",
    "/about": "about",
    "/library": "library"
  };
  var paths = Object.keys(routes)
  for (var idx in paths) {
    var key = paths[idx]
    this.route(routes[key], {path: key});
  }
});
