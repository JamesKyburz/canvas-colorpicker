var picker = require('..');

window.onload = function() {
  var input = window.document.querySelector('input');
  var div = window.document.querySelector('div');

  var pick = picker({
    backgroundSrc: 'http://dl.dropboxusercontent.com/u/11380518/color-picker-backdrop.png',
    changed: function colorSelected(e) {
      input.value = e.value;
      div.style.backgroundColor = e.value;
    }
  });

  input.addEventListener('click', pick);

};




