const {MD5} = require("crypto-js");

/**
 * @Description:ASCII加密后MD5加密，再转大写字符串
 * @author xxx
 * @createDate 2022/2/28
 * @param {Object} data
 * @return {string}
 */
function getASCII(data) {
  return MD5(ASCII.sort_ascii(data)).toString().toUpperCase();
}
function setMD5(data) {
  return MD5(data).toString();
}

export{
  getASCII,
  setMD5
}
