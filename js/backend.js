'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var WIZARDS_URL = 'https://js.dump.academy/code-and-magick/data';
  var POST_URL = 'https://js.dump.academy/code-and-magick';
  var TIMEOUT_LIMIT = 10000;

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
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

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
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

  window.backend = {
    save: save,
    load: load,
  };

})();
