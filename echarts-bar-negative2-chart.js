/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-22 17:46:23
 * @LastEditTime: 2022-09-22 17:48:14
 * @FilePath: \custom-chart-plugins\echarts-bar-negative2-chart.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cui<devcui@outlook.com>, All Rights Reserved. 
 */
function EchartsBarNegative2Chart({ dHelper }) {
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
        isISOContainer: 'echarts',
        dependency: [
            '/custom-chart-plugins/common/echarts/echarts.js',
        ],
        meta: {
            id: 'echarts-bar-negative2-chart',
            name: '[Echarts][Bar][Negative2][Chart]',
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
            const labelRight = {
                position: 'right'
            };
            let option = {
                title: {
                    text: 'Bar Chart with Negative Value'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: 80,
                    bottom: 30
                },
                xAxis: {
                    type: 'value',
                    position: 'top',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    axisLine: { show: false },
                    axisLabel: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    data: [
                        'ten',
                        'nine',
                        'eight',
                        'seven',
                        'six',
                        'five',
                        'four',
                        'three',
                        'two',
                        'one'
                    ]
                },
                series: [
                    {
                        name: 'Cost',
                        type: 'bar',
                        stack: 'Total',
                        label: {
                            show: true,
                            formatter: '{b}'
                        },
                        data: [
                            { value: -0.07, label: labelRight },
                            { value: -0.09, label: labelRight },
                            0.2,
                            0.44,
                            { value: -0.23, label: labelRight },
                            0.08,
                            { value: -0.17, label: labelRight },
                            0.47,
                            { value: -0.36, label: labelRight },
                            0.18
                        ]
                    }
                ]
            };
            instance.setOption(option)
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
