var mform = function () {

  if (typeof this.init !== 'function') {
    var thisPrototype = arguments.callee.prototype;

    thisPrototype.init = function () {
      this.documentEvent();
      this.txt();
      this.select();
      this.switch();
      this.lia();
    };

    // 文本框
    thisPrototype.txt = function () {
      $('.m-input input').on('focus', function () {
        var _this = $(this).parent();
        _this.addClass('focus');
      }).on('blur', function () {
        if ($(this).val()) {
          return false;
        }
        var _this = $(this).parent();
        _this.removeClass('focus');
      });
    };

    thisPrototype.switch = function () {
      $('.m-switch').on('click', function (e) {
        // e.stopPropagation();
        // console.log(1)
        var checkbox = $(this).children('input');
        var checked = checkbox.attr('checked');
        checkbox.attr('checked', !checked);
        // console.log(checkbox)
        if (!checked) {
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
        return false;
      });
    };

    // 下拉框
    thisPrototype.select = function () {
      var getTip = this.getTip;
      $('.md-select>input').on('keydown', function () {
        return false;
      }).on('click', function (e) {
        // e.stopPropagation();
        // console.log(2)
        $('.md-select .select').removeClass('show');
        var select = $(this).next('.select');
        select.addClass('show');
        var txt = select.find('.txt');
        if (txt.length) {
          txt.val('');
          txt.focus();
          select.children('ul').html(getTip('请输入关键字！'));
        }
      });
    };

    thisPrototype.selectajax = function (ajax) {
      var ajax1 = thisPrototype.ajax;
      var createLi = this.createLi;
      $('.m-input.md-select').on('click', '.select .txt', function (e) {
        // e.stopPropagation();
        // console.log(1)
        $(this).val('');
      });
      $('.m-input.md-select').on('input', '.txt', debounce(function (e) {
        // e.stopPropagation();
        // console.log(3)
        // var v = $(this).val();
        var ul = $(this).parent().next();
        $.when(ajax1(ajax))
          .done(function (data) {
            ul.html(createLi(data));
          })
      }, 1000));
    };

    thisPrototype.lia = function () {
      $('.md-select').on('click', ' li a', function (e) {
        e.stopPropagation();
        var txt = $(this).html();
        var index = $(this).parent().index();
        if (txt === '请选择...') {
          index = 1;
        }
        var div = $(this).parentsUntil('.select').parent();
        div.children('ul').children('li').eq(index).children('a').addClass('selected');
        $(this).parent('li').siblings('li').children('a').removeClass('selected');

        div.removeClass('show').prev('input').val(txt);
      });
    };

    // 生成tip
    thisPrototype.getTip = function (tip) {
      return '<p class="md-select-tip">' + tip + '</p>';
    };

    // ajax
    thisPrototype.ajax = function (ajax) {
      // var ajax = this.ajax;
      var dtd = $.Deferred();
      $.ajax({
          url: ajax.url,
          type: 'get'
        })
        .done(function (data) {
          dtd.resolve(ajax.result(data));
        });

      return dtd.promise();
    };

    // 生成列表
    thisPrototype.createLi = function (arr) {
      var html = '';
      arr.map(function (v, i) {
        html += '<li><a href="#">' + v + '</a></li>';
      });
      return html;
    };

    // document事件
    thisPrototype.documentEvent = function () {
      $(document).on('click', function (e) {
        var dom = e.target;
        if (
          $(dom).next('.select').length ||
          $(dom).parentsUntil('.select').parent().hasClass('select')
        ) {
          return false;
        }

        $('.md-select .select').removeClass('show');
      });
    };

  }
};
