/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-20 15:21:07
 * @LastEditTime: 2022-09-20 18:41:35
 * @FilePath: \custom-chart-plugins\echarts-3d-barchart.js
 * @Description:
 *
 * Copyright (c) 2022 by cui<devcui@outlook.com>, All Rights Reserved.
 */
function Echarts3dBarchart({ dHelper }) {
  console.log(dHelper);
  return {
    config: {
      datas: [
        {
          label: 'dimension',
          key: 'dimension',
          actions: ['sortable', 'alias'],
        },
        {
          label: 'metrics',
          key: 'metrics',
          rows: [],
          actions: ['format', 'aggregate'],
        },
      ],
      styles: [
        {
          label: 'label',
          key: 'label',
          comType: 'group',
          rows: [
            {
              label: 'showLabel',
              key: 'showLabel',
              default: false,
              comType: 'checkbox',
            },
            {
              label: 'showLabelBySwitch',
              key: 'showLabelBySwitch',
              default: true,
              comType: 'switch',
              watcher: {
                deps: ['showLabel'],
                action: props => {
                  return {
                    comType: props.showLabel ? 'checkbox' : 'switch',
                    disabled: props.showLabel,
                  };
                },
              },
            },
            {
              label: 'showDataColumns',
              key: 'dataColumns',
              comType: 'select',
              options: [
                {
                  getItems: cols => {
                    const sections = (cols || []).filter(col =>
                      ['metrics', 'dimension'].includes(col.key),
                    );
                    const columns = sections.reduce(
                      (acc, cur) => acc.concat(cur.rows || []),
                      [],
                    );
                    return columns.map(c => ({
                      key: c.uid,
                      value: c.uid,
                      label:
                        c.label || c.aggregate
                          ? `${c.aggregate}(${c.colName})`
                          : c.colName,
                    }));
                  },
                },
              ],
            },
            {
              label: 'font',
              key: 'font',
              comType: 'font',
            },
          ],
        },
      ],
      i18ns: [],
    },
    isISOContainer: 'echarts-3d',
    dependency: [
      '/custom-chart-plugins/common/simplex-noise.js',
      '/custom-chart-plugins/common/echarts/echarts.js',
      '/custom-chart-plugins/common/echarts/gl/echarts-gl.js',
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
      const { window: { echarts, SimplexNoise } } = context;
      window['getComputedStyle'] = context.window.getComputedStyle
      function generateData() {
        var data = [];
        var noise = new SimplexNoise(Math.random);
        for (var i = 0; i <= 10; i++) {
          for (var j = 0; j <= 10; j++) {
            var value = noise.noise2D(i / 5, j / 5);
            data.push([i, j, value * 2 + 4]);
          }
        }
        return data;
      }
      var series = [];
      for (var i = 0; i < 10; i++) {
        series.push({
          type: 'bar3D',
          data: generateData(),
          stack: 'stack',
          shading: 'lambert',
          emphasis: {
            label: {
              show: false
            }
          }
        });
      }
      const instance = echarts.init(document)
      instance.setOption({
        xAxis3D: {
          type: 'value'
        },
        yAxis3D: {
          type: 'value'
        },
        zAxis3D: {
          type: 'value'
        },
        grid3D: {
          viewControl: {
            // autoRotate: true
          },
          light: {
            main: {
              shadow: true,
              quality: 'ultra',
              intensity: 1.5
            }
          }
        },
        series: series
      })
    },
    onUpdated(props, context) { },
    onUnMount() { },
    onResize(opt, context) { },
  };
}
