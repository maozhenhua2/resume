(function () {
  // 仿Material design按钮
  Array.prototype.slice.call(document.querySelectorAll('.btn')).map(function (v, i) {
    v.addEventListener('click', function (e) {
      var _this = this;
      var l = e.offsetX;
      var t = e.offsetY;
      var w = _this.offsetWidth;
      var h = _this.offsetHeight;
      var x = parseInt(l - w / 2, 10);
      var y = parseInt(t - h / 2, 10);
      _this.style.setProperty('--left', x + 'px');
      _this.style.setProperty('--top', y + 'px');
    });
  });

  // 初始化子菜单高度，用于css过渡效果
  document.querySelectorAll('.mdrop-down div').forEach(function (dom, i) {
    var h = dom.querySelector('ul').offsetHeight;
    dom.setAttribute('data-height', h);
  });

  // 事件委托 
  document.querySelector('body').addEventListener('click', function (e) {
    // e.preventDefault();
    // console.log(1)
    var target = e.target;
    var parent = isInSel(target.parentNode, 'mdrop-down');

    if (parent.className.match('mdrop-down')) {
      btna(target, parent);
    } else {
      document.querySelectorAll('.mdrop-down').forEach(function (dom, i) {
        dom.className = dom.className.replace('active', '');
        dom.querySelector('div').style.height = 0;
      }, false);
    }
    return false;
  }, false);

  function btna(dom, rootParent) {
    // dom 点击的元素
    // rootParent 根元素
    // 父元素
    var parent = dom.parentNode;
    var pclass = parent.className;
    // 子菜单
    var subMenu = rootParent.querySelector('div');
    // 切换子菜单显示状态
    if (pclass.match('active')) {
      subMenu.style.height = '0px';
      parent.className = pclass.replace('active', '');
    } else {
      parent.className += ' active';
      var h = subMenu.getAttribute('data-height');
      subMenu.style.height = h + 'px';
    }
    // 点击的是子菜单里的元素隐藏子菜单
    if (parent !== rootParent) {
      subMenu.style.height = '0px';
      rootParent.className = rootParent.className.replace('active', '');
    }
  }



}());
