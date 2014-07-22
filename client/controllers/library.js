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

  var preorderDFSwork = function(work) {
    return preorderDFSsections(work.sections[0]);
  }

  var preorderDFSsections = function(section) {
    /* depth first search, pre-order, to find first content for the section  */
    var cid = section.content_id;
    if (cid === undefined) return preorderDFSsections(section.subSections[0]);
    else return cid;
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

  Template.work.events({
    'click': function(event) {
      /* load first content section for the selected work */
      var cid = preorderDFSwork(Works.findOne({_id: this._id}));
      Router.go('readingview', {_id: cid._str});
    },
  });

  Template.library.grid_classes = function() {
    if (Session.equals('library-mode', 'grid')) {
      return 'grid small-block-grid-1 medium-block-grid-2 large-block-grid-3'
    } else  {
      return '';
    }
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

}
