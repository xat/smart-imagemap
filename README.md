# Smart Imagemap

Recalculate Imagemap coordinates on image resize

## Getting Started

This jQuery plugin recalculates Imagemap coordinates based on the scale of the image.
You can use it for example, if you have a scaled fullscreen image and want the your imagemap
coordinates always appear over the same spot on the image.

In your web page:

```html
<script>
$('#sampleimage').smartImagemap();
</script>

<img id="sampleimage" src="sample.jpg" usemap="#samplemap" />

<map name="samplemap">
    <area shape="circle" coords="50,50,5" href="" alt="">
    <area shape="default" coords="" href="" alt="">
    <area shape="poly" coords="10,10,10,50,50,50" href="" alt="">
    <area shape="rect" coords="10,10,50,50" href="" alt="">
</map>
```

Since there is no resize event for images within JavaScript you have to trigger
the update event by your own, whenever the image gets scaled. You do this
with the following command:

```html
<script>
$('#sampleimage').trigger('smartimagemap.update');
<script>
```

## License
Copyright (c) 2012 Simon Kusterer  
Licensed under the MIT license.