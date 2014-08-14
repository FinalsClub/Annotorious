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
    'click #show-table-of-contents': function() {
      set_panel('table_of_contents_panel');
    },
    'click #show-annotations': function() {
      set_panel('annotation_list_panel');
    },
    'click #show-type-menu': function() {
      set_panel('type_panel');
    }
  });

  /* conditionally show the reading menu on the reading view page */
  Template.top_and_side.show_reading_menu = function () {
    return this.current === 'readingview';
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
