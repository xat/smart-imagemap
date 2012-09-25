/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */


  test('plugin exists', function() {
    equal(typeof($.fn.smartImagemap), 'function', 'plugin exists');
  });

  test('chainable', function() {
    ok($('#image1').smartImagemap().addClass('testing'), 'can be chained');
    equal($('#image1').hasClass('testing'), true, 'class was added correctly from chaining');
  });

  test('widget instance', function() {
    var widget = $('#image1').smartImagemap().data('smartimagemap');
    equal(typeof(widget), 'function', 'widget instance is retrievable');
  });

  test('widget methods', function() {
    var widget = $('#image1').smartImagemap().data('smartimagemap');
    equal(typeof(widget.prepareDimensions), 'function', 'has attachDimensions function');
    equal(typeof(widget.update), 'function', 'has update function');
    equal(typeof(widget.prepareAreas), 'function', 'has prepareAreas function');
    equal(typeof(widget.prepareMap), 'function', 'has attachMap function');
  });

  test('image loading', function() {
    var widget = $('#image1').smartImagemap().data('smartimagemap');
    equal(widget.STATE, widget.STATES.NOTREADY, 'Not ready for updatesjet');
    stop();
    setTimeout(function() {
      start();
      ok(widget.orgWidth, 'Original Image Width Set');
      ok(widget.orgHeight, 'Original Image Height Set');
      equal(widget.STATE, widget.STATES.READY, 'Ready for updates');
    }, 1000);
  });

  test('image resizing', function() {
    var widget = $('#image1').smartImagemap().data('smartimagemap');
    stop();
    widget.$image.load(function() {
      start();
      $('#image1').attr({
        'width': $('#image1').width() / 2,
        'height': $('#image1').height() / 2
      });
      stop();
      setTimeout(function() {
        start();
        equal(widget.$areas[0].initcoords[0].x, 25, 'x coordinate should be 25');
        equal(widget.$areas[0].initcoords[0].y, 25, 'y coordinate should be 25');
        equal(widget.$areas[0].attr('coords'), '25,25,5', 'coords attribute has the correct value');
      }, 200);
    });
  });

  test('map', function() {
    var widget = $('#image1').smartImagemap().data('smartimagemap');
    ok(widget.prepareMap(), 'found the referenced imagemap');
    ok(widget.$map, 'cached $map exists');
  });

  test('areas', function() {
    var widget = $('#image1').smartImagemap().data('smartimagemap');
    equal(widget.prepareAreas(), 3, 'Areas are prepared');
    equal(widget.$areas.length, 3, 'Areas are prepared');
    equal(widget.$areas[0].data('smartimagemap.meta'), {
      'initcoords': [{
       x: 50,
       y: 50
      }],
      'initcoordsstring': '50,50,5',
      'radius': 5
    });
  });

}(jQuery));
