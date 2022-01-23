/*
 * @Description: 组件信息描述
 * @version: 2.1.0
 * @Author: MR·小涛
 * @Date: 2020-06-29 11:51:14
 * @LastEditors: MR·小涛
 * @LastEditTime: 2020-08-01 16:42:10
 */
// export * from './check'
// 设置Cookie
export function setCookie (name, value, expire) {
  var date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = name + '=' + escape(value) + '; expires=' + date.toGMTString()
};
// 获取cookie
export function getCookie (name) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + '=')
    if (start !== -1) {
      start = start + name.length + 1
      let end = document.cookie.indexOf(';', start)
      if (end === -1) end = document.cookie.length
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
};

// 深度拷贝
export function deepClone (value, hash = new WeakMap()) {
  if (value === undefined) return value
  // typeof 不是对象就是 string number boolean function
  if (typeof value !== 'object' || value === null) return value
  if (value instanceof RegExp) return new RegExp(value)
  if (value instanceof Date) return new Date(value)
  const v = hash.get(value)
  if (v) { // 如果映射表中有 直接返回拷贝后的结果
    return v
  }
  // 对象 数组 拷贝 {} []
  // 这个instance 就是拷贝后的结果 我希望将它先存起来，下次如果在拷贝直接返回就好了
  const instance = new value.constructor() // new Object / new Array
  hash.set(value, instance) // 将拷贝前的和拷贝后的做一个映射表
  for (const key in value) { // 将当前对象中的数据拷贝到新的对象中
    if (Object.prototype.hasOwnProperty.call(value, key)) { // 不拷贝原型链上的属性
      instance[key] = deepClone(value[key], hash)
    }
  }
  return instance
}
// 获取tree所有的父节点包含当前自己
export function treeFindPath (tree, func, path = []) {
  if (!tree) return []
  for (const data of tree) {
    path.push(data)
    if (func(data)) return path
    if (data.children) {
      const findChildren = treeFindPath(data.children, func, path)
      if (findChildren.length) return findChildren
    }
    path.pop()
  }
  return []
}

