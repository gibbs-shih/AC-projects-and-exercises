//////// 在這裡寫你的答案 /////////

// 第二種
const Roman = [
  {'1000': 'M'},
  {'900': 'CM'},
  {'500': 'D'},
  {'400': 'CD'},
  {'100': 'C'},
  {'90': 'XC'},
  {'50': 'L'},
  {'40': 'XL'},
  {'10': 'X'},
  {'9': 'IX'},
  {'5': 'V'},
  {'4': 'IV'},
  {'1': 'I'},
]

function toRoman (num) { // 這裡的 num 很重要，因為是從外面傳進來的，等等要被除的對象
  let roman = '' // 這裡先宣告暫時的空字串，之後要裝得到的羅馬數字
  Roman.forEach (numberString => { // 羅馬符號從大到小一一遍歷
    let count = Math.floor(num / Number(Object.keys(numberString))) // 要記幾次 = 取整數(num / 本次的羅馬符號是誰)
    roman += (Object.values(numberString)[0].repeat(count)) // 要記幾次的本次羅馬符號
    // for (let i = 0; i < count; i++) {  // 要記幾次的本次羅馬符號
    //   roman += Object.values(numberString)
    // }
    num = num % Number(Object.keys(numberString)) // num 扣掉上面已經記過的羅馬數字後剩多少
  })    
  return roman // 上面的回圈跑完後，roman就是轉換後的答案
}   
  
// // 第一種
// const rules = {
//   '1':['I','1'],
//   '2':['II','1+1'],
//   '3':['III','1+1+1'],
//   '4':['IV','5-1'],
//   '5':['V','5'],
//   '6':['VI','5+1'],
//   '7':['VII','5+1+1'],
//   '8':['VIII','5+1+1+1'],
//   '9':['IX','10-1'],
//   '10':'X',
//   '50':'L',
//   '100':'C',
//   '500':'D',
//   '1000':'M',
// }

// function toRoman (number) {
//   return toRule (String(number), String(number).length) 

// function toRule (number, length) {
//   let elements = []
//   let answer = ''
//   for (let i = length-1; -1 < i; i--) { //從右到左一個一個位數找
//     let temp = '' 
//     if (Number(number[i]) !== 0) { //若是0跳過
//       temp = rules[number[i]][0] //暫存
//       if (i === length-2) { //十位數轉換
//         temp = temp.replace(/X/g,'C') //use global replacement
//         temp = temp.replace(/I/g,'X')
//         temp = temp.replace(/V/g,'L')
//       } else if (i === length-3) { //百位數轉換
//         temp = temp.replace(/X/g,'M')
//         temp = temp.replace(/I/g,'C')
//         temp = temp.replace(/V/g,'D')
//       } else if (i === length-4) { //千位數轉換
//         temp = temp.replace(/X/g,'Ⅹ')
//         temp = temp.replace(/I/g,'M')
//         temp = temp.replace(/V/g,'Ⅴ')
//       }
//       elements.push(temp) //將轉換後每位數暫放入陣列
//     }
//   }
//   for (let i = elements.length-1; -1 < i; i--) { //從陣列尾到頭組成轉換後字串
//     answer += elements[i] 
//   }
//   return answer
// }

////// 以下是測試程式，請勿更動 /////////
const expect = (name, value, result) => {
  if (value === result) { return true; }

  throw new Error(`${name} failed successfully`);
};

expect('toRoman(1)', toRoman(1), 'I');
expect('toRoman(2)', toRoman(2), 'II');
expect('toRoman(3)', toRoman(3), 'III');
expect('toRoman(4)', toRoman(4), 'IV');
expect('toRoman(5)', toRoman(5), 'V');
expect('toRoman(6)', toRoman(6), 'VI');
expect('toRoman(9)', toRoman(9), 'IX');
expect('toRoman(10)', toRoman(10), 'X');
expect('toRoman(27)', toRoman(27), 'XXVII');
expect('toRoman(48)', toRoman(48), 'XLVIII');
expect('toRoman(59)', toRoman(59), 'LIX');
expect('toRoman(93)', toRoman(93), 'XCIII');
expect('toRoman(141)', toRoman(141), 'CXLI');
expect('toRoman(150)', toRoman(150), 'CL');
expect('toRoman(163)', toRoman(163), 'CLXIII');
expect('toRoman(402)', toRoman(402), 'CDII');
expect('toRoman(575)', toRoman(575), 'DLXXV');
expect('toRoman(911)', toRoman(911), 'CMXI');
expect('toRoman(1024)', toRoman(1024), 'MXXIV');
expect('toRoman(1050)', toRoman(1050), 'ML');
expect('toRoman(1500)', toRoman(1500), 'MD');
expect('toRoman(1505)', toRoman(1505), 'MDV');
expect('toRoman(3000)', toRoman(3000), 'MMM');

console.log('all pass!');