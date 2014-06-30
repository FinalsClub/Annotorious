function resize_side_panel() {
  /* fix for increasing side bar height */
  /* adapted from https://github.com/zurb/foundation/issues/3800 */
  $('.inner-wrap').css("min-height", $(window).height() + "px" );
}

if (Meteor.isClient) {

  /* set panel correctly on first load */
  /* http://stackoverflow.com/questions/11167390/template-onload-event-for-meteor-js */
  Template.top_and_side.rendered = function () {
    if(!this._rendered) {
      this._rendered = true;
      resize_side_panel();
    }
  };

  /* set panel correctly when window is resized */
  /* http://stackoverflow.com/a/19921036/1867779 */
  Template.top_and_side.created = function () {
    $(window).resize(function() {
      resize_side_panel();
    });
  };
  Template.top_and_side.destroyed = function () {
    $(window).off('resize');
  };

}
