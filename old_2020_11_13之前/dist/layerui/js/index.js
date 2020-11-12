(function () {
  var forms = new mform();
  forms.init();
  forms.selectajax({
    url: 'data/select.json',
    result: function (data) {
      return data.datas;
    }
  });

  var bar1 = new processBar({
    el: '#processBar1',
    mousedown: function (obj) {
      console.log('down1', obj);
    },
    mousemove: function (obj) {
      // console.log('move1', obj);
    },
    mouseup: function (obj) {
      console.log('up1: ', obj);
    }
  });
  bar1.init();

  var bar2 = new processBar({
    el: '#processBar2',
    mousedown: function (obj) {
      console.log('down2', obj);
    },
    mousemove: function (obj) {
      // console.log('move2', obj);
    },
    mouseup: function (obj) {
      console.log('up2: ', obj);
    }
  });
  bar2.init();

})();
