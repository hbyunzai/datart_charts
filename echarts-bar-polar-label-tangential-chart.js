/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-22 17:43:14
 * @LastEditTime: 2022-09-22 17:47:05
 * @FilePath: \custom-chart-plugins\echarts-bar-polar-label-tangential-chart.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cui<devcui@outlook.com>, All Rights Reserved. 
 */
function EchartsBarPolarLabelTangentialChart({ dHelper }) {
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
            '/custom-chart-plugins/common/echarts/echarts.js',
        ],
        meta: {
            id: 'echarts-3d-bar-polar-label-tangential-chart',
            name: '[Echarts][Bar][Polar][Label][Tangential][Chart]',
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
                title: [
                    {
                        text: 'Tangential Polar Bar Label Position (middle)'
                    }
                ],
                polar: {
                    radius: [30, '80%']
                },
                angleAxis: {
                    max: 4,
                    startAngle: 75
                },
                radiusAxis: {
                    type: 'category',
                    data: ['a', 'b', 'c', 'd']
                },
                tooltip: {},
                series: {
                    type: 'bar',
                    data: [2, 1.2, 2.4, 3.6],
                    coordinateSystem: 'polar',
                    label: {
                        show: true,
                        position: 'middle',
                        formatter: '{b}: {c}'
                    }
                }
            })
        },
        onUpdated(options, context) {
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
