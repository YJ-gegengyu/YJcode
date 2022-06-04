<template>
  <div class="components-content">
    <div class="btn">
      <el-button type="primary" @click="addItem" size="mini">
        添加品类<i class="el-icon-plus el-icon--right"></i>
      </el-button>
    </div>
    <final-table
      :columns="column"
      :data="tableData"
      size="small"
      ref="refTable"
    ></final-table>
    <detail-dialog ref="detailDialog"></detail-dialog>
  </div>
</template>

<script>
import detailDialog from './common/detail-dialog'
import { CATEGORY } from 'enum'
export default {
  name: 'categoryList',
  data () {
    return {
      tableData: [],
      column: Object.freeze([
        {
          label: '序号',
          align: 'center',
          width: 200,
          render (h, { index }) {
            return <span>{index + 1}</span>
          }
        },
        {
          prop: 'name',
          label: '品类名称',
          headerAlign: 'center',
          align: 'center'
        },
        {
          label: '操作',
          headerAlign: 'center',
          align: 'center',
          width: '100px',
          render (h, { row, index }) {
            return (
              <el-button type="primary" size="mini"
                on-click={() => this.deleteRow(row, index)}>删除</el-button>
            )
          }
        }
      ])
    }
  },
  components: {
    detailDialog
  },
  methods: {
    saveItem () {
      console.log(this.req)
      // majorlist = this.tableData
    },
    deleteRow (row, index) {
      console.log(row)
    },
    handleSave (data) {
      this.tableData.push(data)
    },
    addItem () {
      this.$refs.detailDialog.showDialog([], CATEGORY)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.components-content {
  height: 100%;
  .btn {
    text-align: right;
    margin-bottom: 10px;
    .btn-right{
      margin-right: 10px;
    }
  }
}
</style>
