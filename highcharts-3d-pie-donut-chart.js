/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-22 15:45:50
 * @LastEditTime: 2022-09-22 16:24:09
 * @FilePath: \custom-chart-plugins\highcharts-3d-donut-pie-chart.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cui<devcui@outlook.com>, All Rights Reserved. 
 */


function HighCharts3dPieChart({ dHelper }) {
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
            id: 'highcharts-3d-pie-donut-chart',
            name: '[Highcharts][3d][Pie][Donut][Chart]',
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
            if (!options.containerId || !context.document) return;
            const { window: { Highcharts } } = context
            const { containerId } = options
            instance = Highcharts.chart(containerId, {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: '简数科技每周水果消耗量'
                },
                subtitle: {
                    text: 'Highcharts 中的3D环形图'
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                    name: '货物金额',
                    data: [
                        ['香蕉', 8],
                        ['猕猴桃', 3],
                        ['桃子', 1],
                        ['橘子', 6],
                        ['苹果', 8],
                        ['梨', 4],
                        ['柑橘', 4],
                        ['橙子', 1],
                        ['葡萄 (串)', 1]
                    ]
                }]
            });
        },
        onUpdated(options, context) { },
        onUnMount() { },
        onResize(options, context) { }
    }
}