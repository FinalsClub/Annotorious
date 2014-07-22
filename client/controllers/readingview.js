if (Meteor.isClient) {

  Template.readingview.get_section_content = function() {
    var id = new Meteor.Collection.ObjectID(Router.current().params._id);
    return SectionContents.findOne({_id: id});
  }

}
