<template>
<div id='line1' ref="chart" style="width:100%;height:375px"></div>
</template>

<script>

export default {
  name: 'line1',
  data () {
    return {}
  },
  mounted () {
    this.initEcharts()
  },
  methods: {
    initEcharts () {
      const chart = this.$refs.chart
      if (chart) {
        const myChart = this.$echarts.init(chart)
        const option = {
          title: {
            text: 'Stacked Line'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true// 是否包含轴标签
          },
          toolbox: {
            orient: 'vetical',
            feature: {
              restore: {
                show: true
              },
              dataZoom: {
                show: true
              },
              saveAsImage: {show: true},
              dataView: {
                show: true,
                readOnly: false
              },
              magicType: {
                show: true,
                type: ['line', 'bar', 'pin']
              }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Email',
              type: 'line',
              stack: 'Total',
              data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230]
            },
            {
              name: 'Union Ads',
              type: 'line',
              stack: 'Total',
              data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330]
            },
            {
              name: 'Video Ads',
              type: 'line',
              stack: 'Total',
              data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330]
            },
            {
              name: 'Direct',
              type: 'line',
              stack: 'Total',
              data: [320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330]
            },
            {
              name: 'Search Engine',
              type: 'line',
              stack: 'Total',
              data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330]
            }
          ]

        }
        myChart.setOption(option)
        window.addEventListener('resize', function () {
          myChart.resize()
        })
        this.$on('hook:destroy', () => {
          window.removeEventListener('resize', function () {
            myChart.resize()
          })
        })
      }
    }
  }
}
</script>
<style lang='less' scoped>

</style>
