Router.map(function() {
  // Read paths from a JSON configuration file.
  // Formatted as { '/path': 'template', ... }
  // This seems nicer in a config file than hard coding it here.
  // Pull this from routes.js
  var welcome_routes = {
    "/": "welcome_blurb",
    "/welcome": "welcome_blurb",
    "/login": "login",
    "/register": "register"
  };

  var top_and_side_routes = {
    "/about": "about",
    "/library": "library"
  };

  var paths = Object.keys(welcome_routes);
  for (var idx in paths) {
    var key = paths[idx];
    this.route(welcome_routes[key], {
        path: key,
        layoutTemplate: 'welcome'
    });
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
