if (Meteor.isClient) {

  /*
   Some project configuration settings for flexibility.
   */
  Template.homepage_header.project = function () {
    /* Pull this from the document title */
    return $('head').context.title;
  };

  Template.homepage_header.motto = function () {
    // Maybe this would be better in a JSON file somehow/somewhere?
    return "The best way to read and annotate the world's best books.";
  };


  // TODO DRY the copy pasted load_content functions
  // TODO replace body routing with Iron-Router

  /*
   Fills in the body with a template specified in Session.body_page
   */
  Template.body.load_content = function () {
    var page = Session.get('body_page');
    if (page === undefined) {
      /* default to the homepage */
      page = 'homepage';
      Session.set('body_page', page);
    }
    if (Template.hasOwnProperty(page))
      return Template[page];
  };

  /*
   Fills in the welcome screen middle section with a template specified
   in Session.homepage_which_page
   */
  Template.homepage.load_content = function () {
    var page = Session.get('homepage_which_page');
    if (page === undefined) {
      /* default to the blurb */
      page = 'homepage_blurb';
      Session.set('homepage_which_page', page);
    }
    if (Template.hasOwnProperty(page))
      return Template[page];
  };

  /*
   Responds to welcome screen events
   */
  Template.point_to_authenticate.events({
    'click #point_to_authenticate_log_in': function () {
      Session.set('homepage_which_page', 'authenticate');
    },
    'click #point_to_authenticate_create_account': function () {
      Session.set('homepage_which_page', 'new_user');
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

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
