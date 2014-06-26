if (Meteor.isClient) {

  /*
   ABOUT TEMPLATE
   */


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


  /*
   LIBRARY TEMPLATE
   */


  /*
   TOP PANEL TEMPLATE
   */

  Template.top_bar.events({
    'click [data-toggle=offcanvas]': function () {
      /*
       TODO: look into LESS to alias classes.
       http://www.miuaiga.com/index.cfm/2013/11/2/Dynamic-Bootstrap-Layout-on-any-markup-with-makecolumn-and-makerow-via-LESS
       e.g. in big mode, sidebar class would map to "col-xs-6 col-sm-3"
            which means content class maps to "col-xs-6 col-sm-9"
            in small mode, inactive, "sidebar" isn't there
            which means content class maps to "col-xs-12"
            in small mode, active, "sidebar" maps to "col-xs-6 col-sm-3"
            which means content class maps to "col-xs-6 col-sm-9"

       unsure how to tell big mode / small mode without a media check
       which is independent of bootstrap.

       it's impossible to effectively adjust columns?
       presently, the col-xs-6 and col-sm-9 on content cause undesireable
       wrapping behavior due to the hack used to pull the tray off the side.

       maybe best bet is to $.addClass and $.removeClass against the 
       sidebar and content divs right here, since this button is only
       available in small mode anyway. very ugly solution :(
       */
      $('.row-offcanvas').toggleClass('active');
    }
  });

  Template.top_bar.project = function () {
    /* TODO Pull this from description.js or the data store */
    var description = {
      'title': 'Annotorious'
    };
    return description.title;
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
