/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-22 17:18:05
 * @LastEditTime: 2022-09-26 15:03:33
 * @FilePath: \custom-chart-plugins\highcharts-polar-chart.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cui<devcui@outlook.com>, All Rights Reserved. 
 */

function HighChartsPolarChart({ dHelper }) {
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
            id: 'highcharts-polar-chart',
            name: '[Highcharts][Polar][Chart]',
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
                    polar: true
                },
                title: {
                    text: '极地图'
                },
                pane: {
                    startAngle: 0,
                    endAngle: 360
                },
                xAxis: {
                    tickInterval: 45,
                    min: 0,
                    max: 360,
                    labels: {
                        formatter: function () {
                            return this.value + '°';
                        }
                    }
                },
                yAxis: {
                    min: 0
                },
                plotOptions: {
                    series: {
                        pointStart: 0,
                        pointInterval: 45
                    },
                    column: {
                        pointPadding: 0,
                        groupPadding: 0
                    }
                },
                series: [{
                    type: 'column',
                    name: '柱形',
                    data: [8, 7, 6, 5, 4, 3, 2, 1],
                    pointPlacement: 'between'
                }, {
                    type: 'line',
                    name: '线',
                    data: [1, 2, 3, 4, 5, 6, 7, 8]
                }, {
                    type: 'area',
                    name: '面积',
                    data: [1, 8, 2, 7, 3, 6, 4, 5]
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
                const columnSerie = {
                    name: s,
                    data: [],
                    type: 'column',
                    pointPlacement: 'between'

                }

                const lineSerie = {
                    name: s,
                    data: [],
                    type: 'line',
                }

                const areaSerie = {
                    name: s,
                    data: [],
                    type: 'area',
                }
                dataset.rows.forEach((r) => {
                    if (r[1] === s) {
                        columnSerie.data.push(r[2])
                        lineSerie.data.push(r[2])
                        areaSerie.data.push(r[2])
                    }
                })
                series.push(columnSerie)
                series.push(lineSerie)
                series.push(areaSerie)
            })


            instance = Highcharts.chart(containerId, {
                chart: {
                    polar: true
                },
                title: {
                    text: title
                },
                pane: {
                    startAngle: 0,
                    endAngle: 360
                },
                xAxis: {
                    tickInterval: 360 / filteredCategories.length,
                    min: 0,
                    max: 360,
                    labels: {
                        formatter: function () {
                            const group = 360 / this.value
                            const index = filteredCategories.length / group
                            return filteredCategories[index]
                        }
                    }
                },
                yAxis: {
                    min: 0
                },
                plotOptions: {
                    series: {
                        pointStart: 0,
                        pointInterval: 360 / filteredCategories.length
                    },
                    column: {
                        pointPadding: 0,
                        groupPadding: 0
                    }
                },
                series: series
            });

        },
        onUnMount() { },
        onResize(options, context) { }
    }
}