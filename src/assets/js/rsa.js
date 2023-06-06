// rsa.js
var JSEncrypt = require('./jsencrypt.js'); // 此处是上面的文件引用

let publicKey =
	'-----BEGIN PUBLIC KEY-----' +  // 必须添加，切记
	'' +  // 此处使用后端给的公钥
	'-----END PUBLIC KEY-----'   // 必须添加，切记

// msg 类型为 string 字符串，不能搞错类型，不然生成之后的内容后端会解密失败
export const rsaEncrypt = (msg) => {
	const JsRsa = new JSEncrypt()
	JsRsa.setPublicKey(publicKey)
	return JsRsa.encrypt(msg)
}
