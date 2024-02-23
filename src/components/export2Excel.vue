<template>
<div id=''>
  <div style="margin: 10px 0;"><a-button type="primary" @click="onComplexExport">导出</a-button></div>
  <div style="margin: 0 20px;">
    <a-table
    bordered
    :scroll="{y:200}"
    size="middle"
    :rowKey="(record, index) => index + 1"
    :columns="columns"
    :dataSource="tableData"
    :pagination="ipagination"
    >
    </a-table>
  </div>
</div>
</template>

<script>
import {onSortList,getExcelCell,getScrollbarWidth} from '@/assets/js/utils'
import {export_json_to_excel,saveFunc} from '@/assets/js/Export2Excel'
import * as XLSX from 'xlsx'
export default {
  data(){
    return {
      ipagination:{
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + "-" + range[1] + " 共" + total + "条"
        },
        showQuickJumper: false,
        showSizeChanger: false,
        total: 0
      },
      columns: [
        {
          title: '序号',
          align: "center",
          customRender: (text, record, index) => index + 1,
          width: 50,
        },
        {
          title: '旅客姓名',
          align: "center",
          dataIndex: 'passengerName',
          width: 100
        },
        {
          title: '原票号',
          align: "center",
          width: 120,
          dataIndex: 'originalTicket'
        },
        {
          title: '新票号',
          align: "center",
          width: 120,
          dataIndex: 'newTicket',
        },
        {
          title: '实际退款',
          align: "center",
          width: 100,
          dataIndex: 'refundMoney'
        },
        {
          title: '银行户名',
          align: "center",
          dataIndex: 'bankAccountName',
          width: 100
        },
        {
          title: '银行账号',
          align: "center",
          dataIndex: 'bankAccount',
          width: 120
        },
        // {
        //   title: '收款银行名称',
        //   align: "center",
        //   dataIndex: 'receBankName',
        //   width: 100
        // },
        // {
        //   title: '银行',
        //   align: "center",
        //   dataIndex: 'bankName',
        //   width: 100
        // },
        // {
        //   title: '省份',
        //   align: "center",
        //   dataIndex: 'province',
        //   width: 50
        // },
        // {
        //   title: '城市',
        //   align: "center",
        //   dataIndex: 'city',
        //   width: 100
        // },
        {
          title: '订单时间',
          align: "center",
          dataIndex: 'orderDate',
          width: 100
        },
        {
          title: '业务渠道',
          align: "center",
          dataIndex: 'channelType',
          width: 100,
          // scopedSlots: {customRender: 'channelType'},
        },
        {
          title: '回盘日期',
          align: "center",
          dataIndex: 'backTime',
          width: 100
        },
        {
          title: '错误原因',
          align: "center",
          dataIndex: 'reason',
          width: 100
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: {customRender: 'action'},
          align: "center",
          width: 50
        }
      ],
      tableData: [
    {
        "passengerName": "刘欣",
        "originalTicket": "9992320272313",
        "newTicket": "9992181519217",
        "refundMoney": "290",
        "bankAccountName": "ERROR",
        "bankAccount": "22001310051052500465",
        "receBankName": "建行北海公园支行",
        "bankName": "建设银行",
        "province": "北京",
        "orderDate": "2023-06-28",
        "channelType": "CC",
        "backTime": "2024-01-12",
        "reason": "查开户方原因",
        "settlementNo": "08073741",
        "businessDepartment": "长春营业部",
        "bspAgentName": "长春市天懋航空服务有限公司",
        "companyContact": "颜赓\n孟小琳",
        "companyPhone": "0431-88988648\n0431-88966565",
        "companyEmail": "CGQ@airchina.com",
        "agentContact": "万家彤",
        "agentPhone": "18584305777",
        "agentEmail": "cctianmaohangfu@163.com"
    },
    {
        "passengerName": "测试",
        "originalTicket": "9999364261989",
        "newTicket": "9992181667183",
        "refundMoney": "2230",
        "bankAccountName": "北京保盛航空服务有限公司",
        "bankAccount": "0200242419020138879",
        "receBankName": "中国工商银行北京新中街支行",
        "bankName": "中国工商银行",
        "province": "北京",
        "orderDate": "2023-07-04",
        "channelType": "CC",
        "backTime": "2023-07-13",
        "reason": "查开户方原因",
        "settlementNo": "08301576",
        "businessDepartment": "华北营销中心（本部）",
        "bspAgentName": "北京保盛航空服务有限公司",
        "companyContact": "张哲鹏",
        "companyPhone": "87415411",
        "companyEmail": "zhangzhepeng@airchina.com",
        "agentContact": "联系人1：张杰\n联系人2：王孟迪",
        "agentPhone": "电话1：13466768387\n电话2：18311078713",
        "agentEmail": "邮箱：wangmengdi@baosheng.com,cn"
    },
    {
        "passengerName": "王波",
        "originalTicket": "9992160939913",
        "newTicket": "9992160939914",
        "refundMoney": "1120",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-12-06",
        "channelType": "CC",
        "backTime": null,
        "reason": null,
        "settlementNo": "8038472",
        "businessDepartment": null,
        "bspAgentName": null,
        "companyContact": null,
        "companyPhone": null,
        "companyEmail": null,
        "agentContact": null,
        "agentPhone": null,
        "agentEmail": null
    },
    {
        "passengerName": "王波",
        "originalTicket": "9992160939911",
        "newTicket": "9992160939912",
        "refundMoney": "1120",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-12-06",
        "channelType": "CC",
        "backTime": null,
        "reason": null,
        "settlementNo": "08038472",
        "businessDepartment": "大理营业部",
        "bspAgentName": "大理民航飞羽有限责任公司",
        "companyContact": "联系人1廖柯联系人2赵乾源",
        "companyPhone": "0872-2195583",
        "companyEmail": "66802156@qq.com483924137@qq.com",
        "agentContact": "联系人1李凌峰联系人2赵锦娇",
        "agentPhone": "13887293738； 13508823093",
        "agentEmail": "770239128@qq.com；992840820@qq.com"
    },
    {
        "passengerName": "王波",
        "originalTicket": "9992160939913",
        "newTicket": "9992160939914",
        "refundMoney": "1120",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-12-06",
        "channelType": "FC",
        "backTime": null,
        "reason": null,
        "settlementNo": "8038472",
        "businessDepartment": null,
        "bspAgentName": null,
        "companyContact": null,
        "companyPhone": null,
        "companyEmail": null,
        "agentContact": null,
        "agentPhone": null,
        "agentEmail": null
    },
    {
        "passengerName": "王波",
        "originalTicket": "9992160939913",
        "newTicket": "9992160939912",
        "refundMoney": "1120",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-12-06",
        "channelType": "FC",
        "backTime": null,
        "reason": null,
        "settlementNo": "8038472",
        "businessDepartment": null,
        "bspAgentName": null,
        "companyContact": null,
        "companyPhone": null,
        "companyEmail": null,
        "agentContact": null,
        "agentPhone": null,
        "agentEmail": null
    },
    {
        "passengerName": "张诚宝",
        "originalTicket": "9999366614250",
        "newTicket": "9992181621681",
        "refundMoney": "780",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-06-29",
        "channelType": "CC",
        "backTime": null,
        "reason": null,
        "settlementNo": "08303050",
        "businessDepartment": "大连营业部",
        "bspAgentName": "大连国际机场集团有限公司航空票务公司",
        "companyContact": "姜丽萍   季翀",
        "companyPhone": "18604118985   13940969996",
        "companyEmail": "jiangliping@airchina.com jichong@airchina.com",
        "agentContact": "初晶        解纾涵",
        "agentPhone": "0411-83885129      0411-83886164",
        "agentEmail": "276209931@qq.com xszx59@djairport.com"
    },
    {
        "passengerName": "罗修平",
        "originalTicket": "9999343471224",
        "newTicket": "9992181529425",
        "refundMoney": "610",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-06-28",
        "channelType": "CC",
        "backTime": null,
        "reason": null,
        "settlementNo": "08064490",
        "businessDepartment": "石家庄营业部",
        "bspAgentName": "邯郸市华通航空服务有限公司",
        "companyContact": "王鑫",
        "companyPhone": "031186695535",
        "companyEmail": "wangxin2021@airchina.com",
        "agentContact": "联系人1：郑社强",
        "agentPhone": "0310-3085999  15131028883",
        "agentEmail": "handanhuatong@163.com"
    },
    {
        "passengerName": "测试二",
        "originalTicket": "9999364261841",
        "newTicket": "9992181667312",
        "refundMoney": "270",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-06-29",
        "channelType": "CC",
        "backTime": null,
        "reason": null,
        "settlementNo": "08301576",
        "businessDepartment": "华北营销中心（本部）",
        "bspAgentName": "北京保盛航空服务有限公司",
        "companyContact": "张哲鹏",
        "companyPhone": "87415411",
        "companyEmail": "zhangzhepeng@airchina.com",
        "agentContact": "联系人1：张杰\n联系人2：王孟迪",
        "agentPhone": "电话1：13466768387\n电话2：18311078713",
        "agentEmail": "邮箱：wangmengdi@baosheng.com,cn"
    },
    {
        "passengerName": "赫楠",
        "originalTicket": "9999665539824",
        "newTicket": "9992181530232",
        "refundMoney": "8305931",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-06-29",
        "channelType": "CC",
        "backTime": null,
        "reason": null,
        "settlementNo": "8305931",
        "businessDepartment": null,
        "bspAgentName": null,
        "companyContact": null,
        "companyPhone": null,
        "companyEmail": null,
        "agentContact": null,
        "agentPhone": null,
        "agentEmail": null
    },
    {
        "passengerName": "罗修平",
        "originalTicket": "9999343471224",
        "newTicket": "9992181529425",
        "refundMoney": "8064490",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-06-29",
        "channelType": "CC",
        "backTime": null,
        "reason": null,
        "settlementNo": "8064490",
        "businessDepartment": null,
        "bspAgentName": null,
        "companyContact": null,
        "companyPhone": null,
        "companyEmail": null,
        "agentContact": null,
        "agentPhone": null,
        "agentEmail": null
    },
    {
        "passengerName": "刘欣",
        "originalTicket": "9992320272313",
        "newTicket": "9992181519217",
        "refundMoney": "8073741",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-06-29",
        "channelType": "CC",
        "backTime": null,
        "reason": null,
        "settlementNo": "8073741",
        "businessDepartment": null,
        "bspAgentName": null,
        "companyContact": null,
        "companyPhone": null,
        "companyEmail": null,
        "agentContact": null,
        "agentPhone": null,
        "agentEmail": null
    },
    {
        "passengerName": "邹冰峰",
        "originalTicket": "9992307723628",
        "newTicket": "9992181622465",
        "refundMoney": "80",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-06-29",
        "channelType": "CC",
        "backTime": null,
        "reason": null,
        "settlementNo": "08350871",
        "businessDepartment": "大连营业部",
        "bspAgentName": "大连润翔航空服务有限公司",
        "companyContact": "姜丽萍   季翀",
        "companyPhone": "18604118985   13940969996",
        "companyEmail": "jiangliping@airchina.com jichong@airchina.com",
        "agentContact": "石巧",
        "agentPhone": "13842614866",
        "agentEmail": "258977642@qq.com"
    },
    {
        "passengerName": "杨永利",
        "originalTicket": "9999662107039",
        "newTicket": "9992181424909",
        "refundMoney": "1240",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-06-28",
        "channelType": "CC",
        "backTime": null,
        "reason": null,
        "settlementNo": "08350871",
        "businessDepartment": "大连营业部",
        "bspAgentName": "大连润翔航空服务有限公司",
        "companyContact": "姜丽萍   季翀",
        "companyPhone": "18604118985   13940969996",
        "companyEmail": "jiangliping@airchina.com jichong@airchina.com",
        "agentContact": "石巧",
        "agentPhone": "13842614866",
        "agentEmail": "258977642@qq.com"
    },
    {
        "passengerName": "王波",
        "originalTicket": "9992160939911",
        "newTicket": "9992160939912",
        "refundMoney": "1120",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-12-05",
        "channelType": "CC",
        "backTime": null,
        "reason": null,
        "settlementNo": "08038472",
        "businessDepartment": "大理营业部",
        "bspAgentName": "大理民航飞羽有限责任公司",
        "companyContact": "联系人1廖柯联系人2赵乾源",
        "companyPhone": "0872-2195583",
        "companyEmail": "66802156@qq.com483924137@qq.com",
        "agentContact": "联系人1李凌峰联系人2赵锦娇",
        "agentPhone": "13887293738； 13508823093",
        "agentEmail": "770239128@qq.com；992840820@qq.com"
    },
    {
        "passengerName": "王波",
        "originalTicket": "9992160939940",
        "newTicket": "9992160939911",
        "refundMoney": "1120",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-12-05",
        "channelType": "CC",
        "backTime": null,
        "reason": null,
        "settlementNo": "08038472",
        "businessDepartment": "大理营业部",
        "bspAgentName": "大理民航飞羽有限责任公司",
        "companyContact": "联系人1廖柯联系人2赵乾源",
        "companyPhone": "0872-2195583",
        "companyEmail": "66802156@qq.com483924137@qq.com",
        "agentContact": "联系人1李凌峰联系人2赵锦娇",
        "agentPhone": "13887293738； 13508823093",
        "agentEmail": "770239128@qq.com；992840820@qq.com"
    },
    {
        "passengerName": "测试二",
        "originalTicket": "9999364261841",
        "newTicket": "9992181667312",
        "refundMoney": "270",
        "bankAccountName": "北京保盛航空服务有限公司",
        "bankAccount": "0200242419020138879",
        "receBankName": "中国工商银行北京新中街支行",
        "bankName": "中国工商银行",
        "province": "北京",
        "orderDate": "2023-07-13",
        "channelType": "CC",
        "backTime": null,
        "reason": null,
        "settlementNo": "08301576",
        "businessDepartment": "华北营销中心（本部）",
        "bspAgentName": "北京保盛航空服务有限公司",
        "companyContact": "张哲鹏",
        "companyPhone": "87415411",
        "companyEmail": "zhangzhepeng@airchina.com",
        "agentContact": "联系人1：张杰\n联系人2：王孟迪",
        "agentPhone": "电话1：13466768387\n电话2：18311078713",
        "agentEmail": "邮箱：wangmengdi@baosheng.com,cn"
    },
    {
        "passengerName": "王波",
        "originalTicket": "9992160939940",
        "newTicket": "9992160939911",
        "refundMoney": "1120",
        "bankAccountName": "ERROR",
        "bankAccount": "ERROR",
        "receBankName": "ERROR",
        "bankName": "ERROR",
        "province": "北京",
        "orderDate": "2023-07-04",
        "channelType": "CC",
        "backTime": null,
        "reason": null,
        "settlementNo": "00000000",
        "businessDepartment": null,
        "bspAgentName": null,
        "companyContact": null,
        "companyPhone": null,
        "companyEmail": null,
        "agentContact": null,
        "agentPhone": null,
        "agentEmail": null
    }
]
    }
  },
  mounted(){
    // console.log("getExcelCell(27)",getExcelCell(27))
    const pad = window.getComputedStyle(document.getElementsByClassName('ant-table-hide-scrollbar')[0], null).getPropertyValue('padding-right')
    console.log("ant-table-hide-scrollbar",pad)
    document.getElementsByClassName('ant-table-hide-scrollbar')[0].style.paddingRight -= 17
  },
  methods:{
    onComplexExport() {
      const sortOrder = [
      'passengerName','originalTicket','newTicket','refundMoney','bankAccountName',
      'bankAccount','receBankName','bankName','province','orderDate',
      'channelType','backTime','reason','settlementNo','businessDepartment',
      'bspAgentName','companyContact','companyPhone','companyEmail','agentContact',
      'agentPhone','agentEmail'
      ]
      const header = [
      '旅客姓名','原票号','新票号','实际退款','银行户名',
      '银行账户','收款银行名称','银行','省','订单时间',
      '业务渠道','回盘日期','错误原因','结算号','营业部名称',
      '代理人名称','营销单位联系人','营销单位联系电话','营销单位邮箱','代理人联系人',
      '代理人联系电话','代理人邮箱'
      ]
      const FinalData = onSortList(this.tableData,sortOrder)
      const multiHeader = new Array(header.length-1).fill('')
      const multiHeader2 = new Array(header.length-3).fill('')
      multiHeader.unshift('错误数据明细表')
      multiHeader2.unshift('退款总额（元）：5565645')
      multiHeader2.unshift('财务编号：063156312')
      // // import('@/assets/js/Export2Excel').then((excel)=>
      //   export_json_to_excel({
      //     multiHeader:[multiHeader,multiHeader2],
      //     header, //表头 必填
      //     data: FinalData, //具体数据 必填
      //     filename: '错误数据明细表',
      //     // 要合并的单元格
      //     // merges: ['A1:A2', 'B1:F1', 'G1:G2'],
      //     merges: ['A1:'+getExcelCell(sortOrder.length)+'1'],
      //     autoWidth: true,
      //     bookType: 'xlsx'
      //   })
      // // )

      // 多表结构
      const wb = XLSX.utils.book_new()
      const FilnalDataArr = new Array(4).fill(FinalData)
      const multiHeaderArr = new Array(3).fill([multiHeader])
      multiHeaderArr.unshift([multiHeader,multiHeader2])
      for(let i=0;i<FilnalDataArr.length;i++){
        const ws = export_json_to_excel({
          multiHeader:multiHeaderArr[i],
          header, //表头 必填
          data: FilnalDataArr[i], //具体数据 必填
          filename: '错误数据明细表',
          // 要合并的单元格
          // merges: ['A1:A2', 'B1:F1', 'G1:G2'],
          merges: ['A1:'+getExcelCell(sortOrder.length)+'1'],
          autoWidth: true,
          bookType: 'xlsx',
          isSheet:true
        })
        XLSX.utils.book_append_sheet(wb, ws, '表格'+(i+1))
      }
      saveFunc(wb,'xlsx','错误数据明细表')
    },
  }
}
</script>
