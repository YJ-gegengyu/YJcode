<!--
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-02 17:16:01
 * @,@LastEditors: ,: MR·小涛
 * @,@LastEditTime: ,: 2020-10-22 11:11:34
 -->
<template>
  <pl-table-column :label="columnData.label"
    :prop="columnData.prop"
    :align="columnData.align"
    :headerAlign="columnData.headerAlign"
    :width="columnData.width"
    :min-width="columnData.minWidth">
    <template v-for="(columnItem,index) in columnData.childData">
      <table-column v-if="columnItem.childData && columnItem.childData.length"
        :key="index"
        :columnData='columnItem'></table-column>
      <pl-table-column v-else
        :key="index"
        :label="columnItem.label"
        :prop="columnItem.prop"
        :sortable="columnItem.sortable"
        :sort-method="columnItem.sortMethod"
        :sort-by="columnItem.sortBy"
        :sort-orders="columnItem.sortOrders"
        :formatter="columnItem.formatter"
        :width="columnItem.width"
        :align="columnItem.align"
        :show-overflow-tooltip="columnItem.showOverflowTooltip || true"
        :min-width="columnItem.minWidth"
        :header-align="columnItem.headerAlign">
        <template slot-scope="{row,$index,column}">
          <template v-if="columnItem.render">
            <custom-slot :render="columnItem.render"
              :row="row"
              :index="$index"
              :column="column"
              :columnProp="columnItem"
              :columnIndex="index"
              :parentColumn="columnData"></custom-slot>
          </template>
          <!-- 如果需要显示格式化数字走这里 -->
          <template v-else-if="columnItem.isNumber">
            <template v-if="columnItem.zeroShow">
              {{row[columnItem.prop] === undefined ? null : setFormatNumber(row[columnItem.prop])}}
            </template>
            <template v-else>
              {{row[columnItem.prop] === 0 || !row[columnItem.prop] ? null : setFormatNumber(row[columnItem.prop])}}
            </template>
          </template>
          <template v-else>
            {{row[columnItem.prop]}}
          </template>
        </template>
      </pl-table-column>
    </template>
  </pl-table-column>
</template>

<script>
import customSlot from './coustom-slot'
export default {
  name: 'tableColumn',
  props: {
    columnData: {
      default: () => {},
      type: Object
    }
  },
  components: {
    customSlot
  }
}
</script>
