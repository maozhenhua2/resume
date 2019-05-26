header();
setBarCodeId();

function header() {
  var head = document.querySelectorAll('.header');
  var i = 0;
  var l = head.length;
  for (; i < l; i++) {
    var h = '<div class="left-tri"></div>' +
      '<div class="header-content">' +
      '<img class="logo" src="" alt="" />' +
      '<p>汽车特约店季度风险评估报告</p>' +
      '<img class="logo-txt" src="" alt="" />' +
      '</div>' +
      '<div class="right-tri"></div>';
    head[i].innerHTML = h;

    var page = document.createElement('div');
    page.className = 'page-number';
    page.innerHTML = '<div class="left-tri"></div>' +
      '<div>' + (i + 1) + '/5</div>' +
      '<div class="right-tri"></div>';

    head[i].parentElement.insertBefore(page, head[i].nextElementSibling);

    if (i === 0) {
      var footer = document.createElement('div');
      footer.className = 'cover-footer';
      head[i].parentElement.appendChild(footer);
    } else {
      var pageBreak = document.createElement('div');
      pageBreak.className = 'page-break';

      head[i].parentElement.parentElement.insertBefore(pageBreak, head[i].parentElement);
    }

  }



}

function setTitle() {
  var right = document.querySelectorAll('table td.right');
  var i = 0;
  var l = right.length;
  for (; i < l; i++) {
    (function (index) {
      var dom = right[index].querySelectorAll('.chart-box');
      var i = 0;
      var l = dom.length;

      if (l > 1) {
        for (; i < l; i++) {
          if ((i + 1) % 2 === 0) {
            var pH = dom[i - 1].querySelector('.char-title');
            var nH = dom[i].querySelector('.char-title');
            var h = Math.max(pH.clientHeight, nH.clientHeight);
            dom[i - 1].querySelector('.char-title').style.minHeight = h + 'px';
            dom[i].querySelector('.char-title').style.minHeight = h + 'px';
          }
        }
      }
    }(i));
  }
}

var cache = {
  info: GetDealerRiskInfo,
  point: GetDealerRiskReportTotalPoint,
  radar: GetDealerRiskReportRadar,
  bar: GetDealerRiskReportBarGraph
};

if (cache.point && cache.radar && cache.bar && cache.info) {
  loadData([cache.point], [cache.radar], [cache.bar], [cache.info]);
} else {
  load();
}

function load() {
  var DealerCode = getQueryStringByName('DealerCode');
  var ReportStartDate = getQueryStringByName('ReportStartDate');
  var ReportEndDate = getQueryStringByName('ReportEndDate');

  if (DealerCode == "" || ReportStartDate == "") {
    return;
  }

  var reportDateArray = ReportStartDate.split('-');
  var url = '?DealerCode=' + DealerCode + '&ReportStartDate=' + ReportStartDate + '&ReportEndDate=' + ReportEndDate;

  $.when(
    //
    $.ajax({
      url: Application_Path + '/Common/GetDealerRiskReportTotalPoint' + url,
      type: 'get'
    }),
    // 雷达
    $.ajax({
      url: Application_Path + '/Common/GetDealerRiskReportRadar' + url,
      type: 'get'
    }),
    // 柱
    $.ajax({
      url: Application_Path + '/Common/GetDealerRiskReportBarGraph' + url,
      type: 'get'
    }),
    // 经销商信息
    $.ajax({
      url: Application_Path + '/Common/GetDealerRiskInfo?DealerCode=' + DealerCode,
      type: 'get'
    })
  )
    .done(function (data1, data2, data3, data4) {
      loadData(data1, data2, data3, data4);
    })
    .fail(function (data) {
      console.log('error: ' + data);
    });

}

