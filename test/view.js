(function() {

  // When testing alternative View implementations, change this varaible.
  var View = Backbone.View;

  var view;

  module("Backbone.View", {

    setup: function() {
      view = new View({
        id        : 'test-view',
        className : 'test-view',
        other     : 'non-special-option'
      });
    }

  });

  test("constructor", 3, function() {
    equal(view.el.id, 'test-view');
    equal(view.el.className, 'test-view');
    equal(view.el.other, void 0);
  });

  test("$", 2, function() {
    var view = new View;
    view.setElement('<p><a><b>test</b></a></p>');
    var result = view.$('a b');

    strictEqual(result[0].innerHTML, 'test');
    ok(result.length === +result.length);
  });

  test("_setEl", 2, function() {
    view._setEl('<div>', {id: 'test-div'});

    equal(view.el.tagName.toLowerCase(), 'div');
    equal(view.el.id, 'test-div');
  });

  test("initialize", 1, function() {
    var Test = View.extend({
      initialize: function() {
        this.one = 1;
      }
    });

    strictEqual(new Test().one, 1);
  });

  test("delegateEvents", 6, function() {
    var counter1 = 0, counter2 = 0;

    view = new View({el: '#testElement'});
    view.increment = function(){ counter1++; };
    addEventListener.call(view.el, 'click', function(){ counter2++; });

    var events = {'click h1': 'increment'};

    view.delegateEvents(events);
    click(view.$('h1')[0]);
    equal(counter1, 1);
    equal(counter2, 1);

    click(view.$('h1')[0]);
    equal(counter1, 2);
    equal(counter2, 2);

    view.delegateEvents(events);
    click(view.$('h1')[0]);
    equal(counter1, 3);
    equal(counter2, 3);
  });

  test("delegate", 2, function() {
    var counter1 = 0, counter2 = 0;

    view = new View({el: '#testElement'});
    view.increment = function(){ counter1++; };
    view.delegate('click', function(){ counter2++; });

    view.delegate('click', 'h1', view.increment);
    view.delegate('click', view.increment);

    click(view.$('h1')[0]);
    equal(counter1, 2);
    equal(counter2, 1);
  });

  test("delegateEvents allows functions for callbacks", 3, function() {
    view = new View({el: '<p></p>'});
    view.counter = 0;

    var events = {
      click: function() {
        this.counter++;
      }
    };

    document.body.appendChild(view.el);

    view.delegateEvents(events);
    click(view.el);
    equal(view.counter, 1);

    click(view.el);
    equal(view.counter, 2);

    view.delegateEvents(events);
    click(view.el);
    equal(view.counter, 3);

    document.body.removeChild(view.el);
  });


  test("delegateEvents ignore undefined methods", 0, function() {
    view = new View({el: '<p></p>'});

    document.body.appendChild(view.el);

    view.delegateEvents({'click': 'undefinedMethod'});
    click(view.el);

    document.body.removeChild(view.el);
  });

  test("undelegateEvents", 6, function() {
    var counter1 = 0, counter2 = 0;

    view = new View({el: '#testElement'});
    view.increment = function(){ counter1++; };
    addEventListener.call(view.el, 'click', function(){ counter2++; });

    var events = {'click h1': 'increment'};

    view.delegateEvents(events);
    click(view.$('h1')[0]);
    equal(counter1, 1);
    equal(counter2, 1);

    view.undelegateEvents();
    click(view.$('h1')[0]);
    equal(counter1, 1);
    equal(counter2, 2);

    view.delegateEvents(events);
    click(view.$('h1')[0]);
    equal(counter1, 2);
    equal(counter2, 3);
  });

  test("_ensureElement with DOM node el", 1, function() {
    var Test = View.extend({
      el: document.body
    });

    equal(new Test().el, document.body);
  });

  test("_ensureElement with string el", 3, function() {
    var Test = View.extend({
      el: "body"
    });
    strictEqual(new Test().el, document.body);

    Test = View.extend({
      el: "#testElement > h1"
    });
    var h1 = _.filter(document.getElementById('testElement').childNodes, function(node) {
      return node.nodeType == 1;
    })[0];
    strictEqual(new Test().el, h1);

    Test = View.extend({
      el: "#nonexistent"
    });
    ok(!new Test().el);
  });

  test("with className and id functions", 2, function() {
    var Test = View.extend({
      className: function() {
        return 'className';
      },
      id: function() {
        return 'id';
      }
    });

    strictEqual(new Test().el.className, 'className');
    strictEqual(new Test().el.id, 'id');
  });

  test("with attributes", 2, function() {
    var Test = View.extend({
      attributes: {
        id: 'id',
        'class': 'class'
      }
    });

    strictEqual(new Test().el.className, 'class');
    strictEqual(new Test().el.id, 'id');
  });

  test("with attributes as a function", 1, function() {
    var Test = View.extend({
      attributes: function() {
        return {'class': 'dynamic'};
      }
    });

    strictEqual(new Test().el.className, 'dynamic');
  });

  test("multiple views per element", 3, function() {
    var count = 0;
    var el = document.createElement('p');

    var Test = View.extend({
      el: el,
      events: {
        click: function() {
          count++;
        }
      }
    });

    document.body.appendChild(el);

    var view1 = new Test;
    click(el);
    equal(1, count);

    var view2 = new Test;
    click(el);
    equal(3, count);

    view1.delegateEvents();
    click(el);
    equal(5, count);

    document.body.removeChild(el);
  });

  if (typeof Backbone.$ != 'undefined') {
    test("custom events, with namespaces", 2, function() {
      var count = 0;

      var Test = View.extend({
        el: $('body'),
        events: function() {
          return {"fake$event.namespaced": "run"};
        },
        run: function() {
          count++;
        }
      });

      var view = new Test;
      $('body').trigger('fake$event').trigger('fake$event');
      equal(count, 2);

      $('body').off('.namespaced');
      $('body').trigger('fake$event');
      equal(count, 2);

    });
  }

  test("#1048 - setElement uses provided object.", 2, function() {
    var el = document.body;

    view = new View({el: el});
    ok(view.el === el);

    view.setElement(el = document.body);
    ok(view.el === el);
  });

  test("#986 - Undelegate before changing element.", 1, function() {
    var button1 = document.createElement('button');
    var button2 = document.createElement('button');

    document.body.appendChild(button1);
    document.body.appendChild(button2);

    var Test = View.extend({
      events: {
        click: function(e) {
          ok(view.el === e.target || e.srcElement);
        }
      }
    });

    var view = new Test({el: button1});
    view.setElement(button2);

    click(button1);
    click(button2);

    document.body.removeChild(button1);
    document.body.removeChild(button2);
  });

  test("#1172 - Clone attributes object", 2, function() {
    var Test = View.extend({
      attributes: {foo: 'bar'}
    });

    var view1 = new Test({id: 'foo'});
    strictEqual(view1.el.id, 'foo');

    var view2 = new Test();
    ok(!view2.el.id);
  });

  test("#1228 - tagName can be provided as a function", 1, function() {
    var Test = View.extend({
      tagName: function() {
        return 'p';
      }
    });

    ok(new Test().el.tagName.toLowerCase() == 'p');
  });

  test("views stopListening", 0, function() {
    var Test = View.extend({
      initialize: function() {
        this.listenTo(this.model, 'all x', function(){ ok(false); });
        this.listenTo(this.collection, 'all x', function(){ ok(false); });
      }
    });

    var view = new Test({
      model: new Backbone.Model,
      collection: new Backbone.Collection
    });

    view.stopListening();
    view.model.trigger('x');
    view.collection.trigger('x');
  });

  test("Provide function for el.", 2, function() {
    var Test = View.extend({
      el: function() {
        return "<p><a></a></p>";
      }
    });

    var view = new Test;
    ok(view.el.tagName.toLowerCase() == 'p');
    ok(view.$('a').length != 0);
  });

  test("events passed in options", 1, function() {
    var counter = 0;

    var Test = View.extend({
      el: '#testElement',
      increment: function() {
        counter++;
      }
    });

    var view = new Test({
      events: {
        'click h1': 'increment'
      }
    });

    click(view.$('h1')[0]);
    click(view.$('h1')[0]);
    equal(counter, 2);
  });

  test("remove", 2, function() {
    document.body.appendChild(view.el);

    addEventListener.call(view.el, 'click', function() { ok(true); });
    view.delegate('click', function() { ok(false); });
    view.listenTo(view, 'all x', function() { ok(false); });

    view.remove();

    notEqual(view.el.parentNode, document.body);

    click(view.el);
    view.trigger('x');
  });

  test("_removeElement", 1, function() {
    document.body.appendChild(view.el);
    view._removeElement();
    notEqual(view.el.parentNode, document.body);
  });

  // Cross-browser helpers
  var addEventListener =
    typeof Element != 'undefined' && Element.prototype.addEventListener || function(eventName, listener) {
      return this.attachEvent('on' + eventName, listener);
    };

  function click(element) {
    var event;
    if (document.createEvent) {
      event = document.createEvent('MouseEvent');
      var args = [
        'click', true, true,
        // IE 10+ and Firefox require these
        event.view, event.detail, event.screenX, event.screenY, event.clientX,
        event.clientY, event.ctrlKey, event.altKey, event.shiftKey,
        event.metaKey, event.button, event.relatedTarget
      ];
      (event.initMouseEvent || event.initEvent).apply(event, args);
    } else {
      event = document.createEventObject();
      event.type = 'click';
      event.bubbles = true;
      event.cancelable = true;
    }

    if (element.dispatchEvent) {
      return element.dispatchEvent(event);
    }
    element.fireEvent('onclick', event);
  }

})();
