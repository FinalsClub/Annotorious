Meteor.startup(function() {
  Session.setDefault('reading-view-panel', null);
  Session.setDefault('reading-view-panel-visible', false);
});

Template.readingview.panel_visible = function() {
  return Session.get('reading-view-panel-visible');
}

Template.readingview.get_panel_contents = function() {
  var panel = Session.get('reading-view-panel');
  if (panel === null) {
    return null;
  }

  return Template[panel];
}