function loadData(data1, data2, data3, data4) {
  if (data4[0].status) {
    //console.log(data4[0].dataList)
    $('#DealerCode').html(data4[0].dataList.DealerCode);
    $('#DealerName').html(data4[0].dataList.DealerName);
    $('#AreaName').html(data4[0].dataList.AreaName);
    $('#OpenTime').html(data4[0].dataList.OpenTime);
  }
  // 特约店综合评估结果
  if (data1[0].status) {
    var result = data1[0].dataList;
    var lightScore = $('.light-score');
    lightScore.eq(0).children('span').eq(score(result[1].Point)).addClass('active').siblings().removeClass('active');
    lightScore.eq(1).children('span').eq(score(result[0].Point)).addClass('active').siblings().removeClass('active');
  }

  // 雷达图
  if (data2[0].status) {
    var radarData = changeRadarData(data2[0].dataList);

    var charBox = {
      type1: $('.echart-div').eq(0),
      type2: $('.echart-div').eq(1),
    };


    eachRadarData(radarData, function (key, data) {
      var chartData = data[key];
      var id = 'radar' + key;
      charBox[key].attr('id', id);

      var i = 0;
      var l = chartData.length;
      var indicator = [];
      var dealer = [];
      var contory = [];
      var maxArr = [];
      for (; i < l; i++) {
        var text = chartData[i].KpiName;
        var max = Math.max(chartData[i].NumValue, chartData[i].CountryValue);
        max = Math.ceil(max);
        maxArr.push(max);
        indicator.push({
          text: text
        });
        dealer.push(chartData[i].NumValue);
        contory.push(chartData[i].CountryValue);
      }
      var max = Math.max.apply(null, maxArr);
      indicator = setMax(indicator, max);
      var option = defRadarOpt();
      option.title.text = '';
      option.polar[0].indicator = indicator;
      option.series = [
        {
          type: 'radar',
          itemStyle: {
            normal: {
              label: {
                textStyle: {fontSize: 10, color: "#000"}
              }
            }
          },
          data: [
            {
              value: contory,
              name: '全国平均',
              itemStyle: {
                normal: {
                  color: 'rgba(105, 137, 179, 1)',
                  lineStyle: {
                    type: 'solid',
                    width: 3
                  },
                  label: {
                    textStyle: {
                      color: '#ccc',
                      fontSize: 12
                    },
                    formatter: function (data) {
                      return parseFloat(data.value).toFixed(2);
                    },
                    show: true
                  }
                }
              }
            },
            {
              value: dealer,
              name: '经销商',
              itemStyle: {
                normal: {
                  color: 'rgba(167, 52, 44, 1)',
                  lineStyle: {
                    type: 'solid',
                    width: 3
                  },
                  label: {
                    textStyle: {
                      color: '#ccc',
                      fontSize: 12
                    },
                    formatter: function (data) {
                      return parseFloat(data.value).toFixed(2);
                    },
                    show: true
                  }
                }
              }
            }

          ]
        }
      ];

      renderChart(id, option);


    })

  }


  // 柱图
  if (data3[0].status) {
    var data = data3[0].dataList;

    //console.log(JSON.stringify(data))

    var i = 0;
    var l = data.length;
    for (; i < l; i++) {
      var id = data[i].KpiCode;
      var KpiName = data[i].KpiName;
      var FormulaDesc = data[i].FormulaDesc;
      var WarningLight = data[i].WarningLight;

      var o = $('#' + id);
      var title = o.children('.char-title').children('p');
      title.eq(0).children('span').eq(1).html(KpiName);
      title.eq(0).children('span').eq(2).addClass('level' + WarningLight);
      title.eq(1).html(FormulaDesc);

      var chartId = 'chart' + i;
      o.children('.char').attr('id', chartId);

      var series = [];
      var Unit = '';

      series[0] = Number(data[i].NumValue);
      series[1] = Number(data[i].CountryValue);

      if (data[i].Unit === '%') {
        Unit = '%';
        series[0] = series[0] * 100;
        series[1] = series[1] * 100;
      } else {
        Unit = data[i].Unit;
      }


      series[0] = series[0].toFixed(data[i].DecimalPointDigit);
      series[1] = series[1].toFixed(data[i].DecimalPointDigit);


      var option = defBarOpt();
      (function (Unit) {
        option.title.text = KpiName;
        option.yAxis[0].axisLabel.formatter = function (value) {
          return value + Unit;
        };
        option.series = [{
          name: '单店值',
          type: 'bar',
          itemStyle: {
            normal: {
              color: function (params) {
                // build a color map as your need.
                var colorList = ['#00b0f0', '#9eca06'];
                return colorList[params.dataIndex]
              },
              label: {
                show: true,
                position: 'top',
                color: ['red', 'yellow'],
                formatter: function (data) {
                  return data.value + Unit;
                }
              }
            }
          },
          data: series
        }];
      })(Unit)

      renderChart(chartId, option);

      setTitle();
    }
  }
}

