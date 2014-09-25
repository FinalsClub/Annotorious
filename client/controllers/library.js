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
  },
  'click #library-mode-toggle': function(event) {
    if (Session.equals('library-mode', 'grid')) {
      Session.set('library-mode', 'list');
    } else {
      Session.set('library-mode', 'grid');
    }
  },
});

function first_content_section_id(sections) {
  for (var i = 0; i < sections.length; i++) {
    var section = sections[i];

    if (section.content_id) {
      return section.content_id;
    }

    if (section.subSections) {
      var result = first_content_section_id(section.subSections);
      if (result) {
        return result;
      }
    }
  }
}

Template.work.events({
  'click': function(event) {
    /* load first content section for the selected work */
    var cid = first_content_section_id(Works.findOne(this._id).sections);
    Router.go('readingview', {_id: cid.toHexString()});
  },
});

Template.library.grid_classes = function() {
  if (Session.equals('library-mode', 'grid')) {
    return 'grid small-block-grid-1 medium-block-grid-2 large-block-grid-3'
  } else  {
    return '';
  }
}

Template.library.rendered = function() {
  // bah
  $(document).foundation();
}

Template.work.my_item_mark = function() {
  if (Meteor.userId() === null) return "hide";
  return "fa fa-star-o"
}

Template.work.published = function() {
  if (this.year !== null) {
    return ', ' + this.year.toString();
  } else {
    return '';
  }
}
