Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.publish('works', function() {
  return Works.find();
});

Meteor.publish('sectionview', function(content_id) {
  var content = SectionContents.find(content_id),
      annotations = Annotations.find({ content_id: content_id }),
      work = Works.find(content.fetch()[0].work_id);

  return [content, annotations, work];
});
