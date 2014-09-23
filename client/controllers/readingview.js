Meteor.startup(function() {
  Session.setDefault('reading-view-panel', null);
  Session.setDefault('reading-view-panel-visible', false);
});

Template.sections.chapter_link = function() {
  return this.content_id && Router.current().params._id !== this.content_id.toHexString();
}

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
