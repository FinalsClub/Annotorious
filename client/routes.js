Router.onBeforeAction(function() {
  if (!Session.equals('resetPassword', null) && this.route.name !== 'reset') {
    this.redirect('reset', null, { replaceState: true });
  }

  if ('title' in this.route.options) {
    set_title(this.route.options.title);
  }
});

/* This controller provides the following features to routes:
 * 1. beforeData and afterData hooks. The former is fired before
 *    waiting for data has completed, while the latter is fired
 *    after. A plain data hook is still available, and is fired
 *    if either of the before or after hooks is missing. Any of
 *    these hooks can be either objects or functions.
 * 2. Sets a "current" property in the data object specifying
 *    the name of the current route.
 * 3. UI title handling.
 *    a. If a "title" property is set in a data object by a
 *       route, the window title will be set to that.
 *    b. If no "title" property is set in a data object
 *       and a title property is set in the route, the value
 *       will be copied to the data object so that it becomes
 *       available to templates. This can be used with the
 *       onBeforeAction hook above.
 */
EnhancedDataController = RouteController.extend({
  data: function() {
    var prop, options = this.route.options;
    if ('beforeData' in options && !this.ready()) {
      prop = 'beforeData';
    } else if ('afterData' in options && this.ready()) {
      prop = 'afterData';
    } else if ('data' in options) {
      prop = 'data';
    }

    var data = options[prop];
    if (typeof data === 'function') {
      data = data.call(this);
    } else {
      data = _.clone(data);
    }

    if (typeof data === 'undefined') {
      data = {};
    }

    /* This try/catch is for the off-chance that
     * the data value is something that does not
     * have properties (null, true, false, etc).
     */
    try {
      if ('title' in data) {
        /* If a new title was set in the data object,
         * use that title.
         */
        set_title(data.title);
      } else if ('title' in this.route.options) {
        /* If no title was set in the data object,
         * and one was set in the route, add this
         * title to the data object so that it will
         * be available to add to the top bar. We do
         * not need to call set_title here because
         * the onBeforeAction hook above will already
         * have been called.
         */
        data.title = this.route.options.title;
      }

      data.current = this.route.name;
    } catch(e) {}

    return data;
  }
});

TopAndSideController = EnhancedDataController.extend({
  layoutTemplate: 'top_and_side'
});

// Read paths from a JSON configuration file.
// Formatted as { '/path': 'template', ... }
// This seems nicer in a config file than hard coding it here.
// Pull this from routes.js
var welcome_routes = {
  welcome_blurb: {
    path: "/welcome",
    title: 'Welcome'
  },
  login: {
    path: "/login",
    title: 'Login',
  },
  register: {
    path: "/register",
    title: 'Register'
  },
  reset: {
    path: "/reset",
    title: "Reset Password"
  }
};

Router.route('root', {
  path: '/',
  action: function() {
    Router.go('welcome_blurb');
  }
});

Router.route('library', {
  path: '/library',
  controller: TopAndSideController,
  waitOn: function() {
    return Meteor.subscribe('library');
  },
  title: 'Library'
});

Router.route('readingview', {
  path: '/view/:_id',
  controller: TopAndSideController,
  waitOn: function() {
    var id = new Meteor.Collection.ObjectID(this.params._id);

    return Meteor.subscribe('sectionview', id);
  },
  afterData: function() {
    var id = new Meteor.Collection.ObjectID(this.params._id);
    var section = SectionContents.findOne(id);
    var work = Works.findOne(section.work_id);
    return {
      section: section,
      work: work,
      title: work.title
    };
  }
});

Router.route('myitems', {
  path: '/myitems',
  controller: TopAndSideController,
  title: 'My Items'
});

Router.route('settings', {
  path: '/settings',
  controller: TopAndSideController,
  title: 'Settings'
});

Router.route('about', {
  path: '/about',
  controller: TopAndSideController,
  title: 'About'
});

_.each(welcome_routes, function(obj, name) {
  obj.layoutTemplate = 'welcome';
  Router.route(name, obj);
});
