'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var WIZARDS_URL = 'https://js.dump.academy/code-and-magick/data';
  var POST_URL = 'https://js.dump.academy/code-and-magick';
  var TIMEOUT_LIMIT = 10000;
  var wizardForm = document.querySelector('.setup-wizard-form');


  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Сервер недоступен, попробуйте позднее!');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка сети, попробуйте позже!');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос занял слишком много времени, проверьте скорость Вашего соединения!');
    });

    xhr.timeout = TIMEOUT_LIMIT;
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

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
    save(new FormData(wizardForm), saveSuccessHandler, saveErrorHandler);
    evt.preventDefault();
  });

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('К сожалению, похожих Волшебников не нашлось');
      }
    });

    xhr.addEventListener('error', function () {
      onError('К сожалению, произошел сбой сети, проверьте подключение к интернету!');
    });

    xhr.addEventListener('timeout', function () {
      onError('К сожалению, запрос не успел выполнится, обновите страницу.');
    });
    xhr.timeout = TIMEOUT_LIMIT;

    xhr.open('GET', WIZARDS_URL);
    xhr.send();
  };

  var loadSuccessHandler = function (data) {
    window.setup.renderWizardItem(data);
  };
  var loadErrorHandler = function (data) {
    var errorMsg = document.createElement('p');
    errorMsg.textContent = data;
    errorMsg.style.background = '#ff0000';
    errorMsg.style.color = '#fff';
    document.querySelector('.setup-similar-list').appendChild(errorMsg);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  load(loadSuccessHandler, loadErrorHandler);


  window.backend = {
    load: load,
  };

})();
