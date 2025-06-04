<template>
  <div class="echarts-box">
    <div ref="echartRef" class="charts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      echartRef: null,
      dom: null,
    };
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          // 默认关闭动画
          this.setOptions({ animation: false, ...val });
        });
      },
    },
  },
  methods: {
    setOptions(options) {
      // 清除画布
      if (this.dom) {
        this.dom.clear();
      }
      // 重新渲染
      if (this.dom) {
        this.dom.setOption(options);
      }
    },
  },
  mounted() {
    // 初始化
    this.dom = echarts.init(this.$refs.echartRef);
    // 点击事件
    this.dom.on('click', (param) => {
      this.$emit('click', param);
    });
  },
  beforeDestroy() {
    // 离开销毁
    if (this.dom) {
      echarts.dispose(this.dom);
      this.dom = null;
    }
  },
};
</script>

<style scoped>
.echarts-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.charts {
  width: 100%;
  height: 100%;
}
</style>
