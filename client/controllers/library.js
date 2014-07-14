if (Meteor.isClient) {

  Template.library.get_works = function() {
    /* TODO support {sort: [blah]} */
    return Works.find({}, {
      fields: {
        title: 1,
        author: 1,
        summary: 1,
        annotationsCount: 1,
        year: 1
      }
    });
  }

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
