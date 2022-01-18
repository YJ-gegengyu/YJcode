/*
 * @Description: dialog拖拽
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-11 20:33:44
 * @LastEditors: MR·小涛
 * @LastEditTime: 2020-08-13 17:07:33
 */
export const dialogDrag = {
  bind (el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.final-drag-dialog_header')
    const sty = el.currentStyle || window.getComputedStyle(el, null)

    dialogHeaderEl.onmousedown = (e) => {
      // dialog 宽度
      const dragDomWidth = el.offsetWidth
      //   dialog 高度
      const dragDomheight = el.offsetHeight
      // body可是宽度
      const screenWidth = document.body.clientWidth
      // 当前屏幕可是宽度
      const screenHeight = document.documentElement.clientHeight
      //   当前dialog 距离左侧的距离
      const minDragDomLeft = el.offsetLeft
      //   当前dialog距离顶部的距离
      const minDragDomTop = el.offsetTop
      //   当前位置 =  屏幕宽度 - 当前dialog距离左侧的位置 - 当前蒂dialog的宽度
      const maxDragDomLeft = screenWidth - minDragDomLeft - dragDomWidth
      //   当前位置 =  屏幕高度 - 当前dialog距离顶部的位置 - 当前蒂dialog的高度
      const maxDragDomTop = screenHeight - minDragDomTop - dragDomheight
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      //   计算当前元素距离顶部可视距离
      const disY = e.clientY - dialogHeaderEl.offsetTop
      //   让当前元素获取焦点
      if (el.setCapture) {
        el.setCapture()
      }
      let styL, styT
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }
      document.onmousemove = (e) => {
        // 取消选择
        window.getSelection
          ? window.getSelection().removeAllRanges()
          : document.selection.empty()
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }
        if (-top > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }
        // 移动当前元素
        el.style.left = `${left + styL}px`
        el.style.top = `${top + styT}px`
      }
      //   鼠标抬起
      document.onmouseup = (e) => {
        if (el.releaseCapture) {
          el.releaseCapture()
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
