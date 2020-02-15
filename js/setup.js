'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var similarBlock = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var numberOfWizards = 4;
  var setupWindow = document.querySelector('.setup');
  var coatSetup = document.querySelector('.setup-wizard .wizard-coat');
  var eyesSetup = document.querySelector('.setup-wizard .wizard-eyes');
  var fireballSetup = document.querySelector('.setup-fireball-wrap');

  var getRamdomData = function (arr) {
    var currNum = Math.round(Math.random() * (arr.length - 1));
    return arr[currNum];
  };
  var renderWizard = function (wizard) {
    var wizardElement = similarBlock.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };
  var renderWizardItem = function (wizard) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < numberOfWizards; i++) {
      fragment.appendChild(renderWizard(wizard[i]));
    }
    document.querySelector('.setup-similar-list').appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var colorWizardCoat = function () {
    var currentColor = getRamdomData(COAT_COLORS);
    coatSetup.style.fill = currentColor;
    setupWindow.querySelector('input[name="coat-color"]').value = currentColor;
  };
  var colorWizardEyes = function () {
    var currentColor = getRamdomData(EYES_COLORS);
    eyesSetup.style.fill = currentColor;
    setupWindow.querySelector('input[name="eyes-color"]').value = currentColor;
  };
  var colorWizardFireball = function () {
    var currentColor = getRamdomData(FIREBALL_COLORS);
    fireballSetup.style.background = currentColor;
    setupWindow.querySelector('input[name="fireball-color"]').value = currentColor;
  };

  coatSetup.addEventListener('click', colorWizardCoat);
  eyesSetup.addEventListener('click', colorWizardEyes);
  fireballSetup.addEventListener('click', colorWizardFireball);

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    getRamdomData: getRamdomData,
    renderWizardItem: renderWizardItem,
    setupWindow: setupWindow
  };
})();

