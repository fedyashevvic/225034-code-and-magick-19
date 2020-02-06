'use strict';

(function () {
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');

  var openSetup = function () {
    window.dialog.moveSetupWindowToDefault();
    window.setup.setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', onEscPopUpClose);
    window.setup.setupWindow.querySelector('.setup-user-name').addEventListener('focus', function () {
      document.removeEventListener('keydown', onEscPopUpClose);
    });
    window.setup.setupWindow.querySelector('.setup-user-name').addEventListener('blur', function () {
      document.addEventListener('keydown', onEscPopUpClose);
    });
  };
  var closeSetup = function () {
    window.setup.setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', onEscPopUpClose);
  };
  var onEscPopUpClose = function (evt) {
    if (evt.key === window.utils.ESC) {
      closeSetup();
    }
  };

  setupOpen.addEventListener('click', openSetup);
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ENTER) {
      openSetup();
    }
  });
  setupClose.addEventListener('click', closeSetup);
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ENTER) {
      closeSetup();
    }
  });

})();
