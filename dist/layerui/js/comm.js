// (function () {
//   // 文本框
//   $('.label input').on('focus', function () {
//     var _this = $(this).parent();
//     _this.addClass('focus');
//   }).on('blur', function () {
//     if ($(this).val()) {
//       return false;
//     }
//     var _this = $(this).parent();
//     _this.removeClass('focus');
//   });

//   // 下拉框
//   $('.md-select input').on('click', function () {
//     $('.md-select .select').removeClass('show');
//     $(this).next('.select').addClass('show');
//   });

//   $('.md-select li a').on('click', function () {
//     var txt = $(this).html();
//     var index = $(this).parent().index();
//     if (txt === '请选择...') {
//       index = 1;
//     }
//     var div = $(this).parentsUntil('.select').parent();
//     div.children('ul').children('li').eq(index).children('a').addClass('selected');
//     $(this).parent('li').siblings('li').children('a').removeClass('selected');

//     div.removeClass('show').prev('input').val(txt);
//   });

//   // 仿Material design按钮
//   $('.btn').on('click', function (e) {
//     var _this = $(this);
//     var l = e.offsetX;
//     var t = e.offsetY;
//     var w = _this.outerWidth(true);
//     var h = _this.outerHeight(true);
//     var x = parseInt(l - w / 2, 10);
//     var y = parseInt(t - h / 2, 10);
//     _this[0].style.setProperty('--left', x + 'px');
//     _this[0].style.setProperty('--top', y + 'px');

//   });

//   $(document).on('click', function (e) {
//     var dom = e.target;
//     if (
//       $(dom).next('.select').length ||
//       $(dom).parentsUntil('.select').parent().hasClass('select')
//     ) {
//       return false;
//     }

//     $('.md-select .select').removeClass('show');
//   });

// }());

// var setchar = {
//   init: function (id) {
//     return echarts.init(document.querySelector(id));
//   },
//   run: function (char, option) {
//     char.setOption(option, true);
//   }
// };

// function resizeChart(arr) {
//   arr.map(function (v) {
//     v.resize();
//   });
// }

// function setChart(el, option) {
//   var chart = setchar.init(el);
//   setchar.run(chart, option);
//   return chart;
// }

// // 深度复制对象属性
// function deepCopy(source, targets) {
//   var target = targets || {};
//   for (var keys in source) {
//     if (typeof source[keys] === 'object') {
//       target[keys] = source[keys].constructor === Array ? [] : {};
//       deepCopy(source[keys], target[keys]);
//     } else {
//       target[keys] = source[keys];
//     }
//   }
//   return target;
// }


function isInSel(dom, sel) {
  while (!dom.className.match(sel)) {
    dom = dom.parentNode;

    if (dom.nodeName.toLowerCase() === 'body') {
      break;
    }
  }
  return dom;
}
