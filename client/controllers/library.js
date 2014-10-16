Template.library.events({
  'click .sort-option': function(event) {
    Session.set('library-sort', this.sort);
  },
  'click #library-mode-toggle': function(event) {
    if (Session.equals('library-mode', 'grid')) {
      Session.set('library-mode', 'list');
    } else {
      Session.set('library-mode', 'grid');
    }
  },
});

Template.library.helpers({
  get_works: function() {
    Session.setDefault('library-sort', 'annos');

    return Works.find({}, {
      fields: {
        title: 1,
        author: 1,
        summary: 1,
        annotationsCount: 1,
        year: 1
      },
      sort: {
        title: ['title'],
        annos: [['annotationsCount', 'desc'], 'title'],
        author: ['author', 'title'],
        date: [['year', 'desc'], 'title']
      }[Session.get('library-sort')]
    });
  },
  grid_classes: function() {
    if (Session.equals('library-mode', 'grid')) {
      return 'grid small-block-grid-1 medium-block-grid-2 large-block-grid-3';
    } else  {
      return '';
    }
  }
});

Template.library.rendered = function() {
  // bah
  $(document).foundation();
};

Template.work.events({
  'click': function(event) {
    /* load first content section for the selected work */
    var cid = first_content_section_id(Works.findOne(this._id).sections);
    Router.go('readingview', {_id: cid.toHexString()});
  },
});

Template.work.helpers({
  my_item_mark: function() {
    if (Meteor.userId() === null) return "hide";
    return "fa fa-star-o";
  },
  published: function() {
    if (this.year !== null) {
      return ', ' + this.year.toString();
    } else {
      return '';
    }
  }
});
