if (Meteor.isClient) {
  (window.set_title = function(page) {
    var title = Meteor.settings.public.project;
    if (page) {
      title += ' - ' + page;
    }

    document.title = title;
  })(null);

  UI.registerHelper('setting', function(prop) {
    return Meteor.settings.public[prop];
  });

  /*
   HOME TEMPLATE
   */

  Template.top_and_side.events({
    'click #menubutton': function () {
       $('#sidebar').toggleClass('open');
    },
    'click .show-panel-button': function() {
      set_panel(this.panel);
    }
  });

  Template.menu_item.currentRoute = function() {
    return this.current == this.route;
  }

  Template.reading_menu_item.currentPanel = function() {
    return Session.get('reading-view-panel-visible') &&
           Session.equals('reading-view-panel', this.panel);
  }

  /* conditionally show the reading menu on the reading view page */
  Template.top_and_side.show_reading_menu = function () {
    return this.current === 'readingview';
  }

  Template.top_and_side.about_text = function() {
    return 'About ' + Meteor.settings.public.project;
  }

  function set_panel(name) {
    if (Session.equals('reading-view-panel', name) &&
        Session.get('reading-view-panel-visible')) {
      Session.set('reading-view-panel-visible', false);
    } else {
      Session.set('reading-view-panel', name);
      Session.set('reading-view-panel-visible', true);
    }
  }

}
