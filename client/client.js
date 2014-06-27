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

}
