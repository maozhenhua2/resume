var start = $('#processBar').offset().left;
var end = $('#processBar').width() - $('#processBar a').outerWidth(true);

var st = 0;
var et = 3 * 60 + 5;

var down = false;
var mousedown = 'mousedown';
var mouseup = 'mouseup';
var mousemove = 'mousemove';
var click = 'click';

$('#processBar a')
  .on(mousedown, function (e) {
    e.stopPropagation();
    var _this = this;
    down = true;
    $(_this).addClass('active');

    $(document).on(mousemove, function (e) {
      if (down && $(_this).hasClass('active')) {
        var p = checkprocess(e);
        processBarChange(p)
      }
    });
    // 禁止选择
    $(document).on('selectstart', function () {
      return false;
    }).on('dragstart', function () {
      return false;
    });

    return false;
  })

  .on(mouseup, function (e) {
    e.stopPropagation();
    down = false;
    $('#processBar a').removeClass('active');
    $('#processBar a').off(mousemove);
  });

$(document)
  .on(mouseup, function (e) {
    if (!down) {
      return false;
    }
    $('#processBar a').removeClass('active');
    $('#processBar a').off(mousemove);

    down = false;
  });

function checkprocess(e) {
  var s;
  if (e.touches) {
    s = e.touches[0].pageX - start;
  } else {
    s = e.pageX - start;
  }
  s = s >= end ? end : s;
  s = s <= 0 ? 0 : s;
  var p = s / end;

  return {
    translate: s,
    process: p
  }
}

// 进度条变化
function processBarChange(obj) {
  $('#processBar a').css({
    transform: 'translateX(' + obj.translate + 'px)'
  });
  $('#processBar .process').css({
    width: obj.process * 100 + '%'
  });
}
