/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-22 15:45:50
 * @LastEditTime: 2022-09-22 16:23:21
 * @FilePath: \custom-chart-plugins\highcharts-3d-bar-stack-chart.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cui<devcui@outlook.com>, All Rights Reserved. 
 */


function HighCharts3dStackBarChart({ dHelper }) {
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
        isISOContainer: 'highcharts-3d',
        dependency: [
            '/custom-chart-plugins/common/highcharts/code/highcharts.js',
            '/custom-chart-plugins/common/highcharts/code/highcharts-3d.js',
            '/custom-chart-plugins/common/highcharts/code/highcharts-more.js',
            '/custom-chart-plugins/common/highcharts/code/css/highcharts.css',
        ],
        meta: {
            id: 'highcharts-3d-bar-stack-chart',
            name: '[Highcharts][3d][Bar][Stack][Chart]',
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
            const { window: { Highcharts } } = context
            const { containerId } = options
            instance = Highcharts.chart(containerId, {
                chart: {
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        viewDistance: 25,
                        depth: 40
                    },
                    marginTop: 80,
                    marginRight: 40
                },
                title: {
                    text: '????????????????????????????????????'
                },
                xAxis: {
                    categories: ['??????', '??????', '???', '??????', '??????']
                },
                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: '????????????'
                    }
                },
                tooltip: {
                    headerFormat: '<b>{point.key}</b><br>',
                    pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        depth: 40
                    }
                },
                series: [{
                    name: '??????',
                    data: [5, 3, 4, 7, 2],
                    stack: 'male'
                }, {
                    name: '??????',
                    data: [3, 4, 4, 2, 5],
                    stack: 'male'
                }, {
                    name: '??????',
                    data: [2, 5, 6, 2, 1],
                    stack: 'female'
                }, {
                    name: '??????',
                    data: [3, 0, 4, 4, 3],
                    stack: 'female'
                }]
            });
        },
        onUpdated(options, context) { },
        onUnMount() { },
        onResize(options, context) { }
    }
}