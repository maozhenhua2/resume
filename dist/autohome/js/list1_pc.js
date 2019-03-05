(function () {
  // 获取光标位置
  (function ($, undefined) {
    $.fn.getCursorPosition = function () {
      var el = $(this).get(0);
      var pos = 0;
      if ('selectionStart' in el) {
        pos = el.selectionStart;
      } else if ('selection' in document) {
        el.focus();
        var Sel = document.selection.createRange();
        var SelLength = document.selection.createRange().text.length;
        Sel.moveStart('character', -el.value.length);
        pos = Sel.text.length - SelLength;
      }
      return pos;
    }
  })(jQuery);

  // 模板
  var listPart = function (obj) {
    var img = '';
    var imgClass = '';
    if (obj.img) {
      imgClass = ' has-img';
      img = '<div class="img"><img src="' + obj.img + '" alt=""></div>';
    }
    return '' +
      '<li>' +
      '  <div class="drag-handle" data-handle="&#9776;" data-handle2="上下拖拽修改排序"></div>' +
      '  <div class="part-box' + imgClass + '">' +
      '    ' + img +
      '    <textarea>' + obj.txt + '</textarea>' +
      '    <a class="remove-part"><i class="icon-close"></i></a>' +
      '  </div>' +
      '</li>';
  };

  // 表情
  function initFaces() {
    var faceArr = [
      "[\u5fae\u7b11]", "[\u6487\u5634]", "[\u8272]", "[\u53d1\u5446]", "[\u5f97\u610f]", "[\u6d41\u6cea]",
      "[\u5bb3\u7f9e]", "[\u95ed\u5634]", "[\u7761]", "[\u5927\u54ed]", "[\u5c34\u5c2c]", "[\u53d1\u6012]",
      "[\u8c03\u76ae]", "[\u563b\u563b]", "[\u60ca\u8bb6]", "[\u96be\u8fc7]", "[\u9177]", "[\u51b7\u6c57]",
      "[\u6293\u72c2]", "[\u5410]", "[\u5077\u7b11]", "[\u53ef\u7231]", "[\u767d\u773c]", "[\u50b2\u6162]",
      "[\u9965\u997f]", "[\u56f0]", "[\u60ca\u6050]", "[\u6c57]", "[\u61a8\u7b11]", "[\u5927\u5175]", "[\u594b\u6597]",
      "[\u5492\u9a82]", "[\u7591\u95ee]", "[\u5618]", "[\u6655]", "[\u6298\u78e8]", "[\u8870]", "[\u9ab7\u9ac5]",
      "[\u6572\u6253]", "[\u518d\u89c1]", "[\u64e6\u6c57]", "[\u6316\u9f3b]", "[\u9f13\u638c]", "[\u7cd7\u5927\u4e86]",
      "[\u574f\u7b11]", "[\u5de6\u54fc\u54fc]", "[\u53f3\u54fc\u54fc]", "[\u54c8\u6b20]", "[\u9119\u89c6]",
      "[\u59d4\u5c48]", "[\u5feb\u54ed\u4e86]", "[\u9634\u9669]", "[\u4eb2\u4eb2]", "[\u5413]", "[\u53ef\u601c]",
      "[\u83dc\u5200]", "[\u897f\u74dc]", "[\u5564\u9152]", "[\u7bee\u7403]", "[\u4e52\u4e53]", "[\u5496\u5561]",
      "[\u996d]", "[\u732a\u5934]", "[\u73ab\u7470]", "[\u51cb\u96f6]", "[\u793a\u7231]", "[\u7231\u5fc3]",
      "[\u5fc3\u788e]", "[\u86cb\u7cd5]", "[\u95ea\u7535]", "[\u70b8\u5f39]", "[\u5200]", "[\u8db3\u7403]",
      "[\u74e2\u866b]", "[\u4fbf\u4fbf]", "[\u6708\u4eae]", "[\u592a\u9633]", "[\u793c\u7269]", "[\u62e5\u62b1]",
      "[\u5f3a]", "[\u5f31]", "[\u63e1\u624b]", "[\u80dc\u5229]", "[\u62b1\u62f3]", "[\u52fe\u5f15]", "[\u62f3\u5934]",
      "[\u5dee\u52b2]", "[\u7231\u4f60]", "[NO]", "[OK]"
    ];
    var i = 0;
    var l = faceArr.length;
    var linemax = 15;
    var html = '';
    html += '<div class="face-box">';
    for (; i < l; i++) {
      html += '<button title="' + faceArr[i] + '"><i class="icon-faces" style="background-image: url(./images/faces/' + (i + 1) + '.gif)"></i></button>';
      if ((i + 1) % linemax === 0 && i !== 0) {
        html += '<br>';
      }
    }
    html += '</div>';
    $('#facesBox').html(html);
  }

  initFaces();

  // 假数据
  var tmpData = [
    {
      img: '../images/new-folder.svg',
      txt: 'a'
    },
    {img: '', txt: 'b'},
    {img: '', txt: 'c'},
    {img: '', txt: 'd'},
    {img: '', txt: 'e'},
    {img: '', txt: 'f'}
  ];

  // 页面加载显示loading
  var layerLoading = layer.msg('加载中', {
    icon: 16,
    shade: 0.3
  });

  // 模拟ajax
  setTimeout(function () {
    var i = 0;
    var l = tmpData.length;
    var html = '';
    for (; i < l; i++) {
      html += listPart(tmpData[i]);
    }
    $('#list ul').html(html);

    layer.close(layerLoading)
  }, 1000);

  // 标题输入
  $('#postinput')
    .on('focus', function () {
      $(this).next('p').addClass('show');
    })
    .on('blur', function () {
      var val = $(this).val();
      var l = Math.floor(strlen(val) / 2);
      l = l === 0 ? 1 : l;
      if (l > 4) {
        $(this).next('p').removeClass('show');
      } else {
        $(this).next('p').addClass('show');
      }
    })
    .on('input propertychange', function () {
      var val = $(this).val();
      var l = Math.floor(strlen(val) / 2);
      // l = l === 0 ? 1 : l;
      var span = $('#postContent p span');
      var txt = span.eq(0);
      var count = span.eq(1);
      var tip = '';
      if (l >= 4) {
        tip = '还能输入';
        count.removeClass('red');
        l = 40 - l;
        l = l < 0 ? 0 : l;
      } else {
        tip = '还需要输入';
        l = 4 - l;
        count.addClass('red');
      }
      txt.html(tip);
      count.html(l);
      if (l <= 0) {
        val = val.substr(0, 80);
        $(this).val(val);
      }
    });

  // 文本框选中状态
  $('#list').on('focus', 'textarea', function () {
    var li = $(this).parentsUntil('li').parent('li');
    li.addClass('focus').siblings().removeClass('focus choosen');
  });

  // 添加文本框
  $('#addtxt').on('click', function () {
    $('#list ul').append(listPart({img: '', txt: ''}));
    $('#list ul li:last-child').addClass('focus').siblings().removeClass('focus');

    scrollTo($('#list ul li:last-child'));
  });

  // 添加图片
  $('#addimg').on('click', function () {
    $('#imgfile').click();
  });

  $('#imgfile').on('change', function () {
    var imgdom = '';

    var files = $(this)[0].files;
    var i = 0;
    var l = files.length;
    for (; i < l; i++) {
      imgdom = document.createElement('div');
      imgdom.className = 'img';
      var img = document.createElement('img');
      imgdom.appendChild(img);
      img.src = window.URL.createObjectURL(files[i]);
      img.onload = function () {
        window.URL.revokeObjectURL(this.src);
      };
    }
    $('#list ul').append(listPart({img: img.src, txt: ''}));

    $('#list ul li:last-child').addClass('focus').siblings().removeClass('focus');
    scrollTo($('#list ul li:last-child'));
  });

  var facelayout;

  $('#list').on('blur', 'textarea', function () {
    var textarea = $(this);
    var pos = textarea.getCursorPosition();
    textarea.attr('data-pos', pos);
    // textarea.parentsUntil('li').parent().siblings('li').removeClass('choosen');
  });

  $('#addface').on('click', function () {
    var offset = $(this).offset();
    var size = {
      w: $(this).outerWidth(true),
      h: $(this).outerHeight(true)
    };
    if ($('#postBtns').hasClass('fixed')) {
      offset.top = 10;
    }

    $(this).attr('data-top', offset.top);

    facelayout = layer.open({
      id: 'facelayer1',
      type: 1,
      title: false,
      closeBtn: 1,
      resize: false,
      shade: [1, 'rgba(0, 0, 0, 0)'],
      shadeClose: true,
      fixed: false,
      offset: [offset.top + size.h + 'px', offset.left + 'px'],
      skin: 'faces-layer',
      content: $('#facesBox').html(),
      success: function (layero, index) {
        console.log(layero, index);
        $('.faces-layer').on('click', 'button', function () {
          var _this = $(this);
          var txt = _this.attr('title');
          var li = $('#list li.focus');
          if (li.length === 0) {
            li = $('#list li:last-child');
          }
          var textarea = li.find('textarea');
          var val = textarea.val();
          var pos = textarea.attr('data-pos') - 0 || textarea.getCursorPosition();
          var arr = val.split('');
          arr.splice(pos, 0, txt);
          textarea.val(arr.join(''));
          textarea.attr('data-pos', pos + txt.length);
          layer.close(index);
          return false;
        });
      }
    });
  });

  // 删除
  $('#list').on('click', '.remove-part', function () {
    var li = $(this).parentsUntil('li').parent('li');
    layer.open({
      className: 'layout-text-left',
      content: '删除后内容不能恢复，是否确定删除？',
      btn: ['确定', '取消'],
      yes: function (index) {
        li.remove();
        layer.close(index);
      }
    });
  });

  // 顶部滚动固定
  var postBtnsTop = $('#postBtns').offset().top;
  $(document).on('scroll', function () {
    var top = $(this).scrollTop();
    var faceTop = parseInt($('#addface').attr('data-top'), 10) + parseInt($('#addface').outerHeight(true), 10);
    var facePos = 'absolute';
    if (top >= postBtnsTop) {
      $('#postPanel').addClass('has-fixed');
      $('#postBtns').addClass('fixed');
      faceTop = $('#addface').outerHeight(true) + 10;
      facePos = 'fixed';
    } else {
      $('#postPanel').removeClass('has-fixed');
      $('#postBtns').removeClass('fixed');
    }

    $('.faces-layer').css({
      position: facePos,
      top: faceTop + 'px'
    })
  });

  var el = document.getElementById('items');
  var sortable = Sortable.create(el, {
    animation: 150,
    onChoose: function (evt) {
      var itemEl = evt.item;
      $(itemEl).removeClass('focus').addClass('choosen').siblings().removeClass('focus choosen');
    },
    onEnd: function (evt) {
      var itemEl = evt.item;
      $(itemEl)
        // .removeClass('choosen')
        .addClass('focus').siblings().removeClass('focus choosen');
    }
  });

}());

function scrollTo(li) {
  if (!li) {
    return false;
  }
  li.addClass('focus').siblings().removeClass('focus');

  $('html, body').stop(true,false).animate({
    scrollTop: li.offset().top + $('#postBtns').outerHeight(true) + 'px'
  }, {
    duration: 100,
    complete: function () {
      // li.find('textarea').eq(0).click();
    }
  });
}

// 判断有没有中文
function isChinese(str) {
  var lst = /[u00-uFF]/;
  return !lst.test(str);
}

// 获取中英文混合字符串的长度
function strlen(str) {
  var strlength = 0;
  for (i = 0; i < str.length; i++) {
    if (isChinese(str.charAt(i)) == true) {
      strlength = strlength + 2;
    } else {
      strlength = strlength + 1;
    }
  }
  return strlength;
}
