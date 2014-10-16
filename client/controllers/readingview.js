Meteor.startup(function() {
  Session.setDefault('reading-view-panel', null);
  Session.setDefault('reading-view-panel-visible', false);
  Session.setDefault('reading-view-last-annotation', null);
});

/* This function is weird. Here's the question it essentially answers
 * depending on the argument:
 *
 * true: is this the current chapter?
 * false: does this chapter need a link? (i.e. does it have
 *          attached content and is NOT the current chapter)
 *
 * It turns out that these two questions are closely related, which is
 * why I can implement them both like this, but I have no idea what this
 * operation should be called. So I'm calling it "foobar". Don't judge me.
 */
function foobar(check) {
  return this.content_id && (Router.current().params._id === this.content_id.toHexString()) === check;
}

Template.sections.helpers({
  current_chapter: _.partial(foobar, true),
  chapter_link: _.partial(foobar, false)
});

Template.readingview.helpers({
  panel_visible: function() {
    return Session.get('reading-view-panel-visible');
  },
  get_panel_contents: function() {
    var panel = Session.get('reading-view-panel');
    if (panel === null) {
      return null;
    }

    return Template[panel];
  }
});

Template.annotation_list_panel.helpers({
  ordered_annotations: function() {
    var container = document.createElement('div');
    var root = document.createElement('div');
    root.appendChild(container);
    container.innerHTML = this.section.html;

    var SerializedRange = require('xpath-range').Range.SerializedRange;
    function get_start(doc) {
      return new SerializedRange(doc.annotation.ranges[0]).normalize(root).start;
    }

    var cursor = Annotations.find({ content_id: this.section._id });
    /* Setting cursor.sorter like this is not officially supported!
     * It is very possible that this will break at some point.
     * If possible, please replace with an official way of passing
     * a comparator to a cursor.
     */
    cursor.sorter = {
      getComparator: function() {
        return function(a, b) {
          var a_start = get_start(a), b_start = get_start(b);

          if (a_start === b_start) {
            return 0;
          }

          var compare = a_start.compareDocumentPosition(b_start);

          if (compare & Node.DOCUMENT_POSITION_PRECEDING) {
            return 1;
          } else if (compare & Node.DOCUMENT_POSITION_FOLLOWING) {
            return -1;
          } else {
            throw new Error('Neither preceding nor following???');
          }
        };
      }
    };

    return cursor;
  }
});

Template.annotation.events({
  'click .go-to': function(event) {
    $('#section-content').find('[data-annotation-id=' + this._id + ']')[0].scrollIntoView();
  },
});

Template.annotation.rendered = function() {
  var self = this;

  this.autorun(function() {
    if (!Session.equals('reading-view-last-annotation', self.data._id)) {
      return;
    }

    self.firstNode.scrollIntoView();
  });
};

Template.content.events({
  'click .annotator-hl': function(event) {
    Session.set('reading-view-panel', 'annotation_list_panel');
    Session.set('reading-view-panel-visible', true);

    var id = new Meteor.Collection.ObjectID($(event.currentTarget).data('annotation-id'));
    Session.set('reading-view-last-annotation', id);
  }
});

Template.content.helpers({
  next_section: function() {
    if (!this.work) {
      return;
    }

    var self = this, found = false;
    return iterate_content_ids(this.work.sections, function(id) {
      if (found) {
        return id;
      } else if (id.equals(self.section._id)) {
        found = true;
      }
    });
  }
});

Template.content.rendered = function() {
  var self = this;
  var store_config = {
    collection: Annotations,
    annotationPath: 'annotation',
    createDocument: function(annotation) {
      return {
        content_id: self.data.section._id,
        annotation: annotation
      };
    }
  };

  var Annotator = require('annotator');
  var MeteorStore = require('annotator-store-meteor');
  var Highlighter = require('annotator-plugin-highlighter');

  var factory = new Annotator.Factory();
  var elem = this.firstNode.parentNode;
  this.annotator = factory.setStore(MeteorStore, store_config)
                          .addPlugin(Highlighter, elem)
                          .getInstance();

  this.annotator.attach(elem);
  this.annotator.annotations.load({ content_id: this.data.section._id });
};

Template.content.destroyed = function() {
  this.annotator.destroy();
};
