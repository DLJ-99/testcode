<template>
<div id=''>
  <div><el-button type="primary" @click="onComplexExport">导出</el-button></div>
  <div>
    <el-table :data="tableData">
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="银行名称" prop="bankName"></el-table-column>
      <el-table-column label="银行代码" prop="bankCode"></el-table-column>
      <el-table-column label="银行卡标识" prop="cardName"></el-table-column>
      <el-table-column label="银行卡标识长度" prop="cardLength"></el-table-column>
      <el-table-column label="银行卡账号" prop="mainAccount"></el-table-column>
      <el-table-column label="银行卡类型" prop="cardType"></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import {onSortList,getExcelCell} from '@/assets/js/utils'
export default {
  data(){
    return {
      tableData: [
    {
        "id": "n000001",
        "bankName": "中国银联支付标记",
        "bankCode": "00010000",
        "cardName": "--",
        "cardLength": "19",
        "mainAccount": "623524xxxxxxxxxxxxx",
        "bin": "623524",
        "binLength": 6,
        "cardType": "借记卡",
        "pageNum": 0,
        "pageSize": 0
    },
    {
        "id": "n000002",
        "bankName": "中国银联支付标记",
        "bankCode": "00010000",
        "cardName": "--",
        "cardLength": "16",
        "mainAccount": "625164xxxxxxxxxx",
        "bin": "625164",
        "binLength": 6,
        "cardType": "贷记卡",
        "pageNum": 0,
        "pageSize": 0
    },
    {
        "id": "n000003",
        "bankName": "中国银联支付标记",
        "bankCode": "00010000",
        "cardName": "中国银联移动支付标记化产品",
        "cardLength": "19",
        "mainAccount": "623529xxxxxxxxxxxxx",
        "bin": "623529",
        "binLength": 6,
        "cardType": "借记卡",
        "pageNum": 0,
        "pageSize": 0
    },
    {
        "id": "n000004",
        "bankName": "中国银联支付标记",
        "bankCode": "00010000",
        "cardName": "中国银联移动支付标记化产品",
        "cardLength": "16",
        "mainAccount": "625153xxxxxxxxxx",
        "bin": "625153",
        "binLength": 6,
        "cardType": "贷记卡",
        "pageNum": 0,
        "pageSize": 0
    },
    {
        "id": "n000005",
        "bankName": "邮储银行",
        "bankCode": "01000000",
        "cardName": "绿卡通",
        "cardLength": "19",
        "mainAccount": "621098xxxxxxxxxxxxx",
        "bin": "621098",
        "binLength": 6,
        "cardType": "借记卡",
        "pageNum": 0,
        "pageSize": 0
    },
    {
        "id": "n000006",
        "bankName": "邮储银行",
        "bankCode": "01000000",
        "cardName": "绿卡银联标准卡",
        "cardLength": "19",
        "mainAccount": "622150xxxxxxxxxxxxx",
        "bin": "622150",
        "binLength": 6,
        "cardType": "借记卡",
        "pageNum": 0,
        "pageSize": 0
    },
    {
        "id": "n000007",
        "bankName": "邮储银行",
        "bankCode": "01000000",
        "cardName": "绿卡银联标准卡",
        "cardLength": "19",
        "mainAccount": "622151xxxxxxxxxxxxx",
        "bin": "622151",
        "binLength": 6,
        "cardType": "借记卡",
        "pageNum": 0,
        "pageSize": 0
    },
    {
        "id": "n000008",
        "bankName": "邮储银行",
        "bankCode": "01000000",
        "cardName": "绿卡专用卡",
        "cardLength": "19",
        "mainAccount": "622181xxxxxxxxxxxxx",
        "bin": "622181",
        "binLength": 6,
        "cardType": "借记卡",
        "pageNum": 0,
        "pageSize": 0
    },
    {
        "id": "n000009",
        "bankName": "邮储银行",
        "bankCode": "01000000",
        "cardName": "绿卡银联标准卡",
        "cardLength": "19",
        "mainAccount": "622188xxxxxxxxxxxxx",
        "bin": "622188",
        "binLength": 6,
        "cardType": "借记卡",
        "pageNum": 0,
        "pageSize": 0
    },
    {
        "id": "n000010",
        "bankName": "邮储银行",
        "bankCode": "01000000",
        "cardName": "绿卡(银联卡)",
        "cardLength": "19",
        "mainAccount": "955100xxxxxxxxxxxxx",
        "bin": "955100",
        "binLength": 6,
        "cardType": "借记卡",
        "pageNum": 0,
        "pageSize": 0
    }
]
    }
  },
  mounted(){
    // console.log("getExcelCell(27)",getExcelCell(27))
  },
  methods:{
    onComplexExport() {
      const sortOrder = [
          "id",
          "bankName",
          "bankCode",
          "cardName",
          "cardLength",
          "mainAccount",
          "cardType"
      ]
      const FilnalData = onSortList(this.tableData,sortOrder)
      import('@/assets/js/Export2Excel').then((excel)=>
        excel.export_json_to_excel({
          // multiHeader: [['编号', '银行卡信息描述', '', '', '', '', '银行卡类型']],
          multiHeader: [['银行卡信息描述', '', '', '', '', '', '']],
          header: ['编号', '银行名称', '银行代码', '银行卡标识','银行卡标识长度', '银行卡账号', '银行卡类型'], //表头 必填
          data: FilnalData, //具体数据 必填
          filename: '用户信息',
          // 要合并的单元格
          // merges: ['A1:A2', 'B1:F1', 'G1:G2'],
          merges: ['A1:'+getExcelCell(sortOrder.length)+'1'],
          autoWidth: true,
          bookType: 'xlsx',
        })
      )
    },
  }
}
</script>
<style lang='less' scoped>

</style>
