TopAndSideController = RouteController.extend({
  layoutTemplate: 'top_and_side'
});

Router.map(function() {
  // Read paths from a JSON configuration file.
  // Formatted as { '/path': 'template', ... }
  // This seems nicer in a config file than hard coding it here.
  // Pull this from routes.js
  var welcome_routes = {
    welcome_blurb: "/welcome",
    login: "/login",
    register: "/register"
  };

  this.route('root', {
    path: '/',
    action: function() {
      Router.go('welcome_blurb');
    }
  });

  this.route('library', {
    path: '/library',
    controller: TopAndSideController,
    waitOn: function() {
      return Meteor.subscribe('works');
    }
  });

  this.route('readingview', {
    path: '/view/:_id',
    controller: TopAndSideController,
    waitOn: function() {
      var id = new Meteor.Collection.ObjectID(this.params._id);

      return Meteor.subscribe('sectionview', id);
    },
    data: function() {
      var id = new Meteor.Collection.ObjectID(this.params._id);
      var work_id = SectionContents.findOne(id).work_id;
      return Works.findOne(work_id).sections;
    }
  });

  this.route('about', {
    path: '/about',
    controller: TopAndSideController
  });

  var self = this;
  _.chain(welcome_routes).keys().each(function(name) {
    self.route(name, {
      path: welcome_routes[name],
      layoutTemplate: 'welcome'
    });
  });
});
