if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish('works', function() {
    return Works.find();
  });

  Meteor.publish('sectioncontents', function() {
    return SectionContents.find();
  });
}