// 配置柱图的id
function setBarCodeId() {
  var barList = [
    // 流动风险评估结果
    {"KpiCode": "C0106003", "KpiName": "流动比率", "FormulaDesc": "流动资产合计/ 流动负债总计"},
    {"KpiCode": "C0107003", "KpiName": "资产负债率", "FormulaDesc": "总负债/总资产"},
    {"KpiCode": "C0209001", "KpiName": "利息保障倍数", "FormulaDesc": "(利润总额+财务费用)/利息费用"},
    {"KpiCode": "C0106004", "KpiName": "产权比率", "FormulaDesc": "总负债/所有者权益"},
    // 流动风险评估结果
    {"KpiCode": "C0409002", "KpiName": "总资产回报率", "FormulaDesc": "净利润/总资产"},
    // 管理风险评估结果
    {"KpiCode": "C0107005", "KpiName": "应收账款年周转次数", "FormulaDesc": "营业收入/((应收帐款余额年初数+应收帐款余额年末数)/2)"},
    {"KpiCode": "C0408002", "KpiName": "净利润增长率", "FormulaDesc": "(本期净利润/上期净利润-1)*100%"},
    {"KpiCode": "A0404002", "KpiName": "新车库存周转次数(年)", "FormulaDesc": "(当期新车销售成本/((期初新车库存金额+期末新车库存金额)/2))*12"},
    {"KpiCode": "B0404002", "KpiName": "零部件库存周转次数(年)", "FormulaDesc": "(当期零部件销售成本/((期初零部件库存金额+期末零部件库存金额)/2))*12"},
    {"KpiCode": "C0408001", "KpiName": "总费用占总毛利比", "FormulaDesc": "(总费用/总毛利)*100%"},
    {"KpiCode": "A0403022", "KpiName": "库销比例", "FormulaDesc": "(期末存货量/当期月均销量)*100%"},
    // 运营风险评估结果
    {"KpiCode": "C0408011", "KpiName": "售后vs水平事业毛利占总毛利比", "FormulaDesc": "((售后毛利+水平事业毛利)/总毛利)*100%"},
    {"KpiCode": "C0406004", "KpiName": "主营业务收入增长率", "FormulaDesc": "(本期主营业务收入/上期主营业务-1)*100%"},
    {"KpiCode": "C0409001", "KpiName": "经营净利率", "FormulaDesc": "(净利润/主营业务收入)*100%"},
    {"KpiCode": "B0107002", "KpiName": "零服吸收率", "FormulaDesc": "售后维修业务毛利/(总费用-新车销售业务变动费用)"},
    // 运营管理行为评估结果
    {"KpiCode": "A0403001", "KpiName": "新车开票完成率", "FormulaDesc": "新车实际开票数/新车目标开票数"},
    {"KpiCode": "B0403001", "KpiName": "零部件开票完成率", "FormulaDesc": "零部件实际开票金额/零部件目标开票金额"},
    {"KpiCode": "A0403002", "KpiName": "车交付目标完成率", "FormulaDesc": "新车交付完成数量/新车交付目标数量"},
    {"KpiCode": "C0304004", "KpiName": "核心岗位流失率", "FormulaDesc": "核心岗位人员数/核心岗位离职人员数"},
    // 客户管理行为评估结果
    {"KpiCode": "A0304034", "KpiName": "新增潜客总量占新车销量比", "FormulaDesc": "新增潜客总量/新车销量"},
    {"KpiCode": "A0303001", "KpiName": "月新增成交客户", "FormulaDesc": "当期成交客户"},
    {"KpiCode": "B0303017", "KpiName": "客户流失率", "FormulaDesc": "(档案客户数-年度活跃客户数)/档案客户数"},
    // 财务信用评估结果
    {"KpiCode": "C0108001", "KpiName": "应收账款异常", "FormulaDesc": "应收账款周转天数"},
    {"KpiCode": "A0403021", "KpiName": "新车库龄占比", "FormulaDesc": "新车库存天数"},
    {"KpiCode": "B0404003", "KpiName": "零部件库龄占比", "FormulaDesc": "零部件库存天数"},
  ];
  var charBox = $('.chart-box');
  var i = 0;
  var l = charBox.length;
  for (; i < l; i++) {
    if (barList[i].KpiCode) {
      charBox.eq(i).attr('id', barList[i].KpiCode);
    }
  }
}


