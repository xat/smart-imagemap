/*
 * smart-imagemap
 * https://github.com/xat/smart-imagemap
 *
 * Copyright (c) 2012 Simon Kusterer
 * Licensed under the MIT license.
 */

(function($) {

  var Widget = function($image) {
    this.$image = $image;
    this.image = $image.get(0);
    this.STATES = { READY: 0, NOTREADY: 1};
    this.state = this.STATES.NOTREADY;

    if (!this.prepareMap()) {
      return;
    }
    if (!this.prepareAreas()) {
      return;
    }

    this.prepareDimensions();
    this.$image.on('smartimagemap.update', $.proxy(this.update, this));
  };

  // retrieve the original dimensions of the image
  // and attach the to the widget object
  Widget.prototype.prepareDimensions = function() {
    var self = this;
    $('<img/>').load(function() {
      var el = $(this).get(0);
      self.orgWidth = el.width;
      self.orgHeight = el.height;
      self.state = self.STATES.READY;
      self.update();
    }).attr('src', this.$image.attr('src'));
  };

  // update coords on resize
  Widget.prototype.update = function() {
    if (this.state !== this.STATES.READY) {
      return;
    }

    var xRatio = this.$image.width() / this.orgWidth;
    var yRatio = this.$image.height() / this.orgHeight;

    if (xRatio === 1 && yRatio === 1) {
      // nothing changed
      return;
    }

    this.$areas.each(function() {
      var $area = $(this);
      var tmpCoords = '';
      var meta = $area.data('smartimagemap.meta');
      $.each(meta.initcoords, function(idx, val) {
        if (idx !== 0) {
          tmpCoords = tmpCoords.concat(',');
        }
        tmpCoords = tmpCoords.concat((val.x*xRatio).toString(), ',', (val.y*yRatio).toString());
      });
      if (typeof(meta.radius) !== 'undefined') {
        tmpCoords = tmpCoords.concat(',', meta.radius.toString());
      }
      $area.attr('coords', tmpCoords);
    });
  };

  // prepare the areas of the imagemap
  Widget.prototype.prepareAreas = function() {
    this.$areas = this.$map.find('area').filter('[shape!="default"]');
    this.$areas.each(function() {
      var $area = $(this);
      var coords = $area.attr('coords').split(',');
      var coordsObj = [];

      if (coords.length === 0) {
        return 0;
      }

      $.each(coords, function(idx, val) {
        val = val.trim();
        if (idx%2) {
          coordsObj.push({
            x: parseFloat(coords[idx-1]),
            y: parseFloat(val)
          });
        }
      });

      var meta = {
        initcoords: coordsObj,
        initcoordsstring: $area.attr('coords')
      };

      if ($area.attr('shape') === 'circle') {
        meta.radius = parseFloat(coords[coords.length-1]);
      }

      $area.data('smartimagemap.meta', meta);
    });

    return this.$areas.length;
  };

  // prepare the map
  // returns false if there is no map
  Widget.prototype.prepareMap = function() {
    var mapVal = this.$image.attr('usemap');
    if (typeof(mapVal) !== 'string') {
      return false;
    }
    if (mapVal.length <= 2) {
      return false;
    }
    if (mapVal.substr(0, 1) !== '#') {
      return false;
    }
    var mapName = mapVal.substr(1);
    this.$map = $('map[name="'+mapName+'"]');
    return this.$map.length > 0;
  };

  $.fn.smartImagemap = function() {
    return this.each(function() {
      $(this).data('smartimagemap', new Widget($(this)));
    });
  };

}(jQuery));