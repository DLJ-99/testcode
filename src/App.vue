<template>
  <div id="app">
    <img class="headImg" src="./assets/img/mingren.gif" @click="initPage">
    <div>
    <!-- <el-tag style="cursor:pointer" v-for="(item,index) in modelArr" :key="index" @click="changeModel(item)">{{item}}</el-tag> -->
    <el-select placeholder="选择模型" v-model="modelStr" @change="changeModel()">
      <el-option v-for="(item,index) in modelArr" :key="index"
      :label="item"
      :value="item">{{item}}
      </el-option>
    </el-select>
    </div>
    <NavList/>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script src="/static/echarts/echarts-all.js"></script>
<script>
export default {
  name: 'App',
  data () {
    return {
      modelId0: 'shizuku',
      modelId1: 'shizuku',
      modelArr: [],
      modelStr: '',
      files: require.context('../static/live2dw/', true, /.model.json$/).keys()
    }
  },
  created () {
    this.getModelId()
  },
  methods: {
    initPage () {
      this.live2dModelInit()
    },
    live2dModelInit () {
      /* 看板娘初始化
      参数说明
      model 模型的配置
         json 文件资源路径，可以支持网络路径，此处使用的是相对路径
         scale 模型缩放系数
      display 模型布局
         position 位置
         width 宽度
         height 高度
         hOffset 水平偏移量
         vOffset 垂直偏移量
      mobile 移动端配置
         show 显示/隐藏
         scale 缩放比例
      react 模型矩形框样式
         opacity 透明度
         opacityDefault 默认透明度
         opacityOnHover 鼠标悬浮透明度
    */
      window.L2Dwidget.init({
        pluginRootPath: '../static/live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: `live2d-widget-model-${this.modelId0}/assets/`, // 模型配置文件路径
        tagMode: false,
        debug: false,
        model: { jsonPath: `../static/live2dw/live2d-widget-model-${this.modelId0}/assets/${this.modelId1}.model.json` },
        display: { position: 'left', width: 350, height: 800 }, // 调整大小,和位置
        mobile: { show: true }, // 要不要盯着你的鼠标看
        log: false,
        tips: {
          mouseover:[{
            selector:"#live2d-widget",
            texts:['哈哈哈哈']
          }]
        }
      })
    },
    getModelId () {
      this.files.forEach(item => {
        let model0 = ''
        let model1 = ''
        model0 = item.split('./live2d-widget-model-')[1].split('/assets/')[0]
        model1 = item.split('./live2d-widget-model-')[1].split('/assets/')[1].split('.model.json')[0]
        this.modelArr.push(model0 + ',' + model1)
      })
    },
    changeModel (item) {
      this.modelId0 = item ? item.split(',')[0] : this.modelStr.split(',')[0]
      this.modelId1 = item ? item.split(',')[1] : this.modelStr.split(',')[1]
      this.initPage()
      console.log('this.modelStr', this.modelStr)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
