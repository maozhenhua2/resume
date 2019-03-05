(function() {
  var margin = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };

  var dataset = [{
    name: 'html',
    value: 9
  }, {
    name: 'css',
    value: 8
  }, {
    name: 'jquery',
    value: 8
  }, {
    name: 'vue',
    value: 7
  }, {
    name: 'sass',
    value: 8
  }, {
    name: 'gulp',
    value: 8
  }, {
    name: 'webpack',
    value: 7
  }];

  // 间距
  var rectPadding = 10;
  // 柱子高度
  var rectHeight = 50;
  // svg宽度
  var width = $('#skill').width();
  // svg高度
  var height = rectHeight * dataset.length + margin.top + margin.bottom;
  // 生成颜色
  // var colors = d3.schemeCategory10;

  var textWidth = 0;

  var min = d3.min(dataset, function(d) {
    return d.value;
  });

  var max = d3.max(dataset, function(d) {
    return d.value;
  });

  var scaleLinear = d3.scaleLinear()
    .domain([0, 10])
    .range([0, width]);

  var svg = d3.select('#skill')
    .attr('width', width)
    .attr('height', height);

  var g = svg.append('g')
    .attr('transform', 'translate(' + margin.top + ',' + margin.left + ')');

  var gs = g.selectAll('rect')
    .data(dataset)
    .enter()
    .append('g');

  // 标题 
  gs.append('text')
    .attr('x', 0)
    .attr('y', function(d, i) {
      return i * rectHeight;
    })
    .attr('dx', 0)
    .attr('dy', function(d, i) {
      return rectHeight / 2;
    })
    .text(function(d) {
      return d.name;
    });

  // 获取文字宽度 
  $('#skill text').each(function(i, dom) {
    var w = dom.getClientRects()[0].width;
    textWidth = w > textWidth ? w : textWidth;
  });

  // 重新设置宽度
  scaleLinear.range([0, width - textWidth - 10]);


  // 柱子背景
  gs.append('rect')
    .attr('x', textWidth + 10)
    .attr('y', function(d, i) {
      return i * rectHeight;
    })
    .attr('class', 'bar-bg')
    .attr('width', width - textWidth - 10)
    .attr('height', function(d, i) {
      return rectHeight - rectPadding;
    })
  // .attr('fill', '#ccc');

  // 柱子
  gs.append('rect')
    .attr('x', textWidth + 10)
    .attr('y', function(d, i) {
      return i * rectHeight;
    })
    .attr('class', 'bar')
    .attr('width', function(d, i) {
      return scaleLinear(d.value);
    })
    .attr('height', function(d, i) {
      return rectHeight - rectPadding;
    })
  // .attr('fill', colors[0]);

  // 柱宽文字
  gs.append('text')
    .attr('class', 'value')
    .attr('x', function(d, i) {
      var x = 10 > scaleLinear(d.value) ? scaleLinear(d.value) : 10;
      return textWidth + x;
    })
    .attr('y', function(d, i) {
      return i * rectHeight;
    })
    .attr('dx', 10)
    .attr('dy', function(d, i) {
      return rectHeight / 2;
    })
    .text(function(d) {
      return d.value;
    });
}());

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
    .on('mouseleave', function() {
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