function setMax(data, max) {
  var i = 0;
  var l = data.length;
  for (; i < l; i++) {
    data[i].max = max;
  }
  return data;
}

// 判断分数等级
function score(s) {
  if (s >= 0 && s <= 15) {
    return 0;
  } else if (s > 15 && s <= 35) {
    return 1;
  } else if (s > 35 && s <= 60) {
    return 2;
  } else if (s > 60 && s <= 100) {
    return 3;
  }
}

// 分割2个雷达图的数据
function changeRadarData(data) {
  var i = 0;
  var l = data.length;
  var o = {};
  for (; i < l; i++) {
    if (!o['type' + data[i].RadarType]) {
      o['type' + data[i].RadarType] = [];
    }
    o['type' + data[i].RadarType].push(data[i]);
  }
  return o;
}

function eachRadarData(data, callback) {
  for (var key in data) {
    callback(key, data);
  }
}

/*js url 接收非中文字符*/
function getQueryStringByName(name) {
  var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
  if (result == null || result.length < 1) {
    return "";
  }
  return result[1];
}

// 默认柱图参数
function defBarOpt() {
  return {
    renderAsImage: true,
    calculable: false,
    title: {
      show: true,
      textStyle: {
        fontFamily: 'microsoft yahei',
        fontSize: 20
      },
      x: 'center',
      y: 10,
    },
    backgroundColor: '#fff',
    color: ['#00b0f0', '#9eca06'],
    grid: {
      x: 80,
      y: 65,
      x2: 60,
      y2: 35,
      borderWidth: 0,
      borderColor: '#000'
    },
    xAxis: [{
      type: 'category',
      data: ['单店值', '全国平均值'],
      axisLine: { // 轴线
        show: true,
        lineStyle: {
          color: '#ccc',
          type: 'solid',
          width: 1
        }
      },
      axisTick: { // 轴标记
        show: false,
      },
      splitLine: { // 背景网格
        show: false
      }
    }],
    yAxis: [{
      type: 'value',
      splitNumber: 4,
      axisLine: { // 轴线
        show: true,
        lineStyle: {
          color: '#ccc',
          type: 'solid',
          width: 1
        }
      },
      axisLabel: {
        formatter: function (value) {
          return value + '%'
        }
      },
      splitLine: {
        show: false
      }
    }],
    series: []
  };
}

// 默认雷达图参数
function defRadarOpt() {
  return {
    renderAsImage: true,
    calculable: false,
    backgroundColor: '#565959',
    title: {
      x: 'center',
      padding: 10,
      textStyle: {
        color: '#fff',
        fontFamily: 'microsoft yahei',
        fontSize: 20
      }
    },
    legend: {
      x: '80%',
      y: '20px',
      orient: 'vertical',
      textStyle: {
        color: '#eee'
      },
      data: ['经销商', '全国平均']
    },
    polar: [{
      center: ['50%', '60%'],
      radius: '70%',
      indicator: [],
      splitNumber: 4,
      name: {
        textStyle: {
          color: '#ccc',
          fontSize: 12
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 0.0)']
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(70, 60, 60, 0.5)'
        }
      }
    }],
    series: []
  };
}

// 生成图表
function renderChart(id, option) {
  var dom = document.getElementById(id);
  var opt = ECharts.ChartConfig(dom, option);
  ECharts.Charts.RenderChart(opt);
  return opt;
}
