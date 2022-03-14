<template>
  <div id="firework-body">
    <div id="fireworks"></div>
    <!-- <div class="wrapper">
      <div class="container-fluid">
        <div class="fill-h">
          <div class="xpanel-wrapper xpanel-wrapper-1">
            <div class="xpanel no-padding no-bg">
              <div class="fill-h" id="fireworks"></div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Firework',
  data () {
    return {
      series: [],
      fireworkTimer: ''
    }
  },
  mounted () {
    // this.setTimer()
    this.initCharts()
  },
  methods: {
    setTimer () {
      // this.initCharts()
      if (this.fireworkTimer === '') {
        this.fireworkTimer = setInterval(this.initCharts(), 1)
      } else {
        this.clearTimer()
      }
    },
    clearTimer () {
      clearInterval(this.fireworkTimer)
    },
    fireWork (x, y, aa, bb) {
      let all = []
      let pole = [{
        coords: [
          [x, 0],
          [x, y]
        ]
      }]
      let color = ['#DD0000', '#FFFF00', '#FF00FF', '#00FF00',
        '#DD0000', '#FFFF00', '#FF00FF', '#00FF00',
        '#DD0000', '#FFFF00', '#FF00FF', '#00FF00',
        '#DD0000', '#FFFF00', '#FF00FF', '#00FF00'
      ]
      for (var i = 0; i < color.length; i++) {
        let a = Math.random() * aa
        let b = Math.random() * bb
        let one = {
          coords: [
            [x, y],
            [x + a, y + b]
          ],
          lineStyle: {
            normal: {
              color: color[i]
            }
          }
        }

        all.push(one)
        let two = { // 第二象限
          coords: [
            [x, y],
            [x - a, y + b]
          ],
          lineStyle: {
            normal: {
              color: color[i]
            }
          }
        }
        all.push(two)
        let three = { // 第三象限
          coords: [
            [x, y],
            [x - a, y - b]
          ],
          lineStyle: {
            normal: {
              color: color[i]
            }
          }
        }
        all.push(three)
        let four = { // 第四象限
          coords: [
            [x, y],
            [x + a, y - b]
          ],
          lineStyle: {
            normal: {
              color: color[i]
            }
          }
        }
        all.push(four)
      }
      this.series.push({
        type: 'bar',
        data: this.build(),
        itemStyle: {
          normal: {
            color: 'transparent'
          }
        }
      }, {
        coordinateSystem: 'cartesian2d',
        type: 'lines',
        zlevel: -2,
        effect: {
          show: true,
          period: 1,
          trailLength: 0.01,
          symbolSize: 4,
          symbol: 'circle',
          loop: true
        },
        lineStyle: {
          normal: {
            color: '#ccc',
            opacity: 0,
            curveness: 0
          }
        },
        data: pole
      }, {
        coordinateSystem: 'cartesian2d',
        type: 'lines',
        zlevel: 2,
        symbolSize: 3,
        effect: {
          show: true,
          period: 1,
          trailLength: 0.01,
          symbolSize: 5,
          symbol: 'pin',
          loop: true
        },
        lineStyle: {
          normal: {
            color: '#ccc',
            opacity: 0.02,
            width: 0.01,
            curveness: 0.1
          }
        },
        data: all
      })
    },
    build () {
      let arr = [200]
      for (let i = 0; i < 200; i++) {
        arr.push(0)
      }
      return arr
    },
    initCharts () {
      /** ************* 烟花秀 **************/
      // 初始化echarts实例
      const fireworksChart = this.$echarts.init(document.getElementById('fireworks'))
      // let aa = 20;
      // let bb = 60; // 大烟花
      let aa = 10
      let bb = 15 // 心形小烟花
      // 随机位置
      // this.fireWork(Math.random() * 200, Math.random() * 160, aa, bb)
      // this.fireWork(Math.random() * 200, Math.random() * 160, aa, bb)
      // this.fireWork(Math.random() * 200, Math.random() * 160, aa, bb)
      // this.fireWork(Math.random() * 200, Math.random() * 160, aa, bb)
      // this.fireWork(Math.random() * 200, Math.random() * 160, aa, bb)
      // this.fireWork(Math.random() * 200, Math.random() * 160, aa, bb)
      // this.fireWork(Math.random() * 200, Math.random() * 160, aa, bb)
      // this.fireWork(Math.random() * 200, Math.random() * 160, aa, bb)
      // this.fireWork(Math.random() * 200, Math.random() * 160, aa, bb)
      // this.fireWork(Math.random() * 200, Math.random() * 160, aa, bb)
      // 同一高度
      // this.fireWork(Math.random() * 200, 160, aa, bb);
      // this.fireWork(Math.random() * 200, 160, aa, bb);
      // this.fireWork(Math.random() * 200, 160, aa, bb);
      // this.fireWork(Math.random() * 200, 160, aa, bb);
      // this.fireWork(Math.random() * 200, 160, aa, bb);
      // this.fireWork(Math.random() * 200, 160, aa, bb);
      // this.fireWork(Math.random() * 200, 160, aa, bb);
      // this.fireWork(Math.random() * 200, 160, aa, bb);
      // this.fireWork(Math.random() * 200, 160, aa, bb);
      // this.fireWork(Math.random() * 200, 160, aa, bb);
      // 心形
      this.fireWork(100, 160, aa, bb)
      this.fireWork(140, 180, aa, bb)
      this.fireWork(175, 165, aa, bb)
      this.fireWork(170, 130, aa, bb)
      this.fireWork(160, 100, aa, bb)
      this.fireWork(140, 70, aa, bb)
      this.fireWork(60, 180, aa, bb)
      this.fireWork(25, 165, aa, bb)
      this.fireWork(30, 130, aa, bb)
      this.fireWork(40, 100, aa, bb)
      this.fireWork(60, 70, aa, bb)
      this.fireWork(100, 30, aa, bb)

      const option = {
        xAxis: {
          data: [],
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          silent: true,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: this.series
      }

      fireworksChart.setOption(option)

      /** ******** 窗口大小改变时，重置报表大小 ********************/
      window.onresize = function () {
        fireworksChart.resize()
      }
    }
  }
}
</script>

<style>
#firework-body{
  background:url("../assets/img/starSky.jpg") no-repeat center;
  margin-top: 1.5rem;
}
#fireworks{
  height: 50vh;
}
</style>
