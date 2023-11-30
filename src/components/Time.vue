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
      dataJson:{"deviceType":"android","version":"13618"}
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
var stringify = require('json-stable-stringify')
let md5 = setMD5(startStr+JSON.stringify(stringify(this.dataJson))+endStr)
console.log('JSON.stringify(stringify(this.dataJson))',JSON.stringify(stringify(this.dataJson)))
console.log('JSON.stringify(this.dataJson)',JSON.stringify(this.dataJson))
console.log('stringify(this.dataJson)',stringify(this.dataJson))
console.log('JSON.stringify(stringify(this.dataJson))',JSON.stringify(stringify(this.dataJson))==JSON.stringify(this.dataJson))
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
