module.exports = function colorpicker(options) {
  var canvas = window.document.createElement('canvas');
  if (!canvas.getContext) return;

  canvas.setAttribute('id', 'colorpicker');
  canvas.setAttribute('style', 'display:none; position:absolute;');

  var ctx = canvas.getContext('2d');

  var img = window.document.createElement('image');
  img.setAttribute('src', options.backgroundSrc);
  img.onload = function() {
    canvas.setAttribute('height', img.height);
    canvas.setAttribute('width', img.width);
    ctx.drawImage(img, 0, 0);
  };

  var active = null;

  canvas.onmousedown = function() { canvas.style.display = 'none'; };

  canvas.onmousemove = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var data = ctx.getImageData(x, y, 1, 1).data;
    var r = data[0];
    var g = data[1];
    var b = data[2];
    active.value = rgbToHex(r, g, b);
  };

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
