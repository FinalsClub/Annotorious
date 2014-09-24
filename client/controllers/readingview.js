Meteor.startup(function() {
  Session.setDefault('reading-view-panel', null);
  Session.setDefault('reading-view-panel-visible', false);
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

Template.sections.current_chapter = _.partial(foobar, true);
Template.sections.chapter_link = _.partial(foobar, false);

Template.readingview.panel_visible = function() {
  return Session.get('reading-view-panel-visible');
}

Template.readingview.get_panel_contents = function() {
  var panel = Session.get('reading-view-panel');
  if (panel === null) {
    return null;
  }

  return Template[panel];
}

Template.content.rendered = function() {
  var self = this;
  var store_config = {
    collection: Annotations,
    annotationPath: 'annotation',
    createDocument: function(annotation) {
      return {
        content_id: self.data._id,
        annotation: annotation
      }
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
  this.annotator.annotations.load({ content_id: this.data._id });
}

Template.content.destroyed = function() {
  this.annotator.destroy();
}
