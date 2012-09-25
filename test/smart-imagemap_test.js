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
    equal(typeof(widget), 'object', 'widget instance is retrievable');
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
    equal(widget.state, widget.STATES.NOTREADY, 'is not ready for updates jet');
    stop();
    setTimeout(function() {
      start();
      ok(widget.orgWidth, 'original Image Width Set');
      ok(widget.orgHeight, 'original Image Height Set');
      equal(widget.state, widget.STATES.READY, 'is ready for updates');
    }, 1000);
  });

  test('image resizing', function() {
    var widget = $('#image1').smartImagemap().data('smartimagemap');
    stop();
    setTimeout(function() {
      start();
      $('#image1').attr({ 'width': $('#image1').width() / 2, 'height': $('#image1').height() / 2 });
      $('#image1').trigger('smartimagemap.update');
      stop();
      setTimeout(function() {
        start();
        var $area = widget.$areas.first();
        var meta = $area.data('smartimagemap.meta');
        equal($area.attr('coords'), '25,25,5', 'coords attribute has the correct value');
      }, 200);
    }, 500);

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
    deepEqual(widget.$areas.first().data('smartimagemap.meta'), {
      'initcoords': [{
       x: 50,
       y: 50
      }],
      'initcoordsstring': '50, 50 ,5',
      'radius': 5
    });
  });

}(jQuery));
