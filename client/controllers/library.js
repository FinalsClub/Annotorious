if (Meteor.isClient) {

  var get_works = function() {
    /* TODO support {sort: [blah]} */
    return Works.find({}, { fields: { title: 1, author: 1, summary: 1 } });
  }

  Template.library_list.get_works = get_works
  Template.library_grid.get_works = get_works

  Template.library.library = function() {
    if (Session.equals('library-mode', 'grid')) {
      return Template['library_grid'];
    } else  {
      return Template['library_list'];
    }
  }

}
