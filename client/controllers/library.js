if (Meteor.isClient) {

  var get_works = function() {
    /* TODO support {sort: [blah]} */
    return Works.find({}, { fields: { title: 1, author: 1, summary: 1 } });
  }

  Template.library_list.get_works = get_works
  Template.library_grid.get_works = get_works

  function re_equalize(node) {
    var eq = Foundation.libs.equalizer,
        elem = $(node).closest('[' + eq.attr_name() + ']');

    if (typeof elem.data(eq.attr_name(true) + '-init') !== 'undefined') {
      eq.equalize(elem);
    }
  }

  Template.library_grid.rendered = function() {
    $(document).foundation();
  }

  /* set equalizer on grid correctly after page loads */
  Template.work.rendered = function () {
    re_equalize(this.firstNode);
  };

  Template.library.library = function() {
    if (Session.equals('library-mode', 'grid')) {
      return Template['library_grid'];
    } else  {
      return Template['library_list'];
    }
  }

}
