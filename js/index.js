(function() {
  var dir = ['top', 'right', 'bottom', 'left'];
  var index = 0;
  $('.products a')
    .on('mouseenter', function(event) {
      var _this = this;
      index = getDir($(_this), {
        x: event.pageX,
        y: event.pageY
      });
      $(_this).addClass(dir[index]);
      setTimeout(function() {
        $(_this).addClass('show transform');
      }, 0);
    })
    .on('mouseleave', function(event) {
      var _this = this;
      $(_this).removeClass(dir[index]);
      index = getDir($(_this), {
        x: event.pageX,
        y: event.pageY
      });
      $(_this).addClass(dir[index]);
      $(_this).removeClass('show');
      setTimeout(function() {
        $(_this).removeClass(dir[index] + ' transform');
      }, 300);
    });
}());


/* 
0:up
1:right
2:down
3:left
*/
function getDir(dom, obj) {
  var w = dom.width(),
    h = dom.height(),
    x = (obj.x - dom.offset().left - w / 2) * (w > h ? h / w : 1),
    y = (obj.y - dom.offset().top - h / 2) * (h > w ? w / h : 1),
    d = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
  return d;
}