/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-22 17:01:15
 * @LastEditTime: 2022-09-26 16:17:24
 * @FilePath: \custom-chart-plugins\highcharts-column-basic-chart.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cui<devcui@outlook.com>, All Rights Reserved. 
 */

function HighChartsColumnBasicChart({ dHelper }) {
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
                }
            ],
            i18ns: [],
        },
        isISOContainer: 'highcharts',
        dependency: [
            '/custom-chart-plugins/common/highcharts/code/highcharts.js',
            '/custom-chart-plugins/common/highcharts/code/highcharts-3d.js',
            '/custom-chart-plugins/common/highcharts/code/highcharts-more.js',
            '/custom-chart-plugins/common/highcharts/code/css/highcharts.css',
        ],
        meta: {
            id: 'highcharts-column-basic-chart',
            name: '[Highcharts][Column][Basic][Chart]',
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
                    type: 'column'
                },
                title: {
                    text: '月平均降雨量'
                },
                subtitle: {
                    text: '数据来源: WorldClimate.com'
                },
                xAxis: {
                    categories: [
                        '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '降雨量 (mm)'
                    }
                },
                tooltip: {
                    // head + 每个 point + footer 拼接成完整的 table
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        borderWidth: 0
                    }
                },
                series: [{
                    name: '东京',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                }, {
                    name: '纽约',
                    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
                }, {
                    name: '伦敦',
                    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
                }, {
                    name: '柏林',
                    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
                }]
            });
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

            // 获取类型
            const categories = dataset.rows.map(d => d[0])
            const seriesNames = dataset.rows.map(d => d[1])

            // 去重 
            let filteredCategories = []
            categories.forEach((c) => {
                if (!filteredCategories.includes(c)) filteredCategories.push(c)
            })
            let filteredSeriesNames = []
            seriesNames.forEach((c) => {
                if (!filteredSeriesNames.includes(c)) filteredSeriesNames.push(c)
            })

            // 构造指标
            let series = []
            filteredSeriesNames.forEach((s) => {
                const columnSerie = {
                    name: s,
                    data: [],

                }
                dataset.rows.forEach((r) => {
                    if (r[1] === s) {
                        columnSerie.data.push(r[2])
                    }
                })
                series.push(columnSerie)
            })
            instance = Highcharts.chart(containerId, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: title
                },
                subtitle: {
                    text: desc
                },
                xAxis: {
                    categories: filteredCategories,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        borderWidth: 0
                    }
                },
                series: series
            });
        },
        onUnMount() { },
        onResize(options, context) { }
    }
}