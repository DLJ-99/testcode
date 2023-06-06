<template>
  <div>
    <div id="time" style="width:1000px;height:600px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { rsaEncrypt } from '@/assets/js/rsa.js'
import { setMD5 } from '@/assets/js/md5.js'
import JsEncrypt from 'jsencrypt'
var Base64 = require('js-base64').Base64;
export default {
  name: "Time",
  data() {
    return {
      dataJson:{
    "records": [
        {
            "id": "1655410703413374977",
            "deleteAt": 0,
            "createId": "1643152368347955202",
            "updateId": "1643152368347955202",
            "createTime": "2023-05-08 11:14:02",
            "importName": "丁力蛟",
            "importId": "1643152368347955202",
            "deptName": "",
            "deptId": "1598146626658037761",
            "deptSubId": "",
            "deptSubName": "贵州公司",
            "provinceCode": "520000",
            "provinceName": "贵州",
            "importYear": "2023",
            "updateTime": "2023-05-08 11:14:02",
            "importMonth": null,
            "dimension": "1",
            "crewId": "1631526703727173633",
            "crewName": "导入机组名",
            "column": null,
            "order": null,
            "xmlOrderType": null
        },
        {
            "id": "1655412174162849794",
            "deleteAt": 0,
            "createId": "1643152368347955202",
            "updateId": "1643152368347955202",
            "createTime": "2023-05-08 11:19:53",
            "importName": "丁力蛟",
            "importId": "1643152368347955202",
            "deptName": "",
            "deptId": "1598146626658037761",
            "deptSubId": "",
            "deptSubName": "贵州公司",
            "provinceCode": "520000",
            "provinceName": "贵州",
            "importYear": "2023",
            "updateTime": "2023-05-08 11:19:53",
            "importMonth": null,
            "dimension": "1",
            "crewId": "1631526703727173633",
            "crewName": "导入机组名",
            "column": null,
            "order": null,
            "xmlOrderType": null
        },
        {
            "id": "1655450209235595265",
            "deleteAt": 0,
            "createId": "1643152368347955202",
            "updateId": "1643152368347955202",
            "createTime": "2023-05-08 13:51:01",
            "importName": "丁力蛟",
            "importId": "1643152368347955202",
            "deptName": "",
            "deptId": "1598146766802317313",
            "deptSubId": "",
            "deptSubName": "吉林公司",
            "provinceCode": "220000",
            "provinceName": "吉林",
            "importYear": "2023",
            "updateTime": "2023-05-08 13:51:01",
            "importMonth": null,
            "dimension": "1",
            "crewId": "1644909885528780801",
            "crewName": "123",
            "column": null,
            "order": null,
            "xmlOrderType": null
        },
        {
            "id": "1655450360356368386",
            "deleteAt": 0,
            "createId": "1643152368347955202",
            "updateId": "1643152368347955202",
            "createTime": "2023-05-08 13:51:37",
            "importName": "丁力蛟",
            "importId": "1643152368347955202",
            "deptName": "",
            "deptId": "1598146766802317313",
            "deptSubId": "",
            "deptSubName": "吉林公司",
            "provinceCode": "220000",
            "provinceName": "吉林",
            "importYear": "2023",
            "updateTime": "2023-05-08 13:51:37",
            "importMonth": null,
            "dimension": "1",
            "crewId": "1644909885528780801",
            "crewName": "123",
            "column": null,
            "order": null,
            "xmlOrderType": null
        },
        {
            "id": "1655453464158105602",
            "deleteAt": 0,
            "createId": "1643152368347955202",
            "updateId": "1643152368347955202",
            "createTime": "2023-05-08 14:03:57",
            "importName": "丁力蛟",
            "importId": "1643152368347955202",
            "deptName": "",
            "deptId": "1598146766802317313",
            "deptSubId": "",
            "deptSubName": "吉林公司",
            "provinceCode": "220000",
            "provinceName": "吉林",
            "importYear": "2023",
            "updateTime": "2023-05-08 14:03:57",
            "importMonth": null,
            "dimension": "1",
            "crewId": "1644909885528780801",
            "crewName": "123",
            "column": null,
            "order": null,
            "xmlOrderType": null
        },
        {
            "id": "1655454874241167362",
            "deleteAt": 0,
            "createId": "1643152368347955202",
            "updateId": "1643152368347955202",
            "createTime": "2023-05-08 14:09:34",
            "importName": "丁力蛟",
            "importId": "1643152368347955202",
            "deptName": "",
            "deptId": "1598146766802317313",
            "deptSubId": "",
            "deptSubName": "吉林公司",
            "provinceCode": "220000",
            "provinceName": "吉林",
            "importYear": "2023",
            "updateTime": "2023-05-08 14:09:34",
            "importMonth": null,
            "dimension": "1",
            "crewId": "1644909885528780801",
            "crewName": "123",
            "column": null,
            "order": null,
            "xmlOrderType": null
        },
        {
            "id": "1655494969426014210",
            "deleteAt": 0,
            "createId": "1643152368347955202",
            "updateId": "1643152368347955202",
            "createTime": "2023-05-08 16:48:53",
            "importName": "丁力蛟",
            "importId": "1643152368347955202",
            "deptName": "",
            "deptId": "1598146766802317313",
            "deptSubId": "",
            "deptSubName": "吉林公司",
            "provinceCode": "220000",
            "provinceName": "吉林",
            "importYear": "2023",
            "updateTime": "2023-05-08 16:48:53",
            "importMonth": null,
            "dimension": "1",
            "crewId": "1644909885528780801",
            "crewName": "123",
            "column": null,
            "order": null,
            "xmlOrderType": null
        },
        {
            "id": "1648247735945654273",
            "deleteAt": 0,
            "createId": "e9ca23d68d884d4ebb19d07889727dae",
            "updateId": "e9ca23d68d884d4ebb19d07889727dae",
            "createTime": "2023-04-18 16:50:58",
            "importName": "???",
            "importId": "e9ca23d68d884d4ebb19d07889727dae",
            "deptName": "",
            "deptId": "1598158724033212417",
            "deptSubId": "",
            "deptSubName": "辽宁公司",
            "provinceCode": "210000",
            "provinceName": "辽宁",
            "importYear": "2019",
            "updateTime": "2023-04-18 16:50:58",
            "importMonth": "9",
            "dimension": "1",
            "crewId": "1631526703727173635",
            "crewName": "大连开发区机组#1",
            "column": null,
            "order": null,
            "xmlOrderType": null
        }
    ],
    "total": 48,
    "size": 30,
    "current": 1,
    "orders": [],
    "optimizeCountSql": true,
    "searchCount": true,
    "countId": null,
    "maxLimit": null,
    "pages": 2
}
    }
  },
  mounted(){
    const startStr = "-fvudqWvpPohZ=-wZFas&VWcSi0n9jPeX5U6ye9FrE5z+t6YYair=9hP4!w+MClq@k+urX_3Zu!SBRKr@vdihc#2u-fou@_y%0mSLfu0168@M!5SpCh4OKIWzjX2_cW*"
	  const endStr = "o$=oxABl6JV@*Q_bwzP5SHB=gr%ThlMw5nR@!NjP+-5m&TzeG9zEQD--d#FlBzxSMorHWK++dZV$WU07d%J_5NCcv@bYrVj4DJYub$*DXQj1nw^PRG!ar6D8Fr%p7Lsi"
  const msg = startStr+JSON.stringify(this.dataJson)+endStr // 可以为 utf8 串或字节数组
let encryptData = Base64.encode(msg) // 加密，默认输出 16 进制字符串，默认使用 pkcs#7 填充（传 pkcs#5 也会走 pkcs#7 填充）

let decryptData = Base64.decode(encryptData).replace(startStr,'').replace(endStr,'')// 解密，默认输出 utf8 字符串，默认使用 pkcs#7 填充（传 pkcs#5 也会走 pkcs#7 填充）

console.log('decryptData',JSON.parse(decryptData))
console.log('msg',msg)
let md5 = setMD5(startStr+JSON.stringify(this.dataJson)+endStr)
console.log('md5',md5)
let jse = new this.$jsEncrypt.JSEncrypt()
jse.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiNpSii/YiEJ0WiHbrzid
m6YrY5YMMNjN4Cx3AcPW9Zk58KphEDuBp7E/MNsZ1Zaj3BkLWrHtqnMhsrnkgoAa
tXHHfR6g6E8Ru83qCVs1qkw8vSw8FD+UCel/+xTnDSfGxI7W/fPbUKgkUykKiRG/
xbdwSzawrDa/D2SPT/s90j0P3qxftoxPeAbvH441sFiUe23H3Wl7RPgmpwP36O0t
sD8wkI+9CR1bLgGZ0xVfk0dxtoMSTQSYD6AySZP0JAa5n5DvmxCNsdzMnPC2CSPq
CippZw08UZ5yDAY6CzyjAQld6E/72g0c7ZD85L3JjOLj4HIyDM4vFxT0C147EhTU
IwIDAQAB
-----END PUBLIC KEY-----`)
// 设置需要加密的字符串
 let encrypted = jse.encrypt(md5)
 // 输出加密结果
console.log('encrypted',encrypted)
  },
};
</script>

<style scoped lang="less">
#main{
  width: 100%;
}
</style>
