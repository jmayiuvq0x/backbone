$(document).ready(function() {

  module("Backbone.Model");

  // Variable to catch the last request.
  window.lastRequest = null;

  window.originalSync = Backbone.sync;

  // Stub out Backbone.request...
  Backbone.sync = function() {
    lastRequest = _.toArray(arguments);
  };

  var attrs = {
    id     : '1-the-tempest',
    title  : "The Tempest",
    author : "Bill Shakespeare",
    length : 123
  };

  var doc = new Backbone.Model(attrs);

  var klass = Backbone.Collection.extend({
    url : function() { return '/collection'; }
  });

  var collection = new klass();
  collection.add(doc);

  test("Model: initialize", function() {
    var Model = Backbone.Model.extend({
      initialize: function() {
        this.one = 1;
      }
    });
    var model = new Model;
    equals(model.one, 1);
  });

  test("Model: url", function() {
    equals(doc.url(), '/collection/1-the-tempest');
    doc.collection = null;
    var failed = false;
    try {
      doc.url();
    } catch (e) {
      failed = true;
    }
    equals(failed, true);
    doc.collection = collection;
  });

  test("Model: clone", function() {
    attrs = { 'foo': 1, 'bar': 2, 'baz': 3};
    a = new Backbone.Model(attrs);
    b = a.clone();
    equals(a.get('foo'), 1);
    equals(a.get('bar'), 2);
    equals(a.get('baz'), 3);
    equals(b.get('foo'), a.get('foo'), "Foo should be the same on the clone.");
    equals(b.get('bar'), a.get('bar'), "Bar should be the same on the clone.");
    equals(b.get('baz'), a.get('baz'), "Baz should be the same on the clone.");
    a.set({foo : 100});
    equals(a.get('foo'), 100);
    equals(b.get('foo'), 1, "Changing a parent attribute does not change the clone.");
  });

  test("Model: isNew", function() {
    attrs = { 'foo': 1, 'bar': 2, 'baz': 3};
    a = new Backbone.Model(attrs);
    ok(a.isNew(), "it should be new");
    attrs = { 'foo': 1, 'bar': 2, 'baz': 3, 'id': -5 };
    ok(a.isNew(), "any defined ID is legal, negative or positive");
  });

  test("Model: get", function() {
    equals(doc.get('title'), 'The Tempest');
    equals(doc.get('author'), 'Bill Shakespeare');
  });

  test("Model: set and unset", function() {
    attrs = { 'foo': 1, 'bar': 2, 'baz': 3};
    a = new Backbone.Model(attrs);
    var changeCount = 0;
    a.bind("change:foo", function() { changeCount += 1; });
    a.set({'foo': 2});
    ok(a.get('foo')== 2, "Foo should have changed.");
    ok(changeCount == 1, "Change count should have incremented.");
    a.set({'foo': 2}); // set with value that is not new shouldn't fire change event
    ok(a.get('foo')== 2, "Foo should NOT have changed, still 2");
    ok(changeCount == 1, "Change count should NOT have incremented.");

    a.unset('foo');
    ok(a.get('foo')== null, "Foo should have changed");
    ok(changeCount == 2, "Change count should have incremented for unset.");
  });

  test("Model: changed, hasChanged, changedAttributes, previous, previousAttributes", function() {
    var model = new Backbone.Model({name : "Tim", age : 10});
    model.bind('change', function() {
      ok(model.hasChanged('name'), 'name changed');
      ok(!model.hasChanged('age'), 'age did not');
      ok(_.isEqual(model.changedAttributes(), {name : 'Rob'}), 'changedAttributes returns the changed attrs');
      equals(model.previous('name'), 'Tim');
      ok(_.isEqual(model.previousAttributes(), {name : "Tim", age : 10}), 'previousAttributes is correct');
    });
    model.set({name : 'Rob'}, {silent : true});
    model.change();
    equals(model.get('name'), 'Rob');
  });

  test("Model: save", function() {
    doc.save({title : "Henry V"});
    equals(lastRequest[0], 'update');
    ok(_.isEqual(lastRequest[1], doc));
  });

  test("Model: fetch", function() {
    doc.fetch();
    ok(lastRequest[0], 'read');
    ok(_.isEqual(lastRequest[1], doc));
  });

  test("Model: destroy", function() {
    doc.destroy();
    equals(lastRequest[0], 'delete');
    ok(_.isEqual(lastRequest[1], doc));
  });

  test("Model: validate", function() {
    var lastError;
    var model = new Backbone.Model();
    model.validate = function(attrs) {
      if (attrs.admin) return "Can't change admin status.";
    };
    model.bind('error', function(model, error) {
      lastError = error;
    });
    var result = model.set({a: 100});
    equals(result, model);
    equals(model.get('a'), 100);
    equals(lastError, undefined);
    result = model.set({a: 200, admin: true});
    equals(result, false);
    equals(model.get('a'), 100);
    equals(lastError, "Can't change admin status.");
  });

  test("Model: validate with error callback", function() {
    var lastError, boundError;
    var model = new Backbone.Model();
    model.validate = function(attrs) {
      if (attrs.admin) return "Can't change admin status.";
    };
    var callback = function(model, error) {
      lastError = error;
    };
    model.bind('error', function(model, error) {
      boundError = true;
    });
    var result = model.set({a: 100}, {error: callback});
    equals(result, model);
    equals(model.get('a'), 100);
    equals(lastError, undefined);
    equals(boundError, undefined);
    result = model.set({a: 200, admin: true}, {error: callback});
    equals(result, false);
    equals(model.get('a'), 100);
    equals(lastError, "Can't change admin status.");
    equals(boundError, undefined);
  });

});
