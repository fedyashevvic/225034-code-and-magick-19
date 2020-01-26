'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var similarBlock = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var getRamdomData = function (arr) {
  return Math.round(Math.random() * (arr.length - 1));
};

var wizardsData = [
  {
    name: WIZARD_NAMES[getRamdomData(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRamdomData(WIZARD_SURNAMES)],
    coatColor: COAT_COLORS[getRamdomData(COAT_COLORS)],
    eyesColor: EYES_COLORS[getRamdomData(EYES_COLORS)]
  },
  {
    name: WIZARD_NAMES[getRamdomData(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRamdomData(WIZARD_SURNAMES)],
    coatColor: COAT_COLORS[getRamdomData(COAT_COLORS)],
    eyesColor: EYES_COLORS[getRamdomData(EYES_COLORS)]
  },
  {
    name: WIZARD_NAMES[getRamdomData(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRamdomData(WIZARD_SURNAMES)],
    coatColor: COAT_COLORS[getRamdomData(COAT_COLORS)],
    eyesColor: EYES_COLORS[getRamdomData(EYES_COLORS)]
  },
  {
    name: WIZARD_NAMES[getRamdomData(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRamdomData(WIZARD_SURNAMES)],
    coatColor: COAT_COLORS[getRamdomData(COAT_COLORS)],
    eyesColor: EYES_COLORS[getRamdomData(EYES_COLORS)]
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarBlock.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  fragment.appendChild(wizardElement);
};

var renderWizardItem = function (wizard) {
  for (var i = 0; i < 4; i++) {
    renderWizard(wizard[i]);
  }
  document.querySelector('.setup-similar-list').appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');
  document.querySelector('.setup').classList.remove('hidden');
};

renderWizardItem(wizardsData);
