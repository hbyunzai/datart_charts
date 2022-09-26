/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-22 17:20:31
 * @LastEditTime: 2022-09-26 15:08:07
 * @FilePath: \custom-chart-plugins\highcharts-pyramid-chart.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cui<devcui@outlook.com>, All Rights Reserved. 
 */
function HighChartsPyramidChart({ dHelper }) {
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
        isISOContainer: 'highcharts-pyramid',
        dependency: [
            '/custom-chart-plugins/common/highcharts/code/highcharts.js',
            '/custom-chart-plugins/common/highcharts/code/highcharts-more.js',
            '/custom-chart-plugins/common/highcharts/code/modules/funnel.js',
            '/custom-chart-plugins/common/highcharts/code/modules/exporting.js',
            '/custom-chart-plugins/common/highcharts/code/css/highcharts.css',
        ],
        meta: {
            id: 'highcharts-pyramid-chart',
            name: '[Highcharts][Pyramid][Chart]',
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
                    type: 'pyramid',
                    marginRight: 100
                },
                title: {
                    text: 'Title',
                    x: -50
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b> ({point.y:,.0f})',
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                            softConnector: true
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                series: [
                    {
                        name: 'Series Title',
                        data: [
                            ['data1', 15654],
                            ['data2', 4064],
                            ['data3', 1987],
                            ['data4', 976],
                            ['data5', 846]
                        ]
                    }]
            });
        },
        onUpdated(options, context) {
            if (!options.containerId || !context.document) return;
            const { window: { Highcharts } } = context
            const { config, dataset, containerId } = options;
            if (!dataset || !dataset.rows || dataset.rows.length === 0) return
            const dataConfigs = config.datas || [];
            const styleConfigs = config.styles;
            const groupConfigs = dataConfigs
                .filter(c => c.type === 'group')
                .flatMap(config => config.rows || []);
            const aggregateConfigs = dataConfigs
                .filter(c => c.type === 'aggregate')
                .flatMap(config => config.rows || []);

            const objDataColumns = dHelper.transformToObjectArray(
                dataset.rows,
                dataset.columns,
            );

            let desc = styleConfigs.filter((style) => style.key === 'desc')
            desc = desc.length > 0 ? desc[0].value : 'desc'

            let title = styleConfigs.filter((style) => style.key === 'title')
            title = title.length > 0 ? title[0].value : 'title'

            const data = objDataColumns.map(dc => {
                return [dc[dHelper.getValueByColumnKey(groupConfigs[0])], dc[dHelper.getValueByColumnKey(aggregateConfigs[0])],]
            });

            Highcharts.chart(containerId, {
                chart: {
                    type: 'pyramid',
                    marginRight: 100
                },
                title: {
                    text: title,
                    x: -50
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b> ({point.y:,.0f})',
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                            softConnector: true
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                series: [
                    {
                        name: desc,
                        data: data
                    }]
            });

        },
        onUnMount() { },
        onResize(options, context) { }
    }
}