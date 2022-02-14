/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-07-02 16:57:47
 * @,@LastEditors: ,: MR·ggy
 * @,@LastEditTime: ,: 2020-12-02 11:30:51
 */
const customSlot = {
  // 定义无状态组件
  functional: true,
  // 定义Props 状态
  props: {
    row: {
      default: () => {},
      type: Object
    },
    render: {
      default: () => {},
      type: Function
    },
    index: {
      type: Number
    },
    column: {
      type: Object
    },
    columnProp: {
      type: Object
    },
    parentColumn: {
      type: Object
    },
    columnIndex: {
      type: Number
    },
    instance: Object
  },
  render: (h, data) => {
    // 如果当前对象被冻结那么不能改变属性不需要赋值
    if (data.props.row && !Object.isFrozen(data.props.row)) {
      data.props.row.$index = data.props.index
    }
    const params = {
      row: data.props.row,
      index: data.props.index,
      column: data.props.column,
      columnProp: data.props.columnProp,
      parentColumn: data.props.parentColumn,
      columnIndex: data.props.columnIndex
    }
    // return data.props.render(h, params)
    // 重定向当前函数的this指向强制指向Vue实例
    return data.props.render.apply(data.props.instance ? data.props.instance.$parent : data.props.instance, [h, params])
  }
}
export default customSlot
