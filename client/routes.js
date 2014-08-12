/* This controller provides beforeData and afterData hooks to
 * routes. The former is fired before waiting for data has
 * completed, while the latter is fired after. A plain data
 * hook is still available, and is fired if either of the
 * before or after hooks is missing. Any of these hooks can
 * be either objects or functions.
 */
EnhancedDataController = RouteController.extend({
  data: function() {
    var prop, options = this.route.options;
    if ('beforeData' in options && !this.ready()) {
      prop = 'beforeData';
    } else if ('afterData' in options && this.ready()) {
      prop = 'afterData';
    } else if ('data' in options) {
      prop = 'data'
    }

    var data = options[prop];
    if (typeof data === 'function') {
      data = data.call(this);
    }

    return data;
  }
});

TopAndSideController = EnhancedDataController.extend({
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
    afterData: function() {
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
