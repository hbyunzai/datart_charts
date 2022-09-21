/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-20 15:21:07
 * @LastEditTime: 2022-09-21 11:41:29
 * @FilePath: \custom-chart-plugins\echarts-3d-barchart.js
 * @Description:
 *
 * Copyright (c) 2022 by cui<devcui@outlook.com>, All Rights Reserved.
 */
function Echarts3dBarchart(params) {
  var dHelper = params.dHelper;
  var instance = null;
  return {
    config: {
      datas: [
        { label: "dimension", key: "dimension", type: "group", allowSameField: false },
        { label: "metrics", key: "metrics", type: "aggregate", allowSameField: false }
      ],
      styles: [],
      i18ns: [],
    },
    isISOContainer: 'echarts-3d',
    dependency: [
      '/custom-chart-plugins/common/simplex-noise.js',
      '/custom-chart-plugins/common/echarts/echarts.js',
      '/custom-chart-plugins/common/echarts/gl/echarts-gl.js',
      '/custom-chart-plugins/common/utils.js',
    ],
    meta: {
      id: 'echarts-3d-barchart',
      name: '[Echarts][3D][Barchart]',
      icon: 'chart',
      requirements: [
        {
          group: null,
          aggregate: null,
        },
      ],
    },
    onMount(options, context) {
      if (!options.containerId || !context.document) return;
      var _echarts = context.window.echarts
      const _element = context.document.getElementById(options.containerId);
      instance = _echarts.init(_element)
      instance.setOption({
        xAxis3D: {
          type: 'category',
          data: [],
        },
        yAxis3D: {
          type: 'category',
          data: []
        },
        zAxis3D: {
          type: 'value',
        },
        grid3D: {
          viewControl: {
            autoRotate: true
          },
          light: {
            main: {
              shadow: true,
              quality: 'ultra',
              intensity: 1.5
            }
          }
        },
        animation: true,
        series: [
          {
            type: 'bar3D',
            data: [],
            stack: 'stack',
            shading: 'lambert',
            emphasis: {
              label: {
                show: true
              }
            }
          }
        ]
      })
    },
    onUpdated(props, context) {
      var _window = context.window
      if (instance) {
        const _xCategory = [];
        const _yCategory = [];
        // 查询哪些字段是维度
        const _group = _window.findGroups(props, 0)
        console.log(_group)
        const _column = _window.finColumnByGroup(_group)
        // 获取维度的下标
        console.log(_column)
        console.log(props)
        // 提取维度

        // 知道哪些字段是指标
        // 获取指标的下标
        // 提取指标
        instance.setOption({
          xAxis3D: {
            type: 'category',
            data: _xCategory,
          },
          yAxis3D: {
            type: 'category',
            data: _yCategory
          },
          zAxis3D: {
            type: 'value',
          },
          grid3D: {
            viewControl: {
              autoRotate: true
            },
            light: {
              main: {
                shadow: true,
                quality: 'ultra',
                intensity: 1.5
              }
            }
          },
          animation: true,
          series: [
            {
              type: 'bar3D',
              data: [],
              stack: 'stack',
              shading: 'lambert',
              emphasis: {
                label: {
                  show: true
                }
              }
            }
          ]
        })
      }
    },
    onUnMount() {
    },
    onResize(opt, context) {
      instance.resize()
    },
  };
}
