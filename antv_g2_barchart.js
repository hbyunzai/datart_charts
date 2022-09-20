function antv_g2_barchart({dHelper}) {
  const chart = {
    meta: {
      id: 'antv_g2_barchart',
      name: '11111柱状图',
      icon: 'chart',
      requirements: [
        {
          group: null,
          aggregate: null,
        }
      ],
    },
    isISOContainer: 'demo-d3js-scatter-chart',
    dependency: ['https://d3js.org/d3.v5.min.js'],
    onMount(options, context) {
      console.log(dHelper)
      console.log(options)
      console.log(context)
    },
    onUpdated(options, context) {
      console.log(options)
      console.log(context)
    },
    onResize(options, context) {
      console.log(options)
      console.log(context)
    },
    onUnMount() {
      console.log("unmount")
    }
  }
  return chart;
}


