if (Meteor.isClient) {

  Template.readingview.get_section_content = function(_id) {
    var id = new Meteor.Collection.ObjectID(_id);
    return SectionContents.findOne({_id: id}).html;
  }

}
