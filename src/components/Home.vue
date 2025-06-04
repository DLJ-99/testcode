<template>
  <div class="container">
    <div class="echarts-view">
      <Echarts :data="options" />
    </div>
  </div>
</template>

<script>
import Echarts from "./echarts-instance/3DPie.vue";

export default {
  components: {
    Echarts,
  },
  data() {
    return {
      data: [
        { name: "已完成", value: 100, color: "#D13DF2" },
        { name: "申请中", value: 45, color: "#6442ee" },
        { name: "已撤销", value: 12, color: "#6DCDE6" },
        { name: "审核中", value: 7, color: "#2F54F3" },
        { name: "已驳回", value: 3, color: "#8E56E0" },
      ],
    };
  },
  computed: {
    maxValue() {
      return Math.max(...this.data.map((item) => item.value));
    },
    // 高度动态缩放系数
    scaleZ() {
      return 45 * 0.1 / this.maxValue;
    },
    options() {
      let total = this.data.reduce((a, b) => a + b.value, 0);
      let sumValue = 0;
      //辅助参数,控制饼图半径，（0-1）范围内控制环形大小，值越小环形内半径越大
      let k = 1/2;
      //series配置（每个扇形）
      let series = this.data.map((item) => {
        //当前扇形起始位置占饼图比例
        let startRatio = sumValue / total;
        //值累加
        sumValue += item.value;
        //当前扇形结束位置占饼图比例
        let endRatio = sumValue / total;
        return {
          name: item.name || null,
          type: "surface", //曲面图
          itemStyle: {
            color: item.color || null,
          },
          wireframe: {
            show: false,//不显示网格线
          },
          pieData: item,
          pieStatus: {//饼图状态
            k,//辅助参数
            startRatio,//起始位置比例
            endRatio,//结束位置比例
            value: item.value,//数值
          },
          parametric: true,//参数曲面
          //曲面的参数方程
          parametricEquation: this.getParametricEquation(
            startRatio,
            endRatio,
            k,
            item.value
          ),
        };
      });
      series.forEach((item, index) => {
        let {
          itemStyle: { color },
          pieStatus: { startRatio, endRatio, value },
        } = item;
        //添加指示线
        this.addLabelLine(series, startRatio, endRatio, value, k, index, color);
      });
      return {
        tooltip: {
          formatter: (params) => {
            if (
              params.seriesType === "surface"
            ) {
              return `${
                params.seriesName
              }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                params.color
              };"></span>${series[params.seriesIndex].pieData.value}`;
            }
            return "";
          },
        },
        xAxis3D: {
          min: -1,
          max: 1,
        },
        yAxis3D: {
          min: -1,
          max: 1,
        },
        zAxis3D: {
          min: -1,
          max: 1,
        },
        grid3D: {
          show: false,//不显示坐标系
          boxHeight: 15, //饼图高度
          // 用于鼠标的旋转，缩放等视角控制
          viewControl: {
            alpha: 30,//视角
            distance: 300,//距离，值越大饼图越小
            rotateSensitivity: 0,//禁止旋转
            zoomSensitivity: 0,//禁止旋转
            panSensitivity: 0,//禁止平移
            autoRotate: false,//禁止自动旋转
          },
        },
        series,
      };
    },
  },
  methods: {
    /**
     * 获取面的参数方程
     * @param {*} startRatio 扇形起始位置比例
     * @param {*} endRatio 扇形结束位置比例
     * @param {*} k 辅助参数,控制饼图半径
     * @param {*} value 数值
     */
    getParametricEquation(startRatio, endRatio, k, value) {
      const startRadian = startRatio * Math.PI * 2;
      const endRadian = endRatio * Math.PI * 2;
      const that = this;
      k = typeof k === "number" && !isNaN(k) ? k : 1 / 2;//默认1/2，即饼图半径为1/2
      // 返回曲面参数方程
      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32,
        },
        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },
        x(u, v) {
          if (u < startRadian) {
            return Math.cos(startRadian) * (1 + Math.cos(v) * k);
          }
          if (u > endRadian) {
            return Math.cos(endRadian) * (1 + Math.cos(v) * k);
          }
          return Math.cos(u) * (1 + Math.cos(v) * k);
        },
        y(u, v) {
          if (u < startRadian) {
            return Math.sin(startRadian) * (1 + Math.cos(v) * k);
          }
          if (u > endRadian) {
            return Math.sin(endRadian) * (1 + Math.cos(v) * k);
          }
          return Math.sin(u) * (1 + Math.cos(v) * k);
        },
        z(u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u);
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u) * value * that.scaleZ;
          }
          return Math.sin(v) > 0 ? value * that.scaleZ : -1;
        },
      };
    },
    //添加label指示线
    /**
     * @param {*} series 配置
     * @param {*} startRatio 扇形起始位置比例
     * @param {*} endRatio 扇形结束位置比例
     * @param {*} value 数值
     * @param {*} k 辅助参数，饼图半径相关
     * @param {*} i  在series中索引
     * @param {*} color 指示线颜色
     */
    addLabelLine(series, startRatio, endRatio, value, k, i, color = "#fff") {
      //计算扇形中心弧度
      const midRadian = (startRatio + endRatio) * Math.PI;
      const radius = 1 + k;
      const posX = Math.cos(midRadian) * radius;//x坐标
      const posY = Math.sin(midRadian) * radius;//y坐标
      const posZ = value * this.scaleZ;//z坐标
      let flag =
        (midRadian >= 0 && midRadian <= Math.PI / 2) ||
        (midRadian >= (3 * Math.PI) / 2 && midRadian <= Math.PI * 2)
          ? 1
          : -1;
      //计算拐点坐标
      let turningPosArr = [
        posX * 1.1 + i * 0.1 * flag + (flag < 0 ? -0.2 : 0),
        posY * 1.1 + i * 0.1 * flag + (flag < 0 ? -0.2 : 0),
        posZ,
      ];
      //计算结束位置坐标
      let endPosArr = [
        posX * 1.2 + i * 0.1 * flag + (flag < 0 ? -0.2 : 0),
        posY * 1.2 + i * 0.1 * flag + (flag < 0 ? -0.2 : 0),
        posZ * 3,
      ];
      //添加label+指示线
      series.push(
        {
          type: "line3D",
          lineStyle: {
            color: "#fff",
            width: 2,
          },
          data: [[posX, posY, posZ], turningPosArr, endPosArr],
        },
        {
          type: "scatter3D",
          label: {
            show: true,
            distance: 0,
            position: "center",
            textStyle: {
              color: "#fff",//文字颜色
              backgroundColor: "rgba(0,0,0,0)",//透明背景
              fontSize: 18,//文字尺寸
              fontWeight: "bold",//文字加粗
              padding: 5,
            },
            formatter: "{b}",
          },
          symbolSize: 0,
          data: [
            {
              name: series[i].name + "：" + value + "个",
              value: endPosArr,
            },
          ],
        }
      );
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #203598;
  align-items: center;
}
.echarts-view {
  height: 700px;
  width: 1200px;
}
</style>
