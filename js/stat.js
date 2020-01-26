'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var SHADOW_GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var DEFAULT_COLOR = '#000';

var shadowColor = 'rgba(0, 0, 0, 0.7)';
var cloudColor = '#fff';

var renderCloud = function (ctx, x, y, color, shadow) {
  ctx.beginPath();
  ctx.moveTo(x + SHADOW_GAP, y + SHADOW_GAP);
  ctx.bezierCurveTo(x + SHADOW_GAP, y + SHADOW_GAP, (x + SHADOW_GAP + (x + SHADOW_GAP + CLOUD_WIDTH)) / 2, y + SHADOW_GAP - SHADOW_GAP, x + SHADOW_GAP + CLOUD_WIDTH, y + SHADOW_GAP);
  ctx.lineTo(x + SHADOW_GAP + CLOUD_WIDTH, y + SHADOW_GAP + CLOUD_HEIGHT);
  ctx.bezierCurveTo(x + SHADOW_GAP + CLOUD_WIDTH, y + SHADOW_GAP + CLOUD_HEIGHT, (x + SHADOW_GAP + (x + SHADOW_GAP + CLOUD_WIDTH)) / 2, (y + SHADOW_GAP + CLOUD_HEIGHT) + SHADOW_GAP, x + SHADOW_GAP, y + SHADOW_GAP + CLOUD_HEIGHT);
  ctx.lineTo(x + SHADOW_GAP, y + SHADOW_GAP);
  ctx.fillStyle = shadow;
  ctx.fill();
  ctx.strokeStyle = shadow;
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y, (x + (x + CLOUD_WIDTH)) / 2, y - SHADOW_GAP, x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.bezierCurveTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, (x + (x + CLOUD_WIDTH)) / 2, (y + CLOUD_HEIGHT) + SHADOW_GAP, x, y + CLOUD_HEIGHT);
  ctx.lineTo(x, y);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = DEFAULT_COLOR;
  ctx.fillText('Ура вы победили!', x + 50, y + 10);
  ctx.fillText('Список результатов:', x + 50, y + 30);
};

var findMaxResult = function (array) {
  var maxResult = array[0];

  for (var i = 1; i <= array.length - 1; i++) {
    if (array[i] > maxResult) {
      maxResult = array[i];
    }
  }
  return maxResult;
};

var renderStatBar = function (ctx, x, y, names, times) {
  var startingPointX = x;
  var maxResult = findMaxResult(times);
  for (var i = 0; i <= names.length - 1; i++) {
    var barHeight = MAX_BAR_HEIGHT * times[i] / maxResult;
    ctx.fillStyle = DEFAULT_COLOR;
    ctx.fillText(Math.round(times[i]), startingPointX, y + (MAX_BAR_HEIGHT - barHeight) - 20);
    ctx.fillText(names[i], startingPointX, y + MAX_BAR_HEIGHT + 10);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240,' + Math.round(Math.random() * 100) + '%, 50%)';
    }
    ctx.fillRect(startingPointX, y + (MAX_BAR_HEIGHT - barHeight), BAR_WIDTH, barHeight);
    startingPointX += BAR_GAP + BAR_WIDTH;
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 100, 10, cloudColor, shadowColor);
  renderStatBar(ctx, 150, 100, names, times);
};
