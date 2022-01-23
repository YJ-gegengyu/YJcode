/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-04 22:55:45
 * @LastEditors: dengqiang
 * @LastEditTime: 2021-06-25 10:59:37
 */
export const floatNumber = {
  inserted (el, binding, vnode) {
    el.handler = e => {
      // 是否以 - 开头
      if (e.target.value.startsWith('-')) {
        e.target.value = e.target.value.replace(/[^\d.|^\\-]/g, '')
      } else {
        e.target.value = e.target.value.replace(/[^\d.]/g, '')
      }
      // 清除"数字"和".""-"以外的字符
      e.target.value = e.target.value.replace(/^\./g, '') // 验证第一个字符是数字
      e.target.value = e.target.value.replace(/\.{2,}/g, '.') // 出现两次以上清空.
      e.target.value = e.target.value.replace(/-{2,}/g, '-') // 出现两次以上清空-
      e.target.value = e.target.value
        .replace('-', '$#$')
        .replace(/-/g, '')
        .replace('$#$', '-')
      e.target.value = e.target.value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      e.target.value = e.target.value.replace(
        /^(-)*(\d+)\.(\d\d).*$/,
        '$1$2.$3'
      )

      // 如果是自定义组件就触发自定义组件的input事件
      if (vnode.componentInstance) {
        vnode.componentInstance.$emit('input', e.target.value)
      } else {
        // 如果是原生组件就触发原生组件的input事件
        vnode.context.$nextTick(() => {
          trigger(e.target, 'input')
        })
      }
    }
    el.lastElementChild.addEventListener('keyup', el.handler)
  },
  unbind (el) {
    el.lastElementChild.removeEventListener('keyup', el.handler)
  }
}
export const intNumber = {
  bind (el, binding, vnode) {
    el.handler = e => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '')
      // 如果是自定义组件就触发自定义组件的input事件
      if (vnode.componentInstance) {
        vnode.componentInstance.$emit('input', e.target.value)
      } else {
        // 如果是原生组件就触发原生组件的input事件
        vnode.context.$nextTick(() => {
          trigger(e.target, 'input')
        })
      }
    }
    if (el.lastElementChild) {
      el.lastElementChild.addEventListener('keyup', el.handler)
    } else {
      el.addEventListener('keyup', el.handler)
    }
  },
  unbind (el) {
    if (el.lastElementChild) {
      el.lastElementChild.removeEventListener('keyup', el.handler)
    } else {
      el.removeEventListener('keyup', el.handler)
    }
  }
}
// 输入最大值最小值限制
export const onlyNumber = {
  inserted (el, binding, vNode) {
    // 设置输入框的值,触发input事件,改变v-model绑定的值
    const setVal = val => {
      if (vNode.componentInstance) {
        // 如果是自定义组件就触发自定义组件的input事件
        vNode.componentInstance.$emit('input', val)
      } else {
        // 如果是原生组件就触发原生组件的input事件
        el.value = val
        el.dispatchEvent(new Event('input'))
      }
    }
    // 键盘按下事件
    el.handler = event => {
      // 保存event事件
      const e = event || window.event
      // 吧当前输入的值转换成浮点数真正的数字
      let content = parseFloat(e.target.value)
      // 如果当前内容不存在那么吧当前的值 等于0
      if (!content) {
        content = 0
      }
      // 保存value的最大值和最小值
      let argMax = ''
      let argMin = ''
      // 如果当前指令有参数传入那么走这里
      if (binding.value) {
        // 吧最大值、最小值转换成浮点数
        argMax = parseFloat(binding.value.max)
        argMin = parseFloat(binding.value.min)
      }
      // 如果最大值  不为空   并且 当前输入的值大于用户设定的最大值
      if (argMax !== undefined && content > argMax) {
        if (e.target.value !== '') {
          // 设置值
          setVal(argMax)
          // 让当前的Value 等于  当前最大值
          content = argMax
        }
      }
      // 如果当前值不为空  并且当前输入的值小于最小值
      if (argMin !== undefined && content < argMin) {
        // 当前输入的值 如果不为空那么小于当前最小值 那么 让当前值等于用户设置的最小值
        if (e.target.value !== '') {
          setVal(argMin)
          content = argMin
        }
      }
    }
    // 按键弹起=>并限制最大最小
    if (el.lastElementChild) {
      if (binding.value.method) {
        el.lastElementChild.addEventListener('blur', el.handler)
      } else {
        el.lastElementChild.addEventListener('keyup', el.handler)
      }
    } else {
      if (binding.value.method) {
        el.addEventListener('blur', el.handler)
      } else {
        el.addEventListener('keyup', el.handler)
      }
    }
  },
  unbind (el) {
    if (el.lastElementChild) {
      el.lastElementChild.removeEventListener('keyup', el.handler)
    } else {
      el.removeEventListener('keyup', el.handler)
    }
  }
}

// 代理事件
const trigger = (el, type) => {
  // 创建事件
  const e = document.createEvent('HTMLEvents')
  // 定义事件名
  e.initEvent(type, true, true)
  // 触发对象可以是任何元素或其他事件目标
  el.dispatchEvent(e)
}
