<!--
 * @Description: finalTable组件
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-02 15:31:28
 * @,@LastEditors: ,: MR·小涛
 * @,@LastEditTime: ,: 2020-12-30 17:42:26
 -->
<template>
  <div class="final-ui-table_wrapper"
    ref="finalTableWrapper">
    <pl-table :data="data"
      ref="ref"
      :border="border"
      :stripe="stripe"
      :row-key="rowKey"
      :size="size"
      :default-sort="defaultSort"
      :show-header="showHeader"
      :height="height"
      :max-height="maxHeight"
      :row-height="rowHeight"
      :use-virtual="useVirtual"
      :excess-rows="excessRows"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
      :show-summary="showSummary"
      :summary-method="summaryMethod"
      :span-method="spanMethod"
      :cell-class-name="cellClassName"
      :highlight-current-row="highlightCurrentRow"
      :empty-text="emptyText"
      :default-expand-all=" defaultExpandAll"
      :tree-config='treeConfig'
      :row-class-name="rowClassName"
      :pagination-show="paginationShow"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      v-bind="$attrs"
      v-on="$listeners"
      class="final-table">
      <template slot="empty">
        <slot name="empty">
          <final-empty :emptyText="emptyText"></final-empty>
        </slot>
      </template>
      <template v-for="(columnItem,index) in  columns">
        <template v-if="columnItem.type">
          <pl-table-column :key="index"
            v-if="!disabled"
            :type="columnItem.type"
            :align="columnItem.align || 'center'"
            :width="columnItem.width"
            :selectable="selectable"
            :fixed="columnItem.fixed"
            :sortable="columnItem.sortable"
            :sort-method="columnItem.sortMethod"
            :sort-by="columnItem.sortBy"
            :sort-orders="columnItem.sortOrders"
            :min-width="columnItem.minWidth"
            :show-overflow-tooltip="columnItem.showOverflowTooltip!== undefined ? columnItem.showOverflowTooltip: true "
            :reserve-selection="columnItem.reserveSelection"
            :header-align="columnItem.headerAlign"
            :formatter="columnItem.formatter">
          </pl-table-column>
        </template>
        <template v-else>
          <!-- 如果是多级表头走这里递归渲染 -->
          <template v-if="columnItem.childData && columnItem.childData.length">
            <table-column :key="index"
              :columnData="columnItem"></table-column>
          </template>
          <template v-else>
            <pl-table-column :key="index"
              :prop="columnItem.prop"
              :label="columnItem.label"
              :min-width="columnItem.minWidth"
              :width="columnItem.width"
              :align="columnItem.align"
              :fixed="columnItem.fixed"
              :sortable="columnItem.sortable"
              :sort-method="columnItem.sortMethod"
              :sort-orders="columnItem.sortOrders"
              :sort-by="columnItem.sortBy"
              :header-align="columnItem.headerAlign"
              :formatter="columnItem.formatter"
              :treeNode="columnItem.treeNode || false"
              :show-overflow-tooltip="columnItem.showOverflowTooltip!==undefined ? columnItem.showOverflowTooltip: true ">
              <template v-if="columnItem.renderHeader"
                slot="header">
                <custom-slot :render="columnItem.renderHeader"
                  :index="index"
                  :columnProp="columnItem"></custom-slot>
              </template>
              <template slot-scope="{row,$index,column}">
                <!-- 如果当前列有render函数走这里 -->
                <template v-if="columnItem.render">
                  <custom-slot :render="columnItem.render"
                    :row="row"
                    :index="$index"
                    :column="column"
                    :columnIndex="index"
                    :instance='instance'
                    :columnProp="columnItem"></custom-slot>
                </template>
                <!-- 如果需要显示格式化数字走这里 -->
                <template v-else-if="columnItem.isNumber">
                  <template v-if="columnItem.zeroShow">
                    {{row[columnItem.prop] === undefined ? null : setFormatNumber(row[columnItem.prop])}}
                  </template>
                  <template v-else>
                    {{(row[columnItem.prop] === 0 || !row[columnItem.prop]) ? null : setFormatNumber(row[columnItem.prop])}}
                  </template>
                </template>
                <template v-else>
                  {{row[columnItem.prop]}}
                </template>
              </template>
            </pl-table-column>
          </template>
        </template>
      </template>
    </pl-table>
    <!-- 左侧添加按钮 -->
    <div class="add-row"
      @mouseenter="mouseover"
      @mouseleave="mouseout"
      ref="addRow"
      v-if="isShowAddBth"
      v-show="showAddBth">
      <div class="add-row-content">
        <span class="el-icon-plus"
          @click="addRow"></span>
        <span class="el-icon-minus"
          @click="delRow"></span>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <div class="del-row"
        ref="delRow"
        v-if="isShowDelBth">
        <div :style="{transform:`translateY(-${offset}px)`}"
          class="del-content">
          <div v-for="(item,index) in data"
            :key="index"
            class="icon-wrapper">
            <span class="el-icon-minus"
              @click="afterDel(item,index)"></span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 右键菜单信息 -->
    <!-- <vue-context-menu class="right-menu"
      :target="contextMenuTarget"
      :show="contextMenuVisible"
      ref="rightMenu"
      @update:show="(show) => {
        if(openCustomRightButton){
          contextMenuVisible = show
        }
      }">
      <slot name="right-menu"></slot>
    </vue-context-menu> -->
  </div>
