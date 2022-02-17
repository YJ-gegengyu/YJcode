<template>
  <div class="content">
    <div class="btn">
      <el-button type="primary" @click="saveItem" size="mini">
        保存数据
      </el-button>
      <el-button type="primary" @click="addItem" size="mini">
        添加进货单<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
    </div>
    <final-table
      :columns="column"
      row-key="fileID"
      :data="tableData"
      size="small"
      :summary-method="summaryMethod"
      show-summary
      class="table-wrapper"
      ref="refTable"
    ></final-table>
    <detail @handleSave="handleSave" ref="detaile"></detail>
  </div>
</template>

<script>
import { accAdd } from 'utils'
import detail from './common/detail'
// const appData = require('../components/data/tableDate.json')
// const majorlist = appData
export default {
  name: 'list',
  data () {
    return {
      tableData: [],
      column: Object.freeze([
        {
          type: 'selection'
        },
        {
          label: '序号',
          align: 'center',
          width: 50,
          render (h, { index }) {
            return <span>{index + 1}</span>
          }
        },
        {
          prop: 'projectName',
          label: '名称',
          headerAlign: 'center',
          align: 'center'
        },
        {
          prop: 'purchaseTime',
          label: '进货日期',
          headerAlign: 'center',
          align: 'center'
        },
        {
          prop: 'brandName',
          label: '品牌',
          headerAlign: 'center',
          align: 'center'
        },
        {
          prop: 'source',
          label: '来源',
          headerAlign: 'center',
          align: 'center'
        },
        {
          prop: 'contactInformation',
          label: '联系方式',
          headerAlign: 'center',
          align: 'center'
        },
        {
          prop: 'price',
          label: '总价',
          isNumber: true,
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
    detail
  },
  created () {
    if (localStorage.getItem('arr')) {
      this.tableData = JSON.parse(localStorage.getItem('arr'))
    } else {
      this.tableData = []
    }
  },
  methods: {
    saveItem () {
      localStorage.setItem('arr', JSON.stringify(this.tableData))
      // majorlist = this.tableData
    },
    deleteRow (row, index) {
      console.log(row)
    },
    summaryMethod ({ columns, data }) {
      if (!data.length) return []
      const columnProp = [
        'price'
      ]
      const totalArr = []
      for (let i = 0, len = columns.length; i < len; i++) {
        const { property } = columns[i]
        if (i === 0) {
          totalArr.push(<span>合计</span>)
        } else {
          const values = data.map(
            item => Number(item[property])
          )
          if (
            columnProp.includes(property) &&
            !values.every(value => isNaN(value))
          ) {
            const val = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return accAdd(prev, curr)
              } else {
                return prev
              }
            }, 0)
            totalArr[i] = this.setFormatNumber(val)
          } else {
            totalArr[i] = ''
          }
        }
      }
      return [totalArr]
    },
    handleSave (data) {
      this.tableData.push(data)
    },
    addItem () {
      this.$refs.detaile.openDialog()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.content {
  height: 100%;
  padding: 10px;
  // padding-top: 10px;
  .btn {
    text-align: right;
    margin: 15px 0;
    .btn-right{
      margin-right: 10px;
    }
  }
}
</style>
