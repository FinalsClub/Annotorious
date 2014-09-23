// TODO: use bundle's copy of jquery, other things?

function with_id(obj, id) {
  return _.extend({ id: id }, obj);
}

function get_prop(obj, path) {
  path = path.split('.');

  _.each(path, function(prop) {
    if (!(prop in obj)) {
      throw new Error('property ' + prop + ' not found');
    }

    obj = obj[prop];
  });

  return obj;
}

function MeteorStore(options) {
  this.collection = options.collection;
  this.annotationPath = options.annotationPath;
  this.createDocument = options.createDocument;

  this.handle = null;

  this.firesMutationEvents = true;
}

MeteorStore.prototype.configure = function(configs) {
  this.core = configs.core;
}

MeteorStore.prototype.create = function(annotation) {
  var dfd = $.Deferred();

  this.collection.insert(this.createDocument(annotation), function(error, id) {
    if (error) {
      dfd.reject('Failed to create object: ' + error);
    } else {
      dfd.resolve(with_id(annotation, id));
    }
  });

  return dfd.promise();
}

MeteorStore.prototype.update = function(annotation) {
  var dfd = $.Deferred();

  var set_obj = {};
  set_obj[this.annotationPath] = _.omit(annotation, 'id');

  this.collection.update(annotation.id, { $set: set_obj }, function(error, rows) {
    if (error) {
      dfd.reject('Failed to update singular object: ' + error);
    } else {
      dfd.resolve(annotation);
    }
  });

  return dfd.promise();
}

MeteorStore.prototype.delete = function(annotation) {
  var dfd = $.Deferred();

  this.collection.remove(annotation.id, function(error) {
    if (error) {
      dfd.reject('Failed to delete object: ' + error);
    } else {
      dfd.resolve(annotation);
    }
  });

  return dfd.promise();
}

MeteorStore.prototype.query = function(queryObj) {
  var self = this;

  var field_spec = {};
  field_spec[this.annotationPath] = 1;

  if (this.handle !== null) {
    this.handle.stop();
  }

  function trigger(event, doc) {
    var anno = with_id(get_prop(doc, self.annotationPath), doc._id);
    self.core.trigger(event, anno);
  }

  this.handle = this.collection.find(queryObj, { fields: field_spec }).observe({
    added: function(doc) {
      trigger('annotationCreated', doc);
    },
    changed: function(new_doc, old_doc) {
      trigger('annotationUpdated', new_doc);
    },
    removed: function(old) {
      trigger('annotationDeleted', old);
    }
  });

  // TODO: send initial results to the deferred instead of using annotationCreated?
  var dfd = $.Deferred();
  dfd.resolve([], {});
  return dfd.promise();
}

module.exports = MeteorStore
