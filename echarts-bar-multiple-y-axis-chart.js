function EchartsBarMultipleYAxisChart({ dHelper }) {
    let instance = null;
    return {
        config: {
            datas: [
                { label: "dimension", key: "dimension", type: "group", allowSameField: false },
                { label: "metrics", key: "metrics", type: "aggregate", allowSameField: false }
            ],
            styles: [
                {
                    label: '左侧图例',
                    key: 'left',
                    comType: 'group',
                    rows: [
                        {
                            label: '标题',
                            key: 'title',
                            comType: 'input',
                        },
                        {
                            label: '后缀',
                            key: 'format',
                            comType: 'input',
                        }
                    ]
                },
                {
                    label: '右侧图例',
                    key: 'right',
                    comType: 'group',
                    rows: [
                        {
                            label: '标题',
                            key: 'title',
                            comType: 'input',
                        },
                        {
                            label: '后缀',
                            key: 'format',
                            comType: 'input',
                        }
                    ]
                },
                {
                    label: '右侧图例',
                    key: 'right_2',
                    comType: 'group',
                    rows: [
                        {
                            label: '标题',
                            key: 'title',
                            comType: 'input',
                        },
                        {
                            label: '后缀',
                            key: 'format',
                            comType: 'input',
                        }
                    ]
                },
            ],
            i18ns: [],
        },
        isISOContainer: 'echarts',
        dependency: [
            '/custom-chart-plugins/common/echarts/echarts.js',
        ],
        meta: {
            id: 'echarts-bar-multiple-y-axis-chart',
            name: '[Echarts][Bar][Multiple][Y][Axis][Chart]',
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
            const colors = ['#5470C6', '#91CC75', '#EE6666'];
            let option = {
                color: colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    right: '20%'
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['Evaporation', 'Precipitation', 'Temperature']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Evaporation',
                        position: 'right',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} ml'
                        }
                    },
                    {
                        type: 'value',
                        name: 'Precipitation',
                        position: 'right',
                        alignTicks: true,
                        offset: 80,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} ml'
                        }
                    },
                    {
                        type: 'value',
                        name: '温度',
                        position: 'left',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[2]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    }
                ],
                series: [
                    {
                        name: 'Evaporation',
                        type: 'bar',
                        data: [
                            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                        ]
                    },
                    {
                        name: 'Precipitation',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: [
                            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                        ]
                    },
                    {
                        name: 'Temperature',
                        type: 'line',
                        yAxisIndex: 2,
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    }
                ]
            };
            instance.setOption(option)
        },
        onUpdated(options, context) {
            if (!options.containerId || !context.document) return;
            const { config, dataset } = options;
            if (!dataset || !dataset.rows || dataset.rows.length === 0) return
            const dataConfigs = config.datas || [];
            const styleConfigs = config.styles;
            const groupConfigs = dataConfigs.filter(c => c.type === 'group').flatMap(config => config.rows || []);
            const aggregateConfigs = dataConfigs.filter(c => c.type === 'aggregate').flatMap(config => config.rows || []);
            const objDataColumns = dHelper.transformToObjectArray(dataset.rows, dataset.columns);
            const data = objDataColumns.map(dc => {
                return [
                    dc[dHelper.getValueByColumnKey(groupConfigs[0])],
                    dc[dHelper.getValueByColumnKey(aggregateConfigs[0])],
                    dc[dHelper.getValueByColumnKey(aggregateConfigs[1])],
                    dc[dHelper.getValueByColumnKey(aggregateConfigs[2])],
                ]
            });

            const legend = [];
            const formats = [];
            styleConfigs.forEach((s, i) => {
                s.rows.forEach((ss) => {
                    if (ss.key === 'title') {
                        legend.push(ss.value || `default-${i}`)
                    }
                    if (ss.key === 'format') {
                        formats.push(ss.value || '')
                    }
                })
            })


            const colors = ['#5470C6', '#91CC75', '#EE6666'];
            let option = {
                color: colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    right: '20%'
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: legend
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: data.map((d) => d[0])
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: legend[1],
                        position: 'right',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: `{value} ${formats[1]}`
                        }
                    },
                    {
                        type: 'value',
                        name: legend[2],
                        position: 'right',
                        alignTicks: true,
                        offset: 80,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisLabel: {
                            formatter: `{value} ${formats[2]}`
                        }
                    },
                    {
                        type: 'value',
                        name: legend[0],
                        position: 'left',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[2]
                            }
                        },
                        axisLabel: {
                            formatter: `{value} ${formats[0]}`
                        }
                    }
                ],
                series: [
                    {
                        name: legend[1],
                        type: 'bar',
                        data: data.map((d) => d[1] || 0)
                    },
                    {
                        name: legend[2],
                        type: 'bar',
                        yAxisIndex: 1,
                        data: data.map((d) => d[2] || 0)
                    },
                    {
                        name: legend[0],
                        type: 'line',
                        yAxisIndex: 2,
                        data: data.map((d) => d[3] || 0)
                    }
                ]
            };
            instance.setOption(option)
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
