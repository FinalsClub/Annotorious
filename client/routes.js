Router.map(function() {
  // Read paths from a JSON configuration file.
  // Formatted as { '/path': 'template', ... }
  // This seems nicer in a config file than hard coding it here.
  // Pull this from routes.js
  var welcome_routes = {
    "/welcome": "welcome_blurb",
    "/login": "login",
    "/register": "register"
  };

  var top_and_side_routes = {
    "/about": "about",
    "/library": "library"
  };

  this.route('root', {
    path: '/',
    action: function() {
      Router.go('welcome_blurb');
    }
  });

  var self = this;
  _.chain(welcome_routes).keys().each(function(path) {
    self.route(welcome_routes[path], {
        path: path,
        layoutTemplate: 'welcome'
    });
  });

  _.chain(top_and_side_routes).keys().each(function(path) {
    self.route(top_and_side_routes[path], {
        path: path,
        layoutTemplate: 'top_and_side'
    });
  });
});
