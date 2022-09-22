/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-20 15:21:07
 * @LastEditTime: 2022-09-22 16:25:04
 * @FilePath: \custom-chart-plugins\echarts-3d-bar-chart.js
 * @Description:
 *
 * Copyright (c) 2022 by cui<devcui@outlook.com>, All Rights Reserved.
 */
function ECharts3dBarChart({ dHelper }) {
  let instance = null;
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
      '/custom-chart-plugins/common/echarts/gl/echarts-gl.js'
    ],
    meta: {
      id: 'echarts-3d-bar-chart',
      name: '[Echarts][3d][Bar][Chart]',
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
      const { window: { echarts } } = context
      const element = context.document.getElementById(options.containerId);
      instance = echarts.init(element)
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
    onUpdated({ config, dataset }, { window }) {
      if (instance) {
        const data = [];
        const xCategory = [];
        const yCategory = [];
        const dataConfigs = config.datas || [];
        const groupConfigs = dataConfigs.filter(c => c.type === 'group').flatMap(config => config.rows || []);
        const aggregateConfigs = dataConfigs.filter(c => c.type === 'aggregate').flatMap(config => config.rows || []);
        const objDataColumns = dHelper.transformToObjectArray(dataset.rows, dataset.columns);
        objDataColumns.forEach((dc) => {
          const xKey = dHelper.getValueByColumnKey(groupConfigs[0])
          if (xCategory.indexOf(dc[xKey]) === -1) {
            xCategory.push(dc[xKey])
          }
          const yKey = dHelper.getValueByColumnKey(groupConfigs[1])
          if (yCategory.indexOf(dc[yKey]) === -1) {
            yCategory.push(dc[yKey])
          }
          const zKey = dHelper.getValueByColumnKey(aggregateConfigs[0])
          data.push([dc[xKey], dc[yKey], dc[zKey]])
        })
        const series = data.map((d, index) => {
          return {
            type: 'bar3D',
            data: [d],
            stack: [d[0], d[1]],
            shading: 'lambert',
            emphasis: {
              label: {
                show: true
              }
            }
          }
        })
        instance.setOption({
          xAxis3D: {
            type: 'category',
            data: xCategory,
          },
          yAxis3D: {
            type: 'category',
            data: yCategory
          },
          zAxis3D: {
            type: 'value',
          },
          grid3D: {
            viewControl: {
              autoRotate: false
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
          series: series
        })
      }
    },
    onUnMount() {
      if (instance) {
        instance.dispose();
      }
    },
    onResize(options, context) {
      if (instance) {
        instance.resize()
      }
    },
  };
}
