if (Meteor.isClient) {

  Meteor.startup(function() {
    Session.setDefault('reading-view-panel', null);
    Session.setDefault('reading-view-panel-visible', false);
  });

  Template.readingview.get_section = function() {
    var id = new Meteor.Collection.ObjectID(Router.current().params._id);
    return SectionContents.findOne(id);
  }

  Template.readingview.get_panel_visible = function() {
    if (Session.get('reading-view-panel-visible')) {
      return 'show-panel';
    } else {
      return 'hide-panel';
    }
  }

  Template.readingview.get_panel_contents = function() {
    var panel = Session.get('reading-view-panel');
    if (panel === null) {
      return null;
    }

    return Template[panel];
  }

}