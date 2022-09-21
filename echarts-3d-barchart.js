/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-20 15:21:07
 * @LastEditTime: 2022-09-21 15:19:52
 * @FilePath: \custom-chart-plugins\echarts-3d-barchart.js
 * @Description:
 *
 * Copyright (c) 2022 by cui<devcui@outlook.com>, All Rights Reserved.
 */
function Echarts3dBarchart({ dHelper }) {
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
          if (groupConfigs && groupConfigs.length > 0) {
            const xKey = dHelper.getValueByColumnKey(groupConfigs[0])
            if (xCategory.indexOf(dc[xKey]) === -1) {
              xCategory.push(dc[xKey])
            }
          }
          if (groupConfigs && groupConfigs.length > 1) {
            const yKey = dHelper.getValueByColumnKey(groupConfigs[1])
            if (yCategory.indexOf(dc[yKey]) === -1) {
              yCategory.push(dc[yKey])
            }
          }
          if (groupConfigs && groupConfigs.length > 1 && aggregateConfigs && aggregateConfigs.length > 0) {
            const xKey = dHelper.getValueByColumnKey(groupConfigs[0])
            const yKey = dHelper.getValueByColumnKey(groupConfigs[1])
            const zKey = dHelper.getValueByColumnKey(aggregateConfigs[0])
            data.push([dc[xKey],dc[yKey],dc[zKey]])
          }
        })

        console.log(xCategory, yCategory)
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
              data: data,
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
