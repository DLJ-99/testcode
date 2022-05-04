<template>
  <div id="huarongdao">
    <span class="head-title">数字华容道</span>
    <div class="cell-body">
      <div v-for="item in cellObjList" :key="item.id" class="cell-box" @click="changeCellNum">{{item.name}}</div>
    </div>
    <span class="save-btn">保存当前进度</span>
    <span class="set-btn">恢复上次进度</span>
  </div>
</template>

<script>
export default {
  name: 'HuaRongDao',
  data () {
    return {
      cellNum: 9,
      clickCellNum: '',
      clickArr: []
    }
  },
  computed: {
    cellObjList: function () {
      let list = []
      for (let i = 1; i < this.cellNum; i++) {
        list.push({id: i, name: this.cellNum - i})
      }
      list.push({id: '', name: ''})
      return list
    },
    cellList: function () {
      return document.querySelectorAll('.cell-box')
    }
  },
  methods: {
    changeCellNum (e) {
      this.changeIfClick()
      // console.log('cellList', this.cellList)
      if (this.clickCellNum) {
        // 第二次选择
        if (e.target.innerText === '') {
          e.target.innerText = this.clickCellNum
          this.clickCellNum = ''
        }
      } else {
        if (this.clickArr.includes(e.target.innerText)) {
          // 第一次选择 选择非空的cell，
          this.clickCellNum = e.target.innerText
          e.target.innerText = ''
        }
      }
    },
    changeIfClick () {
      this.clickArr = []
      this.cellList.forEach((item, index) => {
        if (item.innerText === '') {
          // console.log('index', index)
          if (index - 1 >= 0) {
            this.clickArr.push(this.cellList[index - 1].innerText)
          }
          if (index - 3 >= 0) {
            this.clickArr.push(this.cellList[index - 3].innerText)
          }
          if (index + 1 < this.cellNum) {
            this.clickArr.push(this.cellList[index + 1].innerText)
          }
          if (index + 3 < this.cellNum) {
            this.clickArr.push(this.cellList[index + 3].innerText)
          }
        }
      })
      // console.log('this.clickArr', this.clickArr)
    }
  }
}
</script>

<style>
.cell-body{
  background: rgb(235, 228, 169);
  margin: 2rem auto 0;
  border: 1px solid rgb(182, 182, 174);
  width:calc(9rem)
}
.cell-box{
  display: inline-block;
  width: 3rem;
  height: 3rem;
  text-align: center;
  vertical-align: middle;
  border: 1px solid rgb(182, 182, 174);
  font-size: 2rem;
  line-height: 3rem;
  box-sizing: border-box;
  cursor: pointer;
}
.save-btn,.set-btn{
  background-color: #8BC6EC;
  background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
  display: inline-block;
  padding: 1rem 1rem;
  color: whitesmoke;
  border-radius: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
}
</style>
