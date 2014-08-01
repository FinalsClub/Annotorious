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

  var top_and_side_routes = {
    about: "/about"
  };

  this.route('root', {
    path: '/',
    action: function() {
      Router.go('welcome_blurb');
    }
  });

  this.route('library', {
    path: '/library',
    layoutTemplate: 'top_and_side',
    waitOn: function() {
      return Meteor.subscribe('works');
    }
  });

  this.route('readingview', {
    path: '/view/:_id',
    layoutTemplate: 'top_and_side',
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

  var self = this;
  _.chain(welcome_routes).keys().each(function(name) {
    self.route(name, {
      path: welcome_routes[name],
      layoutTemplate: 'welcome'
    });
  });

  _.chain(top_and_side_routes).keys().each(function(name) {
    self.route(name, {
      path: top_and_side_routes[name],
      layoutTemplate: 'top_and_side'
    });
  });
});
