// 2-2 对数据进行处理  在这里只是讲获取数据的方法，这是最简单的一种，也可以用map对数据进行处理，方法不一，只列出最简单易理解的

exports.onSortList=(list,sortOrder)=>{
  // 2-1 先定义排列顺序  这里通常有一个学术名叫做对照表
  // const sortOrder = [
  //   'username',
  //   'mobile',
  //   'timeOfEntry',
  //   'formOfEmployment',
  //   'correctionTime',
  //   'workNumber',
  //   'departmentName',
  // ]
  // FilnalData 用来存放最后的数据
  const FilnalData = []
  list.forEach((item) => {
    const arr = []
    sortOrder.forEach((obj) => {
      arr.push(item[obj])
    })
    FilnalData.push(arr)
  })
  return FilnalData
}
exports.getExcelCell=(num)=>{
  const codeArr = ['A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]
const modNum = Math.floor(num/26)
const index = num%26
let strPre = ''
let strAdd = ''
// console.log("modNum,index",modNum,index)
if(modNum>0){
  strPre = codeArr[modNum-1]
}
if(index>0){
  strAdd = codeArr[index-1]
}else if(index==0){
  strAdd = 'Z'
}
return strPre+strAdd
}
