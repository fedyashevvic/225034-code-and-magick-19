'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupWindow = document.querySelector('.setup');
  var coatSetup = document.querySelector('.setup-wizard .wizard-coat');
  var eyesSetup = document.querySelector('.setup-wizard .wizard-eyes');
  var fireballSetup = document.querySelector('.setup-fireball-wrap');
  var wizardForm = document.querySelector('.setup-wizard-form');
  var wizards = [];
  var coatColor;
  var eyesColor;

  var getRamdomData = function (arr) {
    var currNum = Math.round(Math.random() * (arr.length - 1));
    return arr[currNum];
  };

  var loadSuccessHandler = function (data) {
    wizards = data;
    updateWizards();
  };
  var loadErrorHandler = function (data) {
    var errorMsg = document.createElement('p');
    errorMsg.textContent = data;
    errorMsg.style = 'position: absolute;background: rgb(255, 0, 0);color: rgb(255, 255, 255);z-index: 1;text-align: center;width: 100%;';
    document.querySelector('header').before(errorMsg);
  };
  window.backend.load(loadSuccessHandler, loadErrorHandler);

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }
  var updateWizards = function () {
    var uniqueWizards = wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (!rankDiff) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });
    window.render.renderWizardItem(uniqueWizards);
  };
  var colorWizardCoat = function () {
    coatColor = getRamdomData(COAT_COLORS);
    coatSetup.style.fill = coatColor;
    setupWindow.querySelector('input[name="coat-color"]').value = coatColor;
    updateWizards();
  };
  var colorWizardEyes = function () {
    eyesColor = getRamdomData(EYES_COLORS);
    eyesSetup.style.fill = eyesColor;
    setupWindow.querySelector('input[name="eyes-color"]').value = eyesColor;
    updateWizards();
  };
  var colorWizardFireball = function () {
    var currentColor = getRamdomData(FIREBALL_COLORS);
    fireballSetup.style.background = currentColor;
    setupWindow.querySelector('input[name="fireball-color"]').value = currentColor;
  };

  coatSetup.addEventListener('click', colorWizardCoat);
  eyesSetup.addEventListener('click', colorWizardEyes);
  fireballSetup.addEventListener('click', colorWizardFireball);

  var saveSuccessHandler = function () {
    window.setup.setupWindow.classList.add('hidden');
  };
  var saveErrorHandler = function (data) {
    var errorMsg = document.createElement('p');
    errorMsg.textContent = data;
    errorMsg.style.background = '#ff0000';
    errorMsg.style.color = '#fff';
    errorMsg.style.textAlign = 'center';
    document.querySelector('button.setup-submit').after(errorMsg);
  };
  wizardForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(wizardForm), saveSuccessHandler, saveErrorHandler);
    evt.preventDefault();
  });

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    getRamdomData: getRamdomData,
    setupWindow: setupWindow
  };
})();

