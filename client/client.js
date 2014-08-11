if (Meteor.isClient) {

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
    var current = Router.current();
    return current && current.route && current.route.name === 'readingview';
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
