function getTime() {
  var now = new Date();

  var year = now.getFullYear();
  year = cell(year);

  var month = now.getMonth();
  month = cell(checkSLength(month + 1));

  var date = now.getDate();
  date = cell(checkSLength(date));

  var hour = now.getHours();
  hour = cell(checkSLength(hour));

  var minute = now.getMinutes();
  minute = cell(checkSLength(minute));

  var second = now.getSeconds();
  second = cell(checkSLength(second));

  var t = year + '年' + month + '月' + date + '日 ' /* + hour + ':' + minute + ':' + second*/ ;
  document.getElementById('date').innerHTML = t;
}

$(document).ready(function() {
  var clock = $('#time').FlipClock({
    language: 'zh-cn',
    clockFace: 'TwentyFourHourClock'
  });
})

function cell(s) {
  var t = String(s);
  t = t.split('').join('</span><span class="time-cell">');
  t = '<span class="time-cell">' + t + '</span>';
  return t;
}

function checkSLength(t) {
  var tt = String(t).length > 1 ? t : '0' + t;
  return tt;
}
// 时间
getTime();
var tt = setInterval(function() {
  getTime();
}, 1000 * 60 * 60 * 24);

// 获取指定css样式
function getStyle(oElm, strCssRule) {
  var strValue = "";
  if (document.defaultView && document.defaultView.getComputedStyle) {
    strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
  } else if (oElm.currentStyle) {
    strCssRule = strCssRule.replace(/\-(\w)/g, function(strMatch, p1) {
      return p1.toUpperCase();
    });
    strValue = oElm.currentStyle[strCssRule];
  }
  return strValue;
}
// 指定范围随机数
function randomRange(start, end) {
  var total = end - start + 1;
  return Math.floor(Math.random() * total + start);
}

function convertData(data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    res.push({
      address: data[i].name,
      value: data[i].coor.concat(randomRange(100, 300))
    });
  }
  return res;
}
var option = {};
var allData = [{
  name: '新疆',
  bg: '#92d050',
  coor: [84.9023, 41.748]
}, {
  name: '四川',
  bg: '#1f4e79',
  coor: [102.9199, 30.1904]
}, {
  name: '西藏',
  bg: '#1f4e79',
  coor: [88.7695, 31.6846]
}, {
  name: '重庆',
  bg: '#1f4e79',
  coor: [107.7539, 30.1904]
}, {
  name: '甘肃',
  bg: '#00b0f0',
  coor: [95.7129, 40.166]
}, {
  name: '宁夏',
  bg: '#00b0f0',
  coor: [105.9961, 37.3096]
}, {
  name: '青海',
  bg: '#00b0f0',
  coor: [96.2402, 35.4199]
}, {
  name: '陕西',
  bg: '#00b0f0',
  coor: [109.5996, 35.6396]
}, {
  name: '福建',
  bg: '#9dc3e6',
  coor: [118.3008, 25.9277]
}, {
  name: '浙江',
  bg: '#9dc3e6',
  coor: [120.498, 29.0918]
}, {
  name: '河南',
  bg: '#cc99ff',
  coor: [113.4668, 33.8818]
}, {
  name: '湖北',
  bg: '#cc99ff',
  coor: [112.2363, 31.1572]
}, {
  name: '山西',
  bg: '#cc99ff',
  coor: [112.4121, 37.6611]
}, {
  name: '广东',
  bg: '#f4b183',
  coor: [113.4668, 22.8076]
}, {
  name: '广西',
  bg: '#f4b183',
  coor: [108.2813, 23.6426]
}, {
  name: '贵州',
  bg: '#f4b183',
  coor: [106.6113, 26.9385]
}, {
  name: '海南',
  bg: '#f4b183',
  coor: [109.9512, 19.2041]
}, {
  name: '云南',
  bg: '#f4b183',
  coor: [101.8652, 25.1807]
}, {
  name: '湖南',
  bg: '#d87b3b',
  coor: [111.5332, 27.3779]
}, {
  name: '江西',
  bg: '#d87b3b',
  coor: [116.0156, 27.29]
}, {
  name: '安徽',
  bg: '#bf9000',
  coor: [117.2461, 32.0361]
}, {
  name: '江苏',
  bg: '#bf9000',
  coor: [120.0586, 32.915]
}, {
  name: '上海',
  bg: '#bf9000',
  coor: [121.4648, 31.2891]
}, {
  name: '北京',
  bg: '#00b050',
  coor: [116.4551, 40.2539]
}, {
  name: '河北',
  bg: '#00b050',
  coor: [115.4004, 37.9688]
}, {
  name: '山东',
  bg: '#00b050',
  coor: [118.7402, 36.4307]
}, {
  name: '天津',
  bg: '#00b050',
  coor: [117.4219, 39.4189]
}, {
  name: '黑龙江',
  bg: '#ffc000',
  coor: [128.1445, 48.5156]
}, {
  name: '吉林',
  bg: '#ffc000',
  coor: [126.4746, 43.5938]
}, {
  name: '辽宁',
  bg: '#ffc000',
  coor: [122.3438, 41.0889]
}, {
  name: '内蒙古',
  bg: '#ffc000',
  coor: [117.5977, 44.3408]
}];
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('map'));
var count1;
var count2;
charts();