</template>

<script>
import customSlot from './coustom-slot'
import tableColumn from './table-column'
import { debounce } from '../../../utils'
// import { component as VueContextMenu } from '@xunlei/vue-context-menu'
export default {
  name: 'final-table',
  props: {
    disabled: {
      default: false,
      type: Boolean
    },
    // 边框
    border: {
      default: true,
      type: Boolean
    },
    // 隔行变色
    stripe: {
      default: true,
      type: Boolean
    },
    // 默认的排序列的 prop
    defaultSort: Object,
    // 总数
    total: {
      default: 0,
      type: Number
    },
    // 没页显示多少个
    pageSize: {
      default: 10,
      type: Number
    },
    // 当前页数
    currentPage: {
      default: 1,
      type: Number
    },
    // 每页显示个数选择器的选项设置
    pageSizes: {
      default: () => [],
      type: Array
    },
    // 是否显示分页
    paginationShow: {
      default: false,
      type: Boolean
    },
    // 是否显示表头
    showHeader: {
      default: true,
      type: Boolean
    },
    // 是否开启鼠标右键
    openCustomRightButton: {
      default: false,
      type: Boolean
    },
    // pl-table大数据树形表格配置项，必去开启row-key 且 开启use-virtual 才有效的配置
    treeConfig: Object,
    // 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
    defaultExpandAll: {
      default: false,
      type: Boolean
    },
    // 指定当前行key
    rowKey: String,
    // 暂无数据
    emptyText: {
      default: '暂无数据',
      type: String
    },
    // 是否点击高亮当前行
    highlightCurrentRow: {
      default: false,
      type: Boolean
    },
    // 最大高度
    maxHeight: {
      type: [Number, String]
    },
    // 高度
    height: {
      type: [Number, String]
    },
    // 是否显示删除按钮
    isShowDelBth: {
      default: false,
      type: Boolean
    },
    // 是否显示添加按钮
    isShowAddBth: {
      default: false,
      type: Boolean
    },
    // 表格大小
    size: String,
    // 行数据
    data: {
      default: () => [],
      type: Array
    },
    // checkbox 独有 返回值决定当前checkbox 是否可以选择
    selectable: Function,
    // 列数据
    columns: {
      default: () => [],
      type: Array
    },
    // 是否开启虚拟列表
    useVirtual: {
      default: false,
      type: Boolean
    },
    // 开启虚拟表格情况下行的高度
    rowHeight: {
      default: 40,
      type: Number
    },
    // 可视区域上方和下方额外渲染的行数 防止滚动出现白屏
    excessRows: {
      default: 3,
      type: Number
    },
    // 合并行合并列
    spanMethod: Function,
    // 是否需要合计行
    showSummary: {
      type: Boolean,
      default: false
    },
    // 合计行方法
    summaryMethod: Function,
    // 单元格的 className 的回调方法
    cellClassName: Function,
    // 当前行class
    rowClassName: Function
  },
  components: {
    customSlot,
    tableColumn
    // 'vue-context-menu': VueContextMenu
  },
  watch: {
    // 是否显示删除按钮
    isShowDelBth (val) {
      if (!val) {
        // 移除事件
        this.bodyWrapper.removeEventListener(
          'scroll',
          this.scrollHandle,
          false
        )
      } else {
        this.$nextTick(() => {
          if (!this.bodyWrapper) {
            // 获取table的内容区
            this.bodyWrapper = this.$refs.finalTableWrapper.querySelector(
              '.el-table__body-wrapper'
            )
          }
          // 监听滚动条事件
          this.bodyWrapper.addEventListener('scroll', this.scrollHandle, false)
          // 获取Table的可视高度
          const clientHeight = this.bodyWrapper.clientHeight
          // 获取当前table滚动条噶度
          const scrollTop = this.bodyWrapper.scrollTop
          // 设置删除区域高度
          this.$refs.delRow.style.height = `${clientHeight}px`
          // 设置右侧按钮滚动条位置
          // this.$refs.delRow.scrollTop = scrollTop
          this.offset = scrollTop
        })
      }
    },
    openCustomRightButton (val) {
      if (val) {
        this.initRightButton()
      }
    }
  },
  data () {
    return {
      instance: this,
      contextMenuVisible: false,
      contextMenuTarget: null,
      offset: 0,
      bodyWrapper: null,
      // 显示后面的删除
      showDelBth: false,
      // 显示前面的添加删除
      showAddBth: false,
      // 当前鼠标移入行选中的对象信息
      currentArguments: {}
    }
  },
  mounted () {
    this.initRightButton()
  },
  methods: {
    // 自定义排序触发
    sortChange () {
      this.$emit('sort-change', ...arguments)
    },
    // 初始化右键菜单
    initRightButton () {
      if (this.openCustomRightButton && !this.contextMenuTarget) {
        const myChartContainer = this.$refs.ref.$el.querySelector(
          '.el-table__body-wrapper'
        )
        // // 右击显示菜单 区域位置
        this.contextMenuTarget = myChartContainer
      }
    },
    // 当前单元格呗单击触发
    cellClick () {
      this.$emit('cell-click', ...arguments)
    },
    // 单元格双击事件
    cellDblclick () {
      this.$emit('cell-dblclick', ...arguments)
    },
    // 高亮行
    toggleRowSelection () {
      this.$refs.ref.toggleRowSelection(...arguments)
    },
    // checkbox 选中触发
    selectionChange () {
      this.$emit('selection-change', ...arguments)
    },
    handlePageSize () {
      this.$emit('handle-page-size', ...arguments)
    },
    // 关闭右键
    closeRightButton () {
      this.contextMenuVisible = false
    },
    // 设置高亮行
    setCurrentRow () {
      this.$refs.ref.setCurrentRow(...arguments)
    },
    clearSelection () {
      this.$refs.ref.clearSelection(...arguments)
    },
    // 右键触发
    rowContextmenu () {
      this.$emit('row-contextmenu', ...arguments)
    },
    // 单元格的 className 的回调方法
    // cellClassName () {
    //   this.$emit('cell-class-name', ...arguments)
    // },
    // 监听滚动条事件
    scrollHandle: debounce(function () {
      const scrollTop = this.bodyWrapper.scrollTop
      // 设置删除的滚动条等于当前的滚动条位置
      // this.$refs.delRow.scrollTop = scrollTop
      this.offset = scrollTop
    }, 80),
    afterDel (row, index) {
      this.$emit('after-del', { row, index })
    },
    // 行双击
    rowDblclick () {
      this.$emit('row-dblclick', ...arguments)
    },
    // 行单击
    rowClick () {
      this.$emit('row-click', ...arguments)
    },
    // 添加行
    addRow () {
      this.$emit('add-row', { ...this.currentArguments })
    },
    // 删除行
    delRow () {
      this.$emit('del-row', { ...this.currentArguments })
    },
    // 添加移入
    mouseover () {
      this.showAddBth = true
    },
    // 添加退出
    mouseout () {
      this.showAddBth = false
    },
    // ref对象
    ref () {
      return this.$refs.ref
    },
    // table重绘
    doLayout () {
      this.$refs.ref.doLayout()
    },
    // 鼠标移出Cell表格
    cellMouseLeave (row, column, cell, event) {
      this.showAddBth = false
      this.$emit('cellMouseLeave', row, column, cell, event)
    },
    // 鼠标移入Cell表格
    cellMouseEnter (row, column, cell, event) {
      // 如果允许显示添加行那么进行其他操作
      if (this.isShowAddBth) {
        this.showAddBth = true
        const getFirstElement = cell.parentNode
        const { top } = getFirstElement.getBoundingClientRect()
        const { top: bodyTop } = this.ref().$el.getBoundingClientRect()
        this.$refs.addRow.style.top = `${top - bodyTop}px`
        this.$refs.addRow.style.height = `${cell.parentNode.clientHeight}px`
        // this.$refs.delRow.style.top = `${top - bodyTop - 5}px`
        this.currentArguments = { row, column, cell, event }
      }
      this.$emit('cellMouseEnter', row, column, cell, event)
    }
  }
}
</script>

