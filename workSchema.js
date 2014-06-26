
SectionContents = new Meteor.Collection("sectionContents", {
  schema: {
    html: {
      type: String
    }
  }
});

Annotations = new Meteor.Collection("annotations", {
  content_id: {
    type: Meteor.Collection.ObjectId
  },
  annotation: {
    type: Object,
    blackbox: true
  }
})

Section = new SimpleSchema({
  name: {
    type: String,
    label: "Section name"
  },
  subSections: {
    type: [Object],
    label: "Subsections",
    custom: function() {
      if (this.value.length > 0 && this.field('content').isSet)
        return "sectionWithContent";

      _.each(this.value, function(section) {
        if (!Match.test(this.value, Section))
          return "invalidSection";
      })
    }
  },
  content: {
    type: Meteor.Collection.ObjectId,
    optional: true
  }
});

Works = new Meteor.Collection("works", {
  schema: {
    title: {
      type: String,
      label: "Title",
      max: 400
    },
    author: {
      type: String,
      label: "Author",
      max: 200
    },
    summary: {
      type: String,
      label: "Summary",
      max: 1000
    },
    year: {
      type: Number,
      label: "Year of publication"
    },
    pageViews: {
      type: Number,
      label: "Number of pageviews",
      defaultValue: 0
    },
    introEssay: {
      type: String,
      label: "Introductory essay",
      optional: true
    },
    createdAt: {
      type: Date,
      denyUpdate: true,
      autoValue: function(){
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date};
        } else {
          this.unset();
        }
      }
    },
    sections: {
      type: [Section],
      optional: true
    }
  }
});