/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-07-02 16:57:47
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-07-16 15:54:18
 */
const customSlot = {
  // 定义无状态组件
  functional: true,
  // 定义Props 状态
  props: {
    render: {
      default: () => {},
      type: Function
    }
  },
  render: (h, data) => {
    return data.props.render(h)
  }
}
export default customSlot
