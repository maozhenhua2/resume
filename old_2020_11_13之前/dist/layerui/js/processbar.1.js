function processBar(obj) {
  this.el = obj.el;
  var el = this.el;
  this.start = $(el).offset().left;
  this.end = $(el).width() - $(el + ' a').outerWidth(true);

  this.st = 0;
  this.et = 3 * 60 + 5;

  this.down = false;
  this.mousedown = 'mousedown';
  this.mouseup = 'mouseup';
  this.mousemove = 'mousemove';
  this.click = 'click';
  this.process = {
    translate: 0,
    process: 0
  };
  this.mousemovefn = obj.mousemove || function () {};
  this.mouseupfn = obj.mouseup || function () {};
  this.mousedownfn = obj.mousedown || function () {};
}

processBar.prototype.init = function () {
  this.event();
};

processBar.prototype.event = function () {
  var $this = this;
  var el = $this.el;
  $(el + ' a')
    .on($this.mousedown, function (e) {
      e.stopPropagation();
      var _this = this;
      $this.down = true;
      $(_this).addClass('active');
      $this.mousedownfn($this.process);
      $(document).on($this.mousemove, function (e) {
        if ($this.down && $(_this).hasClass('active')) {
          $this.process = $this.checkprocess(e);
          $this.processBarChange($this.process);
          $this.mousemovefn($this.process);
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

    .on($this.mouseup, function (e) {
      e.stopPropagation();
      $this.down = false;
      $(this).removeClass('active');
      $(this).off($this.mousemove);
      $this.mouseupfn($this.process);
    });

  $(el).on($this.click, function (e) {
    $this.process = $this.checkprocess(e);
    // console.log($this.process);
    $this.processBarChange($this.process);
    $this.mouseupfn($this.process);
  })

  $(document)
    .on($this.mouseup, function (e) {
      if (!$this.down) {
        return false;
      }
      $('.processBar a').removeClass('active');
      $('.processBar a').off($this.mousemove);

      $this.down = false;
      $this.mouseupfn($this.process);
    });
};

processBar.prototype.checkprocess = function (e) {
  var $this = this;
  var s;
  if (e.touches) {
    s = e.touches[0].pageX - $this.start;
  } else {
    s = e.pageX - $this.start;
  }
  s = s >= $this.end ? $this.end : s;
  s = s <= 0 ? 0 : s;
  var p = s / $this.end;

  return {
    translate: s,
    process: p
  }
};

processBar.prototype.processBarChange = function (obj) {
  var el = this.el;
  $(el + ' a').css({
    transform: 'translateX(' + obj.translate + 'px)'
  });
  $(el + ' .process').css({
    width: obj.process * 100 + '%'
  });
}
