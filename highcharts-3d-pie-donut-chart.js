/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-22 15:45:50
 * @LastEditTime: 2022-09-26 17:25:57
 * @FilePath: \custom-chart-plugins\highcharts-3d-pie-donut-chart.js
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
            instance = Highcharts.chart(containerId, {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: title
                },
                subtitle: {
                    text: desc
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                    name: name,
                    data: dataset.rows
                }]
            });

        },
        onUnMount() { },
        onResize(options, context) { }
    }
}