// 两个浮点数求和
export function accAdd (num1, num2, isFixed = true) {
  var r1, r2, m
  try {
    r1 = num1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  // return (num1*m+num2*m)/m;
  return Math.round(num1 * m + num2 * m) / m
}

// 两个浮点数相减
export function accSub (num1, num2, isFixed = true) {
  var r1, r2, m, n
  try {
    r1 = num1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  n = (r1 >= r2) ? r1 : r2
  if (isFixed) {
    return (Math.round(num1 * m - num2 * m) / m).toFixed(n)
  } else {
    return (Math.round(num1 * m - num2 * m) / m)
  }
}
// 两数相除
export function accDiv (num1, num2, isFixed = true) {
  var t1, t2, r1, r2
  try {
    t1 = num1.toString().split('.')[1].length
  } catch (e) {
    t1 = 0
  }
  try {
    t2 = num2.toString().split('.')[1].length
  } catch (e) {
    t2 = 0
  }
  r1 = Number(num1.toString().replace('.', ''))
  r2 = Number(num2.toString().replace('.', ''))
  if (isFixed) {
    return ((r1 / r2) * Math.pow(10, t2 - t1)).toFixed(2)
  } else {
    return (r1 / r2) * Math.pow(10, t2 - t1)
  }
}
// 乘法精准计算
export function accMul (num1, num2, isFixed = true) {
  var m = 0
  var s1 = num1.toString()
  var s2 = num2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {};
  try {
    m += s2.split('.')[1].length
  } catch (e) {};
  if (isFixed) {
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)).toFixed(2)
  } else {
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  }
}
// 数组是否有重复项
export function arrayIsRepeat (arr) {
  const hash = {}
  for (const i in arr) {
    if (hash[arr[i]]) return true
    hash[arr[i]] = true
  }
  return false
}
// 获取金额信息
export function parsePrice (money, len = 11) {
  if (!money) return [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
  if (money === '-') return []
  const n = 2
  money = parseFloat((money + '').replace(/[^\d\\.-]/g, '')).toFixed(n) + ''
  const l = money.split('.')[0].split('')
  const r = money.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i]
  }
  let result = []
  // 如果只有小数数部分那么直接返回小数
  if (t === 0 || t === '0') {
    return r
  } else {
    t = t + r
    if (t.startsWith('-')) {
      if (t.length > len) {
        t = t.substring(1, len + 1)
      } else if (t.length === len) {
      } else {
        t = `￥${t}`.padStart(len, ' ')
      }
    } else {
      if (t.length > len) {
        t = t.substring(1, t.length)
      } else if (t.length === len) {
        return t.split('')
      } else {
        t = `￥${t}`.padStart(len, ' ')
      }
    }
    // 有整数和小数需要都返回
  }

  result = t.split('')
  // console.log(result)
  return result
}
// 大写
export const changeNumMoneyToChinese = (money) => {
  const originalValue = money + ''
  money = Math.abs(money)
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'] // 汉字的数字
  const cnIntRadice = ['', '拾', '佰', '仟'] // 基本单位
  const cnIntUnits = ['', '万', '亿', '兆'] // 对应整数部分扩展单位
  const cnDecUnits = ['角', '分', '毫', '厘'] // 对应小数部分单位
  const cnInteger = '整' // 整数金额时后面跟的字符
  const cnIntLast = '圆' // 整型完以后的单位
  const maxNum = 999999999999999.9999 // 最大处理的数字
  let IntegerNum // 金额整数部分
  let DecimalNum // 金额小数部分
  let ChineseStr = '' // 输出的中文金额字符串
  let parts // 分离金额后用的数组，预定义
  if (money === '') {
    return ''
  }
  money = parseFloat(money)
  if (money >= maxNum) {
    alert('超出最大处理数字')
    return ''
  }
  if (money === 0) {
    ChineseStr = cnNums[0] + cnIntLast + cnInteger
    return ChineseStr
  }
  money = money.toString() // 转换为字符串
  if (money.indexOf('.') === -1) {
    IntegerNum = money
    DecimalNum = ''
  } else {
    parts = money.split('.')
    IntegerNum = parts[0]
    DecimalNum = parts[1].substr(0, 2)
  }
  if (parseInt(IntegerNum, 10) > 0) { // 获取整型部分转换
    let zeroCount = 0
    const IntLen = IntegerNum.length
    for (let i = 0; i < IntLen; i++) {
      const n = IntegerNum.substr(i, 1)
      const p = IntLen - i - 1
      const q = p / 4
      const m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0]
        } else if (zeroCount < 0) {
          ChineseStr += cnNums[0]
        }
        zeroCount = 0 // 归零
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q]
      }
    }
    ChineseStr += cnIntLast
    // 整型部分处理完毕
  }
  if (DecimalNum !== '') { // 小数部分
    const decLen = DecimalNum.length
    for (let i = 0; i < decLen; i++) {
      const n = DecimalNum.substr(i, 1)
      if (n !== '0') {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (ChineseStr === '') {
    ChineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (DecimalNum === '') {
    ChineseStr += cnInteger
  }
  if (originalValue.startsWith('-')) {
    return `(负数)${ChineseStr}`
  }
  return ChineseStr
}
// 补0 函数
export function replacement (s) {
  return s < 10 ? '0' + s : s
}
// aa—bb 转驼峰
export function toHump (name) {
  return name.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}
// 获取当月多少天
export function getDate (year, month) {
  var d = new Date(year, month, 0)
  return d.getDate()
}
// 节流函数
export function debounce (func, wait = 300) {
  let timeout
  return function (event) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.call(this, event)
    }, wait)
  }
}
// 验证身份证是否合法
export function checkIdCard (str) {
  // 验证是否是合法身份证
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  // 提取身份证内的是出生年月日
  const re = /\d{6}([12]\d{3})([01]\d)([0123]\d)\d{4}/
  const idCardExec = re.exec(str)
  if (reg.test(str) && idCardExec) {
    const [, intYear, intMonth, intDay] = idCardExec
    if (isNaN(intYear) || isNaN(intMonth) || isNaN(intDay)) return false
    // 如果月份超12月验 获取月份小于1月验证失败
    if (+intMonth > 12 || +intMonth < 1) return false
    // 当月天不能大于31天 验证失败
    if (+intDay < 1 || intDay > 31) return false
    if ((+intMonth === 4 || +intMonth === 6 || +intMonth === 9 || +intMonth === 11) && (intDay > 30)) return false
    if (+intMonth === 2) {
      if (intDay > 29) return false
      if ((((+intYear % 100 === 0) && (+intYear % 400 !== 0)) || (+intYear % 4 !== 0)) && (+intDay > 28)) return false
    }
    return true
  } else {
    return false
  }
}
// JS百分比转换
export function getPercent (num, total) {
  num = parseFloat(num)
  total = parseFloat(total)
  if (isNaN(num) || isNaN(total)) {
    return 0
  }
  return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00)
}
// 展平tree
export const flatTree = (data, result = []) => {
  for (let i = 0, len = data.length; i < len; i++) {
    const current = data[i]
    result.push(current.ztId)
    if (current.childData && current.childData.length) {
      flatTree(current.childData, result)
    }
  }
  return result
}
