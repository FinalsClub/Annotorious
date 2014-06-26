if (Meteor.isClient) {

  /*
   WELCOME TEMPLATE
   */

  /*
   Welcome Header
   */
  Template.welcome_header.project = function () {
    /* TODO Pull this from description.js or the data store */
    var description = {
      'title': 'Annotorious'
    };
    return description.title;
  };

  Template.welcome_header.motto = function () {
    // Maybe this would be better in a JSON file somehow/somewhere?
    return "The best way to read and annotate the world's best books.";
  };

  /*
   Fills in the welcome screen middle section with a template specified
   in Session.welcome_which_page
   */
  Template.welcome.load_content = function () {
    var page = Session.get('welcome_which_page');
    if (page === undefined) {
      /* default to the blurb */
      page = 'welcome_blurb';
      Session.set('welcome_which_page', page);
    }
    if (Template.hasOwnProperty(page))
      return Template[page];
  };

  /*
   Responds to welcome screen events
   */
  Template.point_to_authenticate.events({
    'click #point_to_authenticate_log_in': function () {
      Session.set('welcome_which_page', 'authenticate');
    },
    'click #point_to_authenticate_create_account': function () {
      Session.set('welcome_which_page', 'new_user');
    }
  });

  /*
   Responds to welcome screen events
   */
  Template.anonymous_browse.events({
    'click #anonymous_browse_link': function () {
      Router.go('/library');
    }
  });

  /*
   Responds to login screen events
   */
  Template.authenticate.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

}
