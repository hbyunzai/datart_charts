/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-22 16:20:54
 * @LastEditTime: 2022-09-28 10:17:56
 * @FilePath: \custom-chart-plugins\highcharts-3d-cylinder-chart.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cui<devcui@outlook.com>, All Rights Reserved. 
 */
function HighCharts3dCylinderChart({ dHelper }) {
    let instance = null;
    return {
        config: {
            datas: [
                { label: "dimension", key: "dimension", type: "group", allowSameField: false },
                { label: "metrics", key: "metrics", type: "aggregate", allowSameField: false }
            ],
            styles: [
                {
                    label: '标题',
                    key: 'title',
                    comType: 'input',
                },
                {
                    label: '描述',
                    key: 'desc',
                    comType: 'input',
                },
                {
                    label: '图例',
                    key: 'name',
                    comType: 'input',
                }
            ],
            i18ns: [],
        },
        isISOContainer: 'highcharts-3d-cylinder',
        dependency: [
            '/custom-chart-plugins/common/highcharts/code/highcharts.js',
            '/custom-chart-plugins/common/highcharts/code/highcharts-3d.js',
            '/custom-chart-plugins/common/highcharts/code/highcharts-more.js',
            '/custom-chart-plugins/common/highcharts/code/modules/cylinder.js',
            '/custom-chart-plugins/common/highcharts/code/css/highcharts.css',
        ],
        meta: {
            id: 'highcharts-3d-cylinder-chart',
            name: '[Highcharts][3d][Cylinder][Chart]',
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
            Highcharts.chart(containerId, {
                chart: {
                    type: 'cylinder',
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        depth: 50,
                        viewDistance: 25
                    }
                },
                title: {
                    text: 'Highcharts 3D 圆柱图'
                },
                plotOptions: {
                    series: {
                        depth: 25,
                        colorByPoint: true
                    }
                },
                xAxis: {
                    categories: Highcharts.getOptions().lang.shortMonths
                },
                series: [{
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                    name: 'Cylinders',
                    showInLegend: false
                }]
            })
        },
        onUpdated(options, context) {
            if (!options.containerId || !context.document) return;
            const { config, dataset, containerId } = options;
            if (!dataset || !dataset.rows || dataset.rows.length === 0) return
            const { window: { Highcharts } } = context
            const styleConfigs = config.styles;
            // 标题
            let title = styleConfigs.filter((style) => style.key === 'title')
            title = title.length > 0 ? title[0].value : 'title'
            // 描述
            let desc = styleConfigs.filter((style) => style.key === 'desc')
            desc = desc.length > 0 ? desc[0].value : 'desc'
            // 图例
            let name = styleConfigs.filter((style) => style.key === 'name')
            name = name.length > 0 ? name[0].value : 'name'


            Highcharts.chart(containerId, {
                chart: {
                    type: 'cylinder',
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        depth: 50,
                        viewDistance: 25
                    }
                },
                title: {
                    text: title
                },
                subtitle: {
                    text: desc
                },
                plotOptions: {
                    series: {
                        depth: 25,
                        colorByPoint: true
                    }
                },
                xAxis: {
                    categories: dataset.rows.map((d) => d[0])
                },
                series: [{
                    data: dataset.rows.map((d) => d[1]),
                    name: name,
                    showInLegend: false
                }]
            })
        },
        onUnMount() { },
        onResize(options, context) { }
    }
}