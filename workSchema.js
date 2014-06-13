WorkSchema = new Meteor.Collection("works", {
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
      type: [Sections],
      optional: true
    }
  }
});

Sections = new SimpleSchema({
  name: {
    type: String,
    label: "Section name"
  },
  order: {
    type: Number // TODO: somehow give this an autoValue to append to the section list
  },
  content: {
    type: SectionContent,
    optional: true
  }
});


SectionContent = new Meteor.Collection("sectionContent", {
  schema: {
    html: {
      type: String
    },
    annotations: {
      type: [Annotations],
      optional: true
    }
  }
});

