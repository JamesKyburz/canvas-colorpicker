module.exports = function colorpicker(options) {
  if (!options.backgroundSrc) throw new Error('backgroundSrc not specified');

  var canvas = window.document.createElement('canvas');
  if (!('getContext' in canvas)) return;

  canvas.setAttribute('id', 'colorpicker');
  canvas.setAttribute('style', 'display:none; position:absolute;');

  var ctx = canvas.getContext('2d');

  var img = window.document.createElement('img');
  img.setAttribute('crossOrigin', 'Anonymous');
  img.setAttribute('src', options.backgroundSrc);
  img.addEventListener('load', function() {
    canvas.setAttribute('height', img.height);
    canvas.setAttribute('width', img.width);
    ctx.drawImage(img, 0, 0);
  }, false);

  var active = null;

  canvas.addEventListener('mousedown', function() { canvas.style.display = 'none'; }, false);

  canvas.addEventListener('mousemove', function(e) {
    var x = e.offsetX || e.layerX;
    var y = e.offsetY || e.layerY;
    var data = ctx.getImageData(x, y, 1, 1).data;
    var r = data[0];
    var g = data[1];
    var b = data[2];
    active.value = rgbToHex(r, g, b);
    if (typeof options.changed === 'function') {
      options.changed(active);
    }
  }, false);

  var rgbToHex = function(r, g, b) {
    return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
  };

  window.document.body.appendChild(canvas);

  var pick = options.pick || function(e) {
    canvas.style.top = 4 + e.offsetTop + e.offsetHeight + 'px';
    canvas.style.left = e.offsetLeft + 'px';
    canvas.style.display = 'block';
  };

  var picker = function(e) { pick(active=e); };
  picker.canvas = canvas;

  return picker;
};
