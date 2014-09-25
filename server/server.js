Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.publish('library', function() {
  return Works.find({}, { sections: 0, introEssay: 0 });
});

Meteor.publish('sectionview', function(content_id) {
  var content = SectionContents.find(content_id),
      annotations = Annotations.find({ content_id: content_id }),
      work = Works.find(content.fetch()[0].work_id);

  return [content, annotations, work];
});
