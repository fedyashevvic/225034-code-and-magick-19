'use strict';

(function () {
  var similarBlock = document.querySelector('#similar-wizard-template');
  var numberOfWizards;
  var similarList = document.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var wizardElement = similarBlock.content.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };
  var renderWizardItem = function (wizard) {
    var fragment = document.createDocumentFragment();
    similarList.innerHTML = '';
    numberOfWizards = wizard.length > 4 ? 4 : wizard.length;
    for (var i = 0; i < numberOfWizards; i++) {
      fragment.appendChild(renderWizard(wizard[i]));
    }
    similarList.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.render = {
    renderWizardItem: renderWizardItem,
  };
})();