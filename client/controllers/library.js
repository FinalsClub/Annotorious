if (Meteor.isClient) {

  Template.library.get_works = function() {
    var sortby = Session.get('library-sort'),
        sort_spec = ['title'],
        sort_add = null;

    if (sortby === 'annos') {
      sort_add = ['annotationsCount', 'desc'];
    } else if (sortby === 'author') {
      sort_add = 'author';
    } else if (sortby === 'year') {
      sort_add = ['year', 'desc'];
    }

    if (sort_add !== null) {
      sort_spec.unshift(sort_add)
    }

    return Works.find({}, {
      fields: {
        title: 1,
        author: 1,
        summary: 1,
        annotationsCount: 1,
        year: 1
      },
      sort: sort_spec
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
