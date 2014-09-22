
SectionContents = new Meteor.Collection("sectionContents", {
  idGeneration: 'MONGO',
  schema: {
    work_id: {
      type: Meteor.Collection.ObjectID
    },
    html: {
      type: String
    }
  }
});

Annotations = new Meteor.Collection("annotations", {
  idGeneration: 'MONGO',
  schema: {
    content_id: {
      type: Meteor.Collection.ObjectID
    },
    annotation: {
      type: Object,
      blackbox: true
    }
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
  content_id: {
    type: Meteor.Collection.ObjectID,
    optional: true
  }
});

Works = new Meteor.Collection("works", {
  idGeneration: 'MONGO',
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
    annotationsCount: {
      type: Number,
      label: "Number of annotations",
      defaultValue: 0
    },
    sections: {
      type: [Section],
      optional: true
    }
  }
});
