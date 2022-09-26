/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-22 17:11:30
 * @LastEditTime: 2022-09-26 11:20:41
 * @FilePath: \custom-chart-plugins\highcharts-polar-spider-chart.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cui<devcui@outlook.com>, All Rights Reserved. 
 */

function HighChartsPolarSpiderChart({ dHelper }) {
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
            id: 'highcharts-polar-spider-chart',
            name: '[Highcharts][Polar][Spider][Chart]',
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
                    polar: true,
                    type: 'line'
                },
                title: {
                    text: '预算与支出',
                    x: -80
                },
                pane: {
                    size: '80%'
                },
                xAxis: {
                    categories: ['销售', '市场营销', '发展', '客户支持', '信息技术', '行政管理'],
                    tickmarkPlacement: 'on',
                    lineWidth: 0
                },
                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min: 0
                },
                tooltip: {
                    shared: true,
                    pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    y: 70,
                    layout: 'vertical'
                },
                series: [{
                    name: '预算拨款',
                    data: [43000, 19000, 60000, 35000, 17000, 10000],
                    pointPlacement: 'on'
                }, {
                    name: '实际支出',
                    data: [50000, 39000, 42000, 31000, 26000, 14000],
                    pointPlacement: 'on'
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
                const serie = {
                    name: s,
                    data: [],
                    pointPlacement: 'on'
                }
                dataset.rows.forEach((r) => {
                    if (r[1] === s) {
                        serie.data.push(r[2])
                    }
                })
                series.push(serie)
            })
            instance = Highcharts.chart(containerId, {
                chart: {
                    polar: true,
                    type: 'line'
                },
                title: {
                    text: title,
                    x: -80
                },
                pane: {
                    size: '80%'
                },
                xAxis: {
                    categories: filteredSeriesNames,
                    tickmarkPlacement: 'on',
                    lineWidth: 0
                },
                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min: 0
                },
                tooltip: {
                    shared: true,
                    pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    y: 70,
                    layout: 'vertical'
                },
                series: series
            });

        },
        onUnMount() { },
        onResize(options, context) { }
    }
}