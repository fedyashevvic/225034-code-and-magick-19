'use strict';

(function () {
  var uploadHendler = document.querySelector('.upload');
  var computedStyle = getComputedStyle(window.setup.setupWindow);
  var setupWindowDefaultPosition = {
    x: computedStyle.left,
    y: computedStyle.top
  };

  var moveSetupWindowToDefault = function () {
    window.setup.setupWindow.style.left = window.dialog.setupWindowDefaultPosition.x;
    window.setup.setupWindow.style.top = window.dialog.setupWindowDefaultPosition.y;
  };

  uploadHendler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var isDragged = false;
    var startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shiftPosition = {
        x: startPosition.x - moveEvt.clientX,
        y: startPosition.y - moveEvt.clientY
      };

      startPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.setupWindow.style.left = (window.setup.setupWindow.offsetLeft - shiftPosition.x) + 'px';
      window.setup.setupWindow.style.top = (window.setup.setupWindow.offsetTop - shiftPosition.y) + 'px';
    };

    var onMouseUp = function (downEvt) {
      downEvt.preventDefault();

      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          uploadHendler.removeEventListener('click', onClickPreventDefault);
        };
        uploadHendler.addEventListener('click', onClickPreventDefault);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.dialog = {
    setupWindowDefaultPosition: setupWindowDefaultPosition,
    moveSetupWindowToDefault: moveSetupWindowToDefault,
  };
})();
