if (Meteor.isClient) {

  Template.library.get_works = function() {
    Session.setDefault('library-sort', ['title']);

    return Works.find({}, {
      fields: {
        title: 1,
        author: 1,
        summary: 1,
        annotationsCount: 1,
        year: 1
      },
      sort: Session.get('library-sort')
    });
  }

  Template.library.events({
    'click #sort-title': function(event) {
      Session.set('library-sort', ['title']);
    },
    'click #sort-annos': function(event) {
      Session.set('library-sort', [['annotationsCount','desc'], 'title']);
    },
    'click #sort-author': function(event) {
      Session.set('library-sort', ['author', 'title']);
    },
    'click #sort-date': function(event) {
      Session.set('library-sort', [['year','desc'], 'title']);
    }
  });

  Template.library.grid_classes = function() {
    if (Session.equals('library-mode', 'grid')) {
      return 'grid small-block-grid-1 medium-block-grid-2 large-block-grid-3'
    } else  {
      return '';
    }
  }

  Template.work.published = function() {
    if (this.year !== null) {
      return ', ' + this.year.toString();
    } else {
      return '';
    }
  }

}
