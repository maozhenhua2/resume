$('#search input').on('input propertychange focus', function () {
  if ($(this).val()) {
    $(this).next('a').addClass('show');
  } else {
    $(this).next('a').removeClass('show');
  }
});

$('#clearSearch').on('click', function () {
  $('#search input').val('');
  $(this).removeClass('show');
});

$('#all').on('click', function () {
  $('#mask').toggleClass('show');
  $('#header').toggleClass('ab');
  $('#allBox').css({
    top: $('#header').outerHeight(true) + 'px'
  }).toggleClass('show');
});

$('#allBox').on('click', 'li', function () {
  $(this).toggleClass('active').siblings().removeClass('active');
  allBoxClose();
  $('#all span').html($(this).children('a').html());
});

$('#filterbtn').on('click', function () {
  $('#mask, #filterBox').addClass('show');
  $('#wrapper').addClass('fixed');
});

$('#mask').on('click', function () {
  filterClose();
  allBoxClose();

});
$('#filter1, #filter2').on('click', 'button', function () {
  var index = $(this).parent().index();
  if (index === 2) {
    var icon = $(this).children('i');
    $(this).addClass('focus').parent().siblings().children('button').removeClass('focus');
    if (icon.hasClass('icon-arrow-up-down')) {
      icon.removeClass('icon-arrow-up-down');
      icon.addClass('icon-arrow-up-down-up-active');
    } else if (icon.hasClass('icon-arrow-up-down-up-active')) {
      icon.removeClass('icon-arrow-up-down-up-active');
      icon.addClass('icon-arrow-up-down-down-active');
    } else {
      icon.addClass('icon-arrow-up-down-up-active');
      icon.removeClass('icon-arrow-up-down-down-active');
    }
  } else {
    if (index === 0) {
      $(this).children('i').toggleClass('icon-arrow-down').toggleClass('icon-arrow-down-red');
    } else {
      $('#filter1 div:nth-child(1) button i').removeClass('icon-arrow-down-red').addClass('icon-arrow-down');
      allBoxClose();
      if (index === 3) {
        $('#mask').addClass('show');
      }
    }
    $(this).toggleClass('focus').parent().siblings().children('button').removeClass('focus');
    $('#filter1 div:nth-child(3) button i').removeClass('icon-arrow-up-down-down-active icon-arrow-up-down-up-active').addClass('icon-arrow-up-down');
  }
});
$('.filter-btns').on('click', 'button', function () {
  $(this).toggleClass('focus');
});
$('#clearFilter').on('click', function () {
  $('#filterBox div button').removeClass('focus');
  $('#filterBox div input').val('');
});
$('#confirmFilter').on('click', function () {
  filterClose();

  var obj = {};
  $('#filterBox > div .focus').each(function (i, dom) {
    var parent = $(this).parent().prev().html();
    if (!obj[parent]) {
      obj[parent] = [];
    }
    obj[parent].push([$(this).html(), $(this)]);
  });
  var html = '';
  for (var key in obj) {
    var arr = obj[key];
    var i = 0;
    var l = arr.length;
    for (; i < l; i++) {
      html += '<a>' + arr[i][0] + '</a>';
    }
  }
  $('#filter2').children('div').html(html);
});

// 顶部滚动固定
var postBtnsTop = $('#filter2').offset().top;
$(document).on('scroll', function () {
  var height = $('#filter2').outerHeight(true);
  var top = $(this).scrollTop();
  if (top >= postBtnsTop) {

    $('#header').addClass('has-fixed').css({
      'margin-bottom': height + 'px'
    });
    $('#filter2').addClass('fixed')
    // .css({
    //   'height': height + 'px'
    // });
  } else {
    $('#header').removeClass('has-fixed').css({
      'margin-bottom': 0 + 'px'
    });
    $('#filter2').removeClass('fixed')
    // .css({
    //   'height': height + 'px'
    // });
  }
});

function filterClose() {
  $('#filterBox').removeClass('show');
  setTimeout(function () {
    $('#mask').removeClass('show');
    $('#wrapper').removeClass('fixed');
  }, 500);
}

function allBoxClose() {
  $('#header').removeClass('ab');
  $('#allBox').removeClass('show');
  $('#mask').removeClass('show');
}
