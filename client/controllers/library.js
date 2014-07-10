if (Meteor.isClient) {

  var get_works = function() {
    var query_opts = {};
    var find_opts = { fields: { title: 1, author: 1, summary: 1 } };
    var work_array = Works.find(query_opts, find_opts).map(modify_works);
    /* have to switch to long form due to variable key */
    return work_array.sort(sort_works);
  }

  /* helper function for changing works returned */
  var modify_works = function(work, id, cursor) {
    /* TODO
    work.annotation_count = some_function(work.id);
     */
    return work;
  }

  /* helper function for sorting works */
  var sort_works = function(work1, work2) {
    Session.setDefault("library_sort_attr", "title");
    var attr = Session.get("library_sort_attr")
    /* test if both items in the list are the same */
    if (work1[attr] == work2[attr]) return 0;
    /* outsource sorting and figure out what it means */
    var outsource = [work1[attr], work2[attr]].sort()
    /* order maintained implies negative ordering */
    if (outsource[0] === work1[attr]) return -1;
    /* order not maintained implies positive ordering */
    return 1;
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
