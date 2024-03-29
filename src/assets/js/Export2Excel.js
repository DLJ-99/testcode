/* eslint-disable */
import { saveAs } from 'file-saver'
import { getExcelCell } from './utils'
import * as XLSX from 'xlsx-style'

function generateArray(table) {
  var out = [];
  var rows = table.querySelectorAll('tr');
  var ranges = [];
  for (var R = 0; R < rows.length; ++R) {
    var outRow = [];
    var row = rows[R];
    var columns = row.querySelectorAll('td');
    for (var C = 0; C < columns.length; ++C) {
      var cell = columns[C];
      var colspan = cell.getAttribute('colspan');
      var rowspan = cell.getAttribute('rowspan');
      var cellValue = cell.innerText;
      if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

      //Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1
          }
        });
      };

      //Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);

      //Handle Colspan
      if (colspan)
        for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
};

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

export function export_table_to_excel(id) {
  var theTable = document.getElementById(id);
  var oo = generateArray(theTable);
  var ranges = oo[1];

  /* original data */
  var data = oo[0];
  var ws_name = "Sheet1";

  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);

  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });

  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), "test.xlsx")
}

export function export_json_to_excel({
  multiHeader = [],
  header,
  data,
  filename,
  merges = [],
  autoWidth = true,
  bookType = 'xlsx',
  isSheet = false,
  footerNoComplete = false
} = {}) {
  /* original data */
  filename = filename || 'excel-list'
  data = [...data]
  data.unshift(header);

  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i])
  }

  var ws_name = "Sheet1";
  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);

  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = [];
    merges.forEach(item => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }

  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    const colWidth = data.map(row => row.map(val => {
      /*先判断是否为null/undefined*/
      if (val == null) {
        return {
          'wch': 10
        };
      }else{
        /*再判断是否为中文*/
        if (val.toString().charCodeAt(0) > 255) {//针对以中文字符开头的数据再处理
          let wch = 0
          const valStr = val.toString()
          for(let i=0;i<valStr.length;i++){
            if(valStr.charCodeAt(i) > 255){
              wch+=2
            }else{
              wch++
            }
          }
          return {
            'wch': wch
          };
        } else {
          return {
            'wch': val.toString().length
          };
        }
      }
    }))
    //console.log("data",data)
    // //console.log("colWidth",colWidth)
    /*以第一行为初始值*/
    let result = colWidth[0];
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch'];
        }
      }
    }
    ws['!cols'] = result;
    // //console.log("result",result)
  }

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);

  // 设置单元格框线
  const borderAll = {
    top: {
      style: 'thin'
    },
    bottom: {
      style: 'thin'
    },
    left: {
      style: 'thin'
    },
    right: {
      style: 'thin'
    }
  }

  // 给所有单元格加上边框，内容居中，字体，字号，标题表头特殊格式部分后面替换
  for (var i in ws) {
    if (
      i == '!ref' ||
      i == '!merges' ||
      i == '!cols' ||
      i == '!rows' ||
      i == 'A1'
    ) {} else {
      ws[i + ''].s = {
        border: borderAll,
        alignment: {
          horizontal: 'center',
          vertical: 'center'
        },
        font: {
          name: 'Arial',
          sz: 10
        }
      }
    }
  }
  // //console.log("data",data)

  // const arrabc = ['A',
  //   'B',
  //   'C',
  //   'D',
  //   'E',
  //   'F',
  //   'G',
  //   'H',
  //   'I',
  //   'J',
  //   'K',
  //   'L',
  //   'M',
  //   'N',
  //   'O',
  //   'P',
  //   'Q',
  //   'R',
  //   'S',
  //   'T',
  //   'U',
  //   'V',
  //   'W',
  //   'X',
  //   'Y',
  //   'Z'
  // ]

  // 给标题、表格描述信息、表头等部分加上特殊格式
  const arrabc = []
  for(let i=1;i<=data[0].length;i++){
    arrabc.push(getExcelCell(i))//生成表格列名称
  }
  arrabc.some(function(v) {
    for (let j = 1; j < (data.length + 1); j++) {
      const _v = v + j
      if (ws[_v]) {
        ws[_v].s = {}
      }else{//初始化表格数据为undefined的表格格子
        ws[_v]={
          v:'',
          t:'s',
          s:{}
        }
      }
        // 标题部分A1-Z1
        // ws['A' + j].s = {
        //   border: borderAll,
        //   font: {
        //     name: 'Arial',
        //     sz: 10,
        //     color: {
        //       rgb: '000000'
        //     },
        //     bold: true
        //   },
        //   alignment: {
        //     horizontal: 'center',
        //     vertical: 'center'
        //   }
        // }
        ws[v + j].s = {
          border: borderAll,
          numFmt: '0.00',
          font: {
            name: 'Arial',
            sz: 10,
            color: {
              rgb: '000000'
            }
          },
          alignment: {
            horizontal: 'center',
            vertical: 'center'
          }
        }
        // 头部
        // const condition = multiHeader.length>0?(j == 1||j == 2):j==1
        const len = multiHeader.length
        const condition = j>0&&j<=len+1
        const len2 = len>1?multiHeader[len-1].filter(item=>item!='').length:0
        const header2 = []
        const footer = []
        const dataLen = data.length
        const len3 = data[dataLen-1].filter(item=>item!='').length
        for(let i=0;i<len2;i++){
          header2.push(arrabc[i])
        }
        for(let i=0;i<len3;i++){
          footer.push(arrabc[i])
        }
        // //console.log("dataLen==>",dataLen)
        // //console.log("footer==>",footer)
        if (condition) {
          ws[v + j].s = {
              //1. 表头去边框；2.二级表头去边框
              border: (len>0&&j==1)||(len2>0&&!header2.includes(v)&&j==2)?{}:borderAll,
              font: {
                name: 'Arial',
                sz: 10,
                color: {
                  rgb: '000000'
                },
                bold: true
              },
              alignment: {
                horizontal: 'center',
                vertical: 'center'
              },
              fill: {
                fgColor: {
                  rgb: (len2>0&&!header2.includes(v)&&j==2)?'FFFFFF':'C0C0C0'
                }
              }
            }
          }else if(j>len+1){
            ws[v + j].s = Object.assign(ws[v + j].s,{
              //1.表尾去边框
              border: (footerNoComplete&&j==dataLen&&!footer.includes(v))?{}:borderAll,
            })
          }
        }
  })
  //console.log("ws",ws)
  wb.Sheets[ws_name] = ws;
  // var wbout = XLSX.write(wb, {
  //   bookType: bookType,
  //   bookSST: false,
  //   type: 'binary'
  // });
  // saveAs(new Blob([s2ab(wbout)], {
  //   type: "application/octet-stream"
  // }), `${filename}.${bookType}`);
  if(isSheet){
    return ws
  }else{
    saveFunc(wb,bookType,filename)
  }
}
export function saveFunc(wb,bookType,filename) {
  var wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  });
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), `${filename}.${bookType}`);
}