<style lang='scss' scoped>
.final-ui-table_wrapper {
  position: relative;
  .add-row {
    position: absolute;
    left: -23px;
    top: 0;
    width: 25px;
    .add-row-content {
      position: relative;
      height: 100%;
      span {
        position: absolute;
        margin: 0;
        &:first-of-type {
          top: 0;
        }
        &:last-of-type {
          bottom: 0;
        }
      }
    }
    span {
      &:hover {
        background: #707070;
      }
      width: 18px;
      height: 18px;
      border-radius: 50%;
      text-align: center;
      line-height: 18px;
      font-size: 12px;
      color: #fff;
      background: #13227a;
      cursor: pointer;
      display: inline-block;
      margin-bottom: 5px;
      &.el-icon-minus {
        &:hover {
          background: #707070;
        }
        background: #d81e06;
      }
    }
  }
  .del-row {
    position: absolute;
    right: -23px;
    top: 36px;
    width: 20px;
    overflow: hidden;
    box-sizing: border-box;
    .del-content {
      transition: all 200ms;
    }
    .icon-wrapper {
      height: 36px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    span {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      text-align: center;
      line-height: 18px;
      font-size: 12px;
      color: #fff;
      background: #13227a;
      cursor: pointer;
      display: inline-block;
      &:hover {
        background: #707070;
      }
    }
  }
  .right-menu {
    border: 1px solid #eee;
    box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
    border-radius: 1px;
    display: block;
    text-align: center;
    color: #2c3e50;
    position: fixed;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    z-index: 999;
    display: none;
  }
  ::v-deep {
    .final-table {
      .el-table {
        font-size: $--table-font-size;
        .el-table__fixed {
          .el-table__fixed-header-wrapper {
            tr {
              th {
                background: $--table-background-color;
              }
              background: $--table-background-color;
            }
          }
        }
        &.el-table--mini {
          tr {
            td {
              height: 36px;
              padding: 0;
            }
          }
        }
        &.el-table--small {
          tr {
            td {
              height: 45px;
              padding: 0;
            }
          }
        }
        &.el-table--medium {
          tr {
            td {
              height: 50px;
              padding: 0;
            }
          }
        }
        tr {
          .cell {
            padding: 0 5px;
          }
          &:hover {
            td {
              background: #aaa;
            }
          }
        }
        .current-row {
          td {
            background: #aaa;
            color: #fff;
          }
        }
      }
      .el-table__expand-icon {
        width: 18px;
        display: none;
        .el-icon-arrow-right {
          display: none;
        }
      }
      // .el-table__body td{
      //   padding: 0;
      // }
      .el-table__header {
        .has-gutter tr {
          th {
            background: $--table-background-color;
          }
          background: $--table-background-color;
        }
      }
    }
  }
}
</style>
