if (Meteor.isClient) {

  Template.readingview.get_section_content = function() {
    var id = new Meteor.Collection.ObjectID(Router.current().params._id);
    var section = SectionContents.findOne({_id: id})
    console.log(section); /* shows "undefined" */
    var html = section.html;
    return SectionContents.findOne({_id: id}).html;
  }

}
