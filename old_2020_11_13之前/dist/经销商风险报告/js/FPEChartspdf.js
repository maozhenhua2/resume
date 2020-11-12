var ECharts = {
  /*
   *container:图表呈现的容器，页面元素
   *option:动态配置项(参数)
   */
  ChartConfig: function (container, option) {
    //var chart_path = "./vendor/echart";
    /*配置图表请求路径*/
    //var chart_path_component = "./vendor/EChars2.2.5/chart/";
    require.config({
      paths: {
        echarts: './vendor/echart'
      }
    });
    /*require.config({
      paths: {
        'echarts': chart_path,
        'echarts/chart/bar': chart_path_component + 'bar',
        'echarts/chart/pie': chart_path_component + 'pie',
        'echarts/chart/line': chart_path_component + 'line',
        'echarts/chart/k': chart_path_component + 'k',
        'echarts/chart/scatter': chart_path_component + 'scatter',
        'echarts/chart/radar': chart_path_component + 'radar',
        'echarts/chart/chord': chart_path_component + 'chord',
        'echarts/chart/force': chart_path_component + 'force',
        'echarts/chart/funnel': chart_path_component + 'funnel',
        'echarts/chart/gauge': chart_path_component + 'gauge',
        'echarts/chart/eventRiver': chart_path_component + 'eventRiver',
        'echarts/chart/map': chart_path_component + 'map'
      }
    })*/
    this.option = {chart: {}, option: option, container: container};
    return this.option;
  },

  ChartOptionTemplates: {
    CommonOption: {
      tooltip: {
        trigger: 'axis' //tooltip触发方式:axis以X轴线触发,item以每一个数据项触发
      },
      toolbox: {
        show: true, //是否显示工具栏
        feature: {
          mark: false,
          dataView: {readOnly: false}, //数据预览
          restore: false, //复原
          saveAsImage: false //是否保存图片
        }
      }
    },

    /*饼图*/
    /*Pie: function () {
      var option = {
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c}({d}%)"
        },
        legend: {
          orient: 'horizontal',
          x: 'left',
          y: 'bottom',
          textStyle: {
            fontSize: 12
          },
          data: []
        },
        toolbox: {
          show: false,
          feature: {
            mark: {show: false},
            dataView: {
              show: true,
              readOnly: true,
              optionToContent: ""
            },
            magicType: {
              show: false,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'center',
                  max: 1548
                }
              }
            },
            restore: {show: false},
            saveAsImage: {show: false}
          }
        },
        calculable: false,
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            roseType: '',
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    '#195192', '#2C72B2', '#208EA8', '#289240', '#7BBB48', '#EEE436', '#EEB93A', '#E96F2F', '#E23C27'
                  ];

                  return colorList[params.dataIndex];
                }
              }
            },
            data: []
          }
        ]
      };
      return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    },*/

    /*环饼图*/
    /*Pies: function () {
      var option = {
        title: {
          text: '',
          subtext: '',
          sublink: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b}：{c}({d}%)"
        },
        legend: {
          x: 'left',
          y: "bottom",
          orient: 'horizontal', /!*vertical*!/
          data: []
        },
        toolbox: {
          show: false,
          feature: {
            mark: {show: false},
            dataView: {
              show: true, readOnly: true, optionToContent: ""
            },
            restore: {show: false},
            saveAsImage: {show: false}
          }
        },
        series: []
      };
      return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    },*/

    /*折线图*/
    /*Line: function () {
      var option = {
        title: {
          text: '',
          subtext: '',
          x: 'center'
          //,
          //textStyle: {
          //    color: '#90a3a9'
          //}
        },
        tooltip: {
          trigger: 'item',
        },
        toolbox: {
          show: false,
          feature: {
            mark: {show: false},
            dataView: {show: false, readOnly: false},
            magicType: {show: false, type: ['line', 'bar']},
            restore: {show: false},
            saveAsImage: {show: false}
          }
        },
        legend: {
          x: "left",
          y: "bottom",
          padding: 0,
          textStyle: {
            color: '#90a3a9',
            fontSize: 12
          },
          data: []
        },
        xAxis: [{
          type: 'category',
          name: '',
          data: [],
          boundaryGap: false,
          axisLabel: {
            show: true,
            textStyle: {color: '#90a3a9'}
          }
        }],
        yAxis: [{
          type: 'value',
          name: '',
          axisLabel: {
            show: true,
            textStyle: {color: '#90a3a9'}
          }
        }],
        series: []

      };

      return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    },*/

    /*多折线图，多维条形图,标准面积图*/
    /*Lines: function () {
      var option = {
        title: {
          x: 'center',
          text: '',
          subtext: ''
          //,
          //textStyle: {
          //    color: '#90a3a9'
          //}
        },
        tooltip: {
          trigger: 'axis',
          formatter: "{b}<br/>{c}"
        },
        legend: {
          x: "left",
          y: "bottom",
          padding: 0,
          textStyle: {
            color: '#90a3a9'
          },
          data: [],

        },
        toolbox: {
          show: false,
          feature: {
            mark: {show: false},
            dataView: {
              show: true, readOnly: true,
              optionToContent: ""
            },
            magicType: {show: false, type: ['line', 'bar']},
            restore: {show: false},
            saveAsImage: {show: false}
          }
        },
        calculable: false,
        xAxis: [
          {
            type: 'category',
            name: '',
            boundaryGap: false,
            axisLabel: {
              textStyle: {color: '#90a3a9'},
              formatter: ''
            },
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            axisLabel: {
              textStyle: {color: '#90a3a9'},
              formatter: '{value}'/!*注意单位*!/
            },
            data: []
          }
        ],
        series: []
      };

      return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    },*/

    /*单柱图*/
    Bar: function () {
      var option = {
        title: {
          x: 'center',
          text: '',
          subtext: '',
          textStyle: {
            fontSize: 12,
            fontWeight: 'normal',
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b}<br/>{c}"
        },
        backgroundColor: '#f6f6f6',
        toolbox: {
          show: false,
          feature: {
            mark: {show: false},
            dataView: {
              show: true, readOnly: true,
              optionToContent: ""
            },
            magicType: {show: false, type: ['line', 'bar']},
            restore: {show: false},
            saveAsImage: {show: false}
          }
        },
        grid: {},
        legend: {
          y: 30,
          textStyle: {
            color: '#90a3a9',
            fontSize: 12
          },
          data: []
        },
        xAxis: [{
          type: 'category',
          name: '',
          splitLine: {show: false},
          axisLine: {
            lineStyle: {width: 1}
          },
          //axisLabel: {
          //    show: true,
          //    interval: 'auto',
          //    rotate: 0,
          //    margin: 8,
          //    textStyle: { color: '#90a3a9' }
          //},
          //show: true,
          data: []
        }],
        yAxis: [{
          type: 'value',
          splitLine: {show: false},
          axisLine: {
            lineStyle: {width: 1}
          }
          //name:'',
          //show: true,
          //axisLabel: {
          //    show: true,
          //    textStyle: { color: '#90a3a9' }
          //},
        }],
        series: [{
          name: '',
          axisLabel: {interval: 0},
          type: 'bar',
          barWidth: '50',
          data: []//,
          //,
          //markPoint : {
          //    data : [
          //        {type : 'max', name: '最大值'},
          //        {type : 'min', name: '最小值'}
          //    ]
          //},
          //markLine : {
          //    data : [

          //    ]
          //}
        }]

      };
      return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    },

    /*多柱图,旋风条形图,多维条形图,横竖图,柱折混搭*/
    Bars: function () {
      var option = {
        title: {
          x: 'center',
          y: '',
          text: '',
          subtext: '',
          //textAlign:'center',
          //textStyle: {
          //    fontFamily: '微软雅黑',
          //    color: '#90a3a9',
          //    fontSize: 12
          //}
        },
        toolbox: {
          show: false,
          feature: {
            mark: {show: false},
            dataView: {show: true, readOnly: true, optionToContent: ""},
            magicType: {show: false, type: ['line', 'bar']},
            restore: {show: false},
            saveAsImage: {show: false}
          }
        },
        legend: {
          x: 'left',
          y: "bottom",
          padding: 0,
          //textStyle: {
          //    fontFamily: '微软雅黑',
          //    color: '#90a3a9',
          //    fontSize: 14
          //},
          data: []
        },
        grid: {},
        tooltip: {
          trigger: 'item',
          formatter: "{b}<br/>{c}",
          position: function (p) {
            return [p[0], p[1]];
          }
        },
        xAxis: [{
          type: 'category',
          data: [],
          splitNumber: "", /*设置分割段数*/
          axisLabel: {
            textStyle: {
              //fontSize: '12',
              fontFamily: '微软雅黑'
            },
            rotate: 0
          }
        }],
        yAxis: [{
          type: 'value',
          splitNumber: "", /*设置分割段数*/
          axisLabel: {
            textStyle: {
              //fontSize: '12',
              fontFamily: '微软雅黑'
            },
            formatter: '{value}'
          }
        }],
        series: []
      };
      return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    },

    //折柱混搭（双柱折）
    /*MixBarLine: function () {
      var option = {
        title: {
          x: "center",
          text: '',
          subtext: '',
          sublink: '',
          textStyle: {color: '#90a3a9'}
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{c}',
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: false},
            dataView: {
              show: true,
              readOnly: true,
              optionToContent: ""
            },
            restore: {show: false},
            saveAsImage: {show: false}
          }
        },
        legend: {
          y: 30,
          textStyle: {
            color: '#90a3a9',
            fontSize: 12
          },
          data: []
        },
        xAxis: [{
          type: 'category',
          name: '',
          trigger: 'axis',
          axisLabel: {
            textStyle: {color: '#90a3a9'},
            rotate: 0
          },
          data: []
        }],
        yAxis: [{
          type: 'value',
          name: '',
          axisLabel: {
            textStyle: {color: '#90a3a9'}
          }
        }],
        series: []
      };
      return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);

    },*/

    /*柱折混搭 可合并在Bars中*/
    /*BarLine: function () {
      var option = {
        title: {
          x: "center",
          text: '',
          subtext: '',
          sublink: '',
          textStyle: {
            color: '#90a3a9'
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: false},
            dataView: {show: true, readOnly: true, optionToContent: ""},
            restore: {show: false},
            saveAsImage: {show: false}
          }
        },
        legend: {
          x: "left",
          y: "bottom",
          padding: 0,
          textStyle: {
            color: '#90a3a9',
            fontSize: 12
          },
          data: []
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}'
        },
        xAxis: [{
          type: 'category',
          name: '',
          axisLabel: {
            textStyle: {color: '#90a3a9'},
            rotate: 0
          },
          data: []
        }],
        yAxis: [],
        series: []
      };
      return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    },*/

    /*雷达图*/
    Radar: function () {
      var option = {
        title: {
          text: '',
          subtext: '',
          x: 'center',
          textStyle: {
            color: '#000',
            fontSize: 12
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: false},
            dataView: {show: true, readOnly: true, optionToContent: ""},
            restore: {show: false},
            saveAsImage: {show: false}
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b} {d} ：{c}%'
        },
        legend: {
          x: 'left',
          y: 'bottom',
          orient: "horizontal", /*vertical*/
          textStyle: {
            color: '#000',
            fontSize: 12
          },
          data: []
        },
        calculable: false,
        polar: [{
          name: {
            textStyle: {
              color: '#000',
              fontSize: 12,
              fontWeight: 'normal',
            }
          },
          radius: '65%',
          indicator: {}

        }],
        series: [
          {
            name: '',
            type: 'radar',
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default'
                }
              }
            },
            data: []
          }
        ]
      };
      return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    },

    /*K线图*/
    /*K: function () {
      var option = {
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {

          }
        },
        legend: {
          textStyle: {
            color: '#90a3a9',
            fontSize: 12
          },
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataZoom: {show: false},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: false},
            saveAsImage: {show: false}
          }
        },
        dataZoom: { //数据区域缩放
          show: true,
          realtime: true,
          start: 50,
          end: 100
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            axisTick: {onGap: false},//坐标轴小标记
            splitLine: {show: false},//分隔线
            data: K_datas.xAxisDatas  //Datas
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            boundaryGap: [0.01, 0.01]
          }
        ],
        series: [
          {
            name: '',
            type: 'k',
            data: []
          }
        ]

      };
      return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    },*/

    /*散点图*/
    /*Scatter: function () {
      try {
        var option = {
          title: {
            text: '',
            subtext: ''
          },
          tooltip: {
            trigger: 'axis',
            showDelay: 0,
            axisPointer: {
              type: 'cross',
              lineStyle: {
                type: 'dashed',
                width: 1
              }
            }
          },
          legend: {
            textStyle: {
              color: '#90a3a9',
              fontSize: 12
            },
            data: Scatter_data.category
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataZoom: {show: true},
              dataView: {show: true, readOnly: false},
              restore: {show: false},
              saveAsImage: {show: false}
            }
          },
          xAxis: [
            {
              type: 'value',
              scale: true,
              axisLabel: {
                formatter: ''
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
              axisLabel: {
                formatter: ''
              }
            }
          ],
          series: [],
          tooltip: {
            trigger: 'item',
            formatter: ''
          },

        }
      }
      catch (ex) {
        console.log(ex.message);
      }
      return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    },*/

    /*漏斗图*/
    /*Funnel: function () {
      var option = {
        title: {
          text: '',
          subtext: '',
          x: 'center',
          textStyle: {
            color: '#90a3a9'
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: false},
            dataView: {show: true, readOnly: true, optionToContent: ""},
            restore: {show: false},
            saveAsImage: {show: false}
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c}"
        },
        legend: {
          x: "left",
          y: 'bottom',
          orient: "horizontal",
          textStyle: {
            color: '#90a3a9',
            fontSize: 12
          },
          data: []
        },
        calculable: false,
        series: [
          {
            name: '',
            x: '20%',
            y: '10%',
            type: 'funnel',
            width: '5%',
            height: '55%',
            sort: 'descending',
            itemStyle: {},
            funnelAlign: '',
            maxSize: '20%',
            minSize: '0%',
            data: []
          }
        ]
      };
      return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    },*/

    /*多仪表盘*/
    /*Gauges: function () {
      var option = {
        title: {
          x: 'center',
          text: '',
          subtext: '',
          textStyle: {
            color: '#90a3a9'
          }
        },
        tooltip: {
          formatter: "{b} : {c}%"
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: false},
            dataView: {
              show: true,
              readOnly: true,
              optionToContent: ""
            },
            restore: {show: false},
            saveAsImage: {show: false}
          }
        },
        series: []
      };

      return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    },*/

    /*地图*/
    /*Maps: function () {
      var option = {
        backgroundColor: '',
        color: [],
        title: {
          text: '',
          subtext: '',
          x: 'center',
          textStyle: {
            color: '#90a3a9'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br />{b}{c}'
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: false},
            dataView: {
              show: true,
              readOnly: true,
              optionToContent: ""
            },
            restore: {show: false},
            saveAsImage: {show: false}
          }
        },
        legend: {
          show: true,
          orient: 'vertical',
          x: 'left',
          selectedMode: 'multiple',
          textStyle: {
            color: '#90a3a9'
          },
          data: []
        },
        dataRange: {
          show: true,
          orient: 'vertical', /!*horizontal*!/
          x: 'right',
          y: 'bottom',
          min: 0,
          max: 100,
          text: ['高', '低'],
          precision: 0,
          calculable: true,
          color: [],
          textStyle: {
            color: '#000'
          }
        },
        series: []
      };
      return $.extend({}, option);
    }*/
  },

  Charts: {
    /*
     *函数名称：RenderChart
     *参数1：option
     *参数2：functionName
     *参数3：eventName
     */
    RenderChart: function (option, functionName, eventName) {
      require([
          'echarts',
          //'echarts/chart/line',
          'echarts/chart/bar',
          //'echarts/chart/pie',
          //'echarts/chart/k',
          //'echarts/chart/scatter',
          'echarts/chart/radar',
          //'echarts/chart/chord',
          //'echarts/chart/force',
          //'echarts/chart/funnel',
          //'echarts/chart/gauge',
          //'echarts/chart/eventRiver',
          //'echarts/chart/map'
        ],
        function (ec) {
          //console.log(option.option)
          try {
            var echarts = ec;
            if (option.chart && option.chart.clear) {
              //option.chart.dispose();
              option.chart.clear();
              option.chart.restore();
            }


            option.chart = echarts.init(option.container);
            /*暂无数据控制*/
            if (option.option.series.length == 0) {
              option.chart.showLoading({
                text: '暂无数据',
                effect: 'bubble',
                textStyle: {
                  fontSize: 12
                }
              });
            }
            else {
              option.chart.showLoading();
              setTimeout(function () {
                option.chart.hideLoading();
              }, 200);
            }

            /*页面自适应*/
            //window.addEventListener("resize", function () {
            //  setTimeout(function () {
            //    option.chart.resize();
            //  }, 500);
            //});

            /*事件绑定*/
            if (functionName != "undefined" && functionName != "" && functionName != null) {
              var echartConfig = require('echarts/config');
              switch (eventName) {
                case "click": {
                  option.chart.on(echartConfig.EVENT.CLICK, functionName);

                }
                  break;
                default:
                  break;
              }
            }
            option.chart.setOption(option.option, true);
            option.option.callback(option);
          } catch (ex) {
            //console.log(ex.message);
          }
        });
    },
    /*
     *参数option 设置option的项
     *参数functionName 函数名称
     *参数type 函数类型{ 0:绑定地图选择事件 1:绑定图例选择事件}
     */
    /*RenderMap: function (option, functionName, type) {
      require([
        'echarts',
        'echarts/chart/map'
      ], function (ec) {
        var echarts = ec;
        //if (option.chart && option.chart.dispose) {
        //    option.chart.dispose();
        //}
        //option.chart.clear();
        option.chart = echarts.init(option.container);

        /!*暂无数据控制*!/
        if (option.option.series.length == 0) {
          option.chart.showLoading({
            text: '暂无数据',
            effect: 'bubble',
            textStyle: {
              fontSize: 12
            }
          });
        }
        else {
          option.chart.showLoading();
          setTimeout(function () {
            option.chart.hideLoading();
          }, 200);
        }

        /!*页面自适应 测试成功*!/
        window.addEventListener("resize", function () {
          option.chart.resize();
        });
        option.chart.setOption(option.option, true);

        if (functionName != "undefined" && functionName != "" && functionName != null) {
          var echartConfig = require('echarts/config');
          switch (type) {
            case 0: {
              option.chart.on(echartConfig.EVENT.MAP_SELECTED, functionName);
            }
              break;
            case 1: {
              option.chart.on(echartConfig.EVENT.LEGEND_SELECTED, functionName);
            }
              break;
            default:
              break;
          }
        }
      });
    }*/
  }
};

//判断数组中是否包含某个元素
Array.prototype.contains = function (obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};