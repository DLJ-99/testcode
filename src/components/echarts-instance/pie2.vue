<template>
<div id='pie2' ref="pie2" style="width:100%;height:375px"></div>
</template>

<script>
export default {
  name: 'pie2',
  mounted () {
    this.initEcharts()
  },
  methods: {
    initEcharts () {
      const chart = this.$refs.pie2
      if (chart) {
        const myChart = this.$echarts.init(chart)
        // pie的option里添加属性 ：title: 'pie' 会导致错误：vue.esm.js?efeb:628 [Vue warn]: Error in mounted hook: "TypeError: Cannot use 'in' operator to search for 'x' in pie"
        const option2 = {
          // title: 'pie',
          legend: {x: 'left', data: ['type1', 'type2', 'type3', 'type4'], orient: 'vertical'},
          tooltip: {
            show: true,
            trigger: 'item',
            formatter: '{a}的{b}:{c},占{d}%'
          },
          toolbox: {
            show: true,
            right: 50,
            feature: {
              dataView: {
                show: true,
                readOnly: false
              },
              magicType: {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                  funnel: {
                    x: '25%',
                    width: '50%',
                    funnelAlign: 'center',
                    max: 521
                  }
                }
              },
              restore: {
                show: true
              },
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          series: [{
            name: 'test',
            // type: 'funnel',
            type: 'pie',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{a}的{b}:{c},占{d}%'
                },
                labelLine: {
                  show: true
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: 'center',
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: [{ value: 520, name: 'type1' }, { value: 13, name: 'type2' }, { value: 14, name: 'type3' }, { value: 521, name: 'type4' }]
          }]
        }
        myChart.setOption(option2)
        // myChart.resize({ height: '400px' })
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
