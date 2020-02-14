'use strict';

(function () {
  var WIZARDS_URL = 'https://js.dump.academy/code-and-magick/data';
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest;
    xhr.responceType = 'JSON';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('GET', WIZARDS_URL);
    xhr.send();
  };

  var loadHandler = function(data) {
    console.log(data);
  };
  var errorHandler = function(data) {
    console.log(data);
  };

  load(loadHandler, errorHandler);


  window.backend = {
    load: load,
  };

})();