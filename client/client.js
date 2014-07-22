if (Meteor.isClient) {

  /*
   HOME TEMPLATE
   */

  /* render different menu template for logged in or out */
  Template.top_and_side.which_menu = function() {
    if (Meteor.userId() === null) {
      /* user is logged out, so change to log in */
      return Template['signed_out_menu'];
    } else {
      /* user is logged in, so change to log out */
      return Template['signed_in_menu'];
    }
  }

  /* conditionally show the reading menu on the reading view page */
  Template.readingmenu.show_reading_menu = function () {
    var current = Router.current();
    return current && current.route && current.route.name === 'readingview';
  }

}
