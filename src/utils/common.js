/**
 * Created by Tank on 2017/7/14 0014.
 */
export default {
  /**
   * 转换数值保留n位小数，并四舍五入
   *
   * @param {number} number 待处理数值
   * @param {number} precision 保留几位小数
   * @param {string} methodName 调用函数名
   * @returns {number} 返回四舍五入后的值
   */
  round (number, precision, methodName = 'round') {
    precision = precision == null ? 0 : Math.min(precision, 292)
    if (precision) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      let pair = `${number}e`.split('e')
      const value = Math[methodName](`${pair[0]}e${+pair[1] + precision}`)
      pair = `${value}e`.split('e')
      return +`${pair[0]}e${+pair[1] - precision}`
    }
    return Math[methodName](number)
  },
  /**
   * 转换数值千位金钱格式化
   *
   * @param {number} value 待处理数值
   * @param {number} precisionNum 保留几位小数
   * @param {boolean} isFloor 是否向下取值，false：四舍五入
   * @returns {string} 返回金钱格式化字符串
   */
  moneyFormat (value, precisionNum, isFloor = true) {
    var _this = this
    var moneyDefualt = {
      decimal: '.', // period or comma
      precision: 2,
      thousands: ',',
      allowZero: false
    }
    function maskValue (sum, isRound, precisionNum) {
      if (!sum) {
        return sum
      }
      sum = sum.toString()
      if (sum.indexOf('0') === 0 && sum.indexOf('.') !== 1) {
        sum = sum.substr(1)
      }
      if (sum === '') {
        sum = '0'
      }
      if (isRound) {
        if (isFloor) {
          sum = _this.round(sum, precisionNum, 'floor').toString()
        } else {
          sum = _this.round(sum, precisionNum).toString()
        }
        if (sum.indexOf('.') === -1) {
          let zeroStr = ''
          for (let i = 0; i < precisionNum; i++) {
            zeroStr += '0'
          }
          sum += '.' + zeroStr
        } else {
          // eval("var reg = /^(-)?\\d*\\.\\d{"+precisionNum+"}$/g");
          // var reg = /^(-)?\d*\.\d$/g;
          // var flag = reg.test(sum);
          var length = sum.split('.')[1].length
          let zeroStr = ''
          for (let i = 0; i < (precisionNum - length); i++) {
            zeroStr += '0'
          }
          sum += '.' + zeroStr
        }
      }

      var x = sum.split(moneyDefualt.decimal)
      var unit = x.shift().replace(/[^0-9|-]+/ig, '')
      var precision = x.join('').replace(/[^0-9]+/ig, '')
      precision = precision.substr(0, precisionNum)

      if (moneyDefualt.thousands.length) {
        var rgx = /(\d+)(\d{3})/
        while (rgx.test(unit)) {
          unit = unit.replace(rgx, '$1' + moneyDefualt.thousands + '$2')
        }
      }

      return unit + ((unit.length && (precisionNum > 0) && (precision.length || x.length)) ? moneyDefualt.decimal + precision : '')
    }
    if (precisionNum === 0) {
      precisionNum = 0
    } else {
      precisionNum = precisionNum || 2
    }
    return maskValue(value, true, precisionNum)
  },
  /**
   * 获取匹配的数组元素（对象）
   *
   * @param {Array} array 待检查数组
   * @param {Function} predicate 迭代处理函数
   * @param {number} fromIndex 从数组哪个位置开始检查
   * @param {boolean} [fromRight] 是否从数组末尾开始检查
   * @returns {number} 返回数组匹配元素的index，没找到任何匹配返回-1
   */
  findIndex (array, predicate, fromIndex = 0, fromRight = false) {
    const { length } = array
    let index = fromIndex + (fromRight ? 1 : -1)
    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index
      }
    }
    return -1
  },
  /**
   * 截取数组其中几项
   *
   * @param {Array} array 源数组
   * @param {number} start 截取数组开始位置
   * @param {number} end 截取数据结束位置
   * @returns {Array} 返回截取后的数组
   */
  slice (array, start, end) {
    let length = array == null ? 0 : array.length
    if (!length) {
      return []
    }
    start = start == null ? 0 : start
    end = end === undefined ? length : end

    if (start < 0) {
      start = -start > length ? 0 : (length + start)
    }
    end = end > length ? length : end
    if (end < 0) {
      end += length
    }
    length = start > end ? 0 : ((end - start) >>> 0)
    start >>>= 0

    let index = -1
    const result = new Array(length)
    while (++index < length) {
      result[index] = array[index + start]
    }
    return result
  },
  /**
   * 数组分组
   *
   * @param {Array} array 源数组
   * @param {number} size 组个数大小
   * @returns {Array} 返回数据分组后的数组
   */
  chunk (array, size) {
    size = Math.max(size, 0)
    const length = array == null ? 0 : array.length
    if (!length || size < 1) {
      return []
    }
    let index = 0
    let resIndex = 0
    const result = new Array(Math.ceil(length / size))

    while (index < length) {
      result[resIndex++] = this.slice(array, index, (index += size))
    }
    return result
  },
  /**
   * 检测是否数值
   *
   * @param {String} value 待检测字符串
   * @returns {boolean} 返回检测结果
   */
  isNumeric (value) {
    if (typeof value === 'number') return true
    var str = (value || '').toString()
    if (!str) return false
    return !isNaN(str)
  }
}
