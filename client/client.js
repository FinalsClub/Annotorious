(set_title = function(page) {
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

function set_panel(name) {
  if (Session.equals('reading-view-panel', name) &&
      Session.get('reading-view-panel-visible')) {
    Session.set('reading-view-panel-visible', false);
  } else {
    Session.set('reading-view-panel', name);
    Session.set('reading-view-panel-visible', true);
  }
}

Template.top_and_side.events({
  'click #menubutton': function () {
     $('#hamburger-sidebar').toggleClass('open');
  },
  'click .show-panel-button': function() {
    set_panel(this.panel);
  },
  'click #log-out-button': function() {
    Meteor.logout(function(err) {
      if (err) {
        alert('Failed to log out: ' + err.reason);
      }
    });
  }
});

Template.top_and_side.helpers({
  /* conditionally show the reading menu on the reading view page */
  show_reading_menu: function () {
    return this.current === 'readingview';
  },
  about_text: function() {
    return 'About ' + Meteor.settings.public.project;
  }
});

Template.menu_item.helpers({
  currentRoute: function() {
    return this.current == this.route;
  }
});

Template.reading_menu_item.helpers({
  currentPanel: function() {
    return Session.get('reading-view-panel-visible') &&
           Session.equals('reading-view-panel', this.panel);
  }
});
