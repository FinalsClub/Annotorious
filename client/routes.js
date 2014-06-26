Router.map(function() {
  // Read paths from a JSON configuration file.
  // Formatted as { '/path': 'template', ... }
  // This seems nicer in a config file than hard coding it here.
  // Pull this from routes.js
  var straight_routes = {
    "/": "welcome",
    "/welcome": "welcome",
  };
  var top_and_side_routes = {
    "/about": "about",
    "/library": "library"
  };

  var paths = Object.keys(straight_routes);
  for (var idx in paths) {
    var key = paths[idx];
    this.route(straight_routes[key], {path: key});
  }

  var paths = Object.keys(top_and_side_routes);
  for (var idx in paths) {
    var key = paths[idx];
    this.route(top_and_side_routes[key], {
        path: key,
        layoutTemplate: 'top_and_side'
    });
  }
});
