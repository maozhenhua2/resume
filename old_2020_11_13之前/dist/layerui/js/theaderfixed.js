fixedThead();

function fixedThead() {
  var divs = $('.theaders-fixed');
  // 滚动条宽度
  var vs_w = getScrollbarWidth();
  divs.each(function (i, divsdom) {
    var header = $(divsdom).find('thead');
    $(divsdom).find('tbody td').each(function (index, td) {
      var h = $(td).html();
      $(td).html('<div>' + h + '</div>');
    })
    // 复制表格
    var headclone = $(divsdom).find('table').clone();
    var classs = $(divsdom).children('div').eq(0).attr('class').replace('tbodys', '');
    // 删除复制表格里的表体，只留表头
    headclone.children('tbody').remove();

    $(divsdom).prepend('<div class="thead' + classs + '"></div>');
    $(divsdom).find('.thead').append(headclone);
    // 增加表头最后一个单元格宽度为滚动条的宽度
    headclone.find('thead').children('tr').append('<th class="scroll-path"><div style="width: ' + vs_w + 'px"></div></th>');
    var theads = $(divsdom).children('div').eq(0).css({
      'margin': 0,
      'height': header.outerHeight(true) + 'px',
      // 'overflow': 'hidden'
    });
    var tbodys = $(divsdom).children('div').eq(1);
    // 隐藏表格原来的表头
    tbodys.children('table').css({
      'margin-top': -header.outerHeight(true) + 'px'
    });
    // 设置表格高度
    tbodys.css({
      height: $(divsdom).innerHeight() - header.outerHeight(true) + 'px'
    });
    // 获取表格第一行
    var tbody = tbodys.find('tbody tr:first-child');
    // 遍历表头，同步表头单元格和表格第一行单元格的宽度
    headclone.find('thead tr').children('th').each(function (i, headdom) {
      var html = $(headdom).html();
      var tdwidth = tbody.children('td').eq(i).children('div').width();
      // console.log(tdwidth)
      // $(headdom).css({
      //   width: tdwidth + 'px',
      //   overflow: 'hidden'
      // })
      // $(headdom).attr('width', tdwidth);
      if (tdwidth) {
        $(headdom).html('<div style="width:' + (tdwidth) + 'px;">' + html + '</div>');
      }
    });
  });

  $('.tbodys').on('scroll', function () {
    $(this).prev()[0].scrollLeft = this.scrollLeft;
  })

}

// 获取滚动条的宽度
function getScrollbarWidth() {
  var oP = document.createElement('p');
  var styles = {
    width: '100px',
    height: '100px',
    overflowY: 'scroll',
  };
  var i;
  var scrollbarWidth;

  for (i in styles) {
    oP.style[i] = styles[i];
  }
  document.body.appendChild(oP);
  scrollbarWidth = oP.offsetWidth - oP.clientWidth;
  document.body.removeChild(oP);

  return scrollbarWidth;
}