function charts() {
  var regionsData = [];
  var i = 0;
  var l = allData.length;
  while (i < l) {
    regionsData.push({
      name: allData[i].name,
      itemStyle: {
        normal: {
          // 背景颜色
          areaColor: allData[i].bg,
          borderColor: '#edebe7'
        },
        emphasis: {
          // 鼠标移上时的颜色
          // areaColor: '#2a333d'
          areaColor: allData[i].bg
        }
      }
    });

    i++;
  }
  option = {
    backgroundColor: 'rgb(144, 144, 144)',
    textStyle: {
      color: '#fff'
    },
    grid: {
      x: 50,
      y: 50,
      x2: 0,
      y2: 0
    },
    title: {
      text: '全国十大战区（省或直辖市）\n\n新车销量动态图',
      top: '5%',
      left: '45%',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      // trigger: 'item'
      formatter: function(obj) {
        // console.log(obj)
        var v = obj.value;
        var t = obj.data.address;
        t = t ? t += '<br>' : '';
        return '<div>' + t + v[2] + '</div>';
      }
    },
    geo: {
      map: 'china',
      top: '5%',
      // right: 30,
      // bottom: 70,
      // left: 50,
      layoutCenter: ['54%', '45%'],
      layoutSize: '110%',
      roam: false,
      regions: regionsData
    },
    radar: {

      indicator: [{
        text: '新疆子公司',
        max: 100
      }, {
        text: '西南大区',
        max: 100
      }, {
        text: '西北大区',
        max: 100
      }, {
        text: '闽浙大区',
        max: 100
      }, {
        text: '华中大区',
        max: 100
      }, {
        text: '华南一区',
        max: 100
      }, {
        text: '华南二区',
        max: 100
      }, {
        text: '华东大区',
        max: 100
      }, {
        text: '华北大区',
        max: 100
      }, {
        text: '东北大区',
        max: 100
      }],
      center: ['20%', '80%'],
      radius: 80
    },
    series: [{
      id: 'map',
      name: '销量',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: convertData(allData),
      symbolSize: function(val) {
        return val[2] / 10;
      },
      symbol: 'circle',
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'fill'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          // color: 'rgba(42,42,42,0.5)',
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [{
            offset: 0,
            color: 'rgba(200, 200, 200, 0.3)' // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(50, 50, 50, 0.3)' // 100% 处的颜色
          }], false),
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    }, {
      type: 'radar',
      title: {
        text: '大区销售目标达成率',
        top: '5%',
        left: 'center',
      },
      tooltip: {
        trigger: 'item'
      },
      itemStyle: {
        normal: {
          areaStyle: {
            type: 'default'
          }
        }
      },
      data: [{
        areaStyle: {
          normal: {
            color: 'rgb(216, 124, 59)'
          }
        },
        value: [
          randomRange(10, 100),
          randomRange(10, 100),
          randomRange(10, 100),
          randomRange(10, 100),
          randomRange(10, 100),
          randomRange(10, 100),
          randomRange(10, 100),
          randomRange(10, 100),
          randomRange(10, 100),
          randomRange(10, 100)
        ],
        name: '达成率'
      }]

    }]
  };

  myChart.setOption(option);
}

function repeatRandom() {
  option.series[0].data = convertData(allData);
  option.series[1].data[0].value = [
    randomRange(10, 100),
    randomRange(10, 100),
    randomRange(10, 100),
    randomRange(10, 100),
    randomRange(10, 100),
    randomRange(10, 100),
    randomRange(10, 100),
    randomRange(10, 100),
    randomRange(10, 100),
    randomRange(10, 100)
  ];
  cars();

  // allSales('#sales .count', randomRange(10000, 199999), 6);
  // allSales('#daySales', randomRange(100, 9999), 4);
  count1.increment();
  count2.increment();

  introTxt(2, randomRange(1000, 9999));
  introTxt(3, randomRange(1000, 9999));
  introTxt(4, randomRange(10, 100) + '%');
  introTxt(5, randomRange(10, 100) + '%');

  myChart.setOption(option);
}

setInterval(function() {
  repeatRandom();
}, 2000);

// 当月累计
count1 = allSales('#sales .count', randomRange(10000, 199999), 6);
// 当日累计
count2 = allSales('#daySales', randomRange(100, 9999), 4);

function allSales(css, ss, l) {
  /*var s = document.querySelector(css);
  var x = String(ss);
  if (x.length < l) {
    var z = l - x.length;
    var sarr = '';
    var i = 0;
    while (i < z) {
      sarr += '0';
      i++;
    }
    x = sarr + x;
  }
  s.innerHTML = cell(x);*/

  return new FlipClock($(css), ss, {
    clockFace: 'Counter'
  });
}

// 汽车
cars();

function cars() {
  var d = document.querySelectorAll('#cars tr');
  var i = 0;
  var l = d.length;
  while (i < l) {
    carPer(i);
    i++;
  }
}

carsHeight();

function carsHeight() {
  var windowHeight = $(window).height();
  var d = document.querySelectorAll('#cars tr');
  var h = windowHeight - ($('#wrapper>table>tbody>tr').eq(0).outerHeight(true) + 2) - $('#cars caption').height();
  var i = 0;
  var l = d.length;
  console.log(h)
  while (i < l) {
    $('#cars tr').eq(i).css({
      height: h / l - 10 + 'px'
    });
    i++;
  }
}

function carPer(i) {
  var d = document.querySelectorAll('#cars tr');
  var bg = d[i].querySelector('.car-bg');
  var p = d[i].querySelector('p');
  var txt = randomRange(60, 98);
  bg.style.height = txt + '%';
  p.innerHTML = txt + '%';
}

function introTxt(i, t) {
  var d = document.querySelectorAll('#intro tr');
  var p = d[i].querySelector('span');
  p.innerHTML = t;
}
