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
    // this.initCharts()
    this.setTimer2()
  },
  methods: {
    setTimer () {
      if (this.fireworkTimer === '') {
        this.fireworkTimer = setInterval(this.initCharts(), 1)
      } else {
        this.clearTimer()
      }
    },
    setTimer2 () {
      let that = this
      let offsetX = document.getElementById('fireworks').offsetWidth
      let offsetY = document.getElementById('fireworks').offsetHeight
      // this.fireworkTimer = setInterval(this.initCharts2(200 * Math.random(), 160 * Math.random(), 20 * Math.random(), 20 * Math.random()), 10000)
      document.getElementById('fireworks').onclick = function (e) {
        console.log('e==', e)
        console.log('e.offsetX==', e.offsetX)
        console.log('e.offsetY==', e.offsetY)
        // that.initCharts2(200 * Math.random(), 160 * Math.random(), 8, 8)
        that.initCharts2(200 * e.offsetX / offsetX, 160 * (offsetY - e.offsetY) / offsetY, 8, 8)
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
        // zlevel 越大，图层就越靠上
        zlevel: -2,
        effect: {
          show: true,
          // 间隔时间 s
          period: 1,
          // 轨迹长度
          trailLength: 0.01,
          // 轨迹大小
          symbolSize: 4,
          // 轨迹形状：line、arrow、dot、pin
          symbol: 'circle',
          // 是否循环
          loop: true
        },
        lineStyle: {
          normal: {
            color: '#fff',
            opacity: 0,
            // 边的曲度，支持从 0 到 1 的值，值越大曲度越大
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
          symbolSize: 6,
          symbol: 'pin',
          loop: true
        },
        lineStyle: {
          normal: {
            color: '#ccc',
            opacity: 0.02,
            width: 0.01,
            curveness: 0
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
    // x, y, aa, bb  x:烟花的x坐标，y：烟花的y坐标，aa：烟花绽放时的x坐标偏移位置，bb：烟花绽放时的y坐标偏移位置
    initCharts2 (x, y, aa, bb) {
      // 初始化echarts实例
      const fireworksChart2 = this.$echarts.init(document.getElementById('fireworks'))
      this.fireWork(x, y, aa, bb)
      console.log('Math.random()', Math.random())
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

      fireworksChart2.setOption(option)
    },
    initCharts () {
      /** ************* 烟花秀 **************/
      // 初始化echarts实例
      const fireworksChart = this.$echarts.init(document.getElementById('fireworks'))
      // let aa = 20;
      // let bb = 60; // 大烟花
      // let aa = 10
      // let bb = 15 // 心形小烟花
      let aa = 8
      let bb = 8
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
  background-size: cover;
  margin-top: 1.5rem;
}
#fireworks{
  height: 50vh;
}
</style>
