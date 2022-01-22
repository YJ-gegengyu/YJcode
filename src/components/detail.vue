<!--
 * @Description: 组件信息描述 报销详情
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-08-26 17:51:32
 * @,@LastEditors: ,: MR·小涛
 * @,@LastEditTime: ,: 2021-02-18 10:41:12
 -->
<template>
  <final-dialog :visible.sync="visible"
    title="商品详情"
    fixed
    top="0vh"
    width="90%">
    <div class="table-box">
      <el-form :show-message="false">
        <p class="title-info">商品基本信息</p>
        <div class="table-tab">
          <el-form-item class="row-wrapper border-top">
            <el-col :span="2" class="left-title">
                品牌
            </el-col>
            <el-col :span="6" class="row-right">
                <el-select class="btn-right" clearable size="mini" v-model="form.brand" placeholder="请选择">
                  <el-option
                    v-for="item in brandList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="2" class="left-title">
                品类
            </el-col>
            <el-col :span="6" class="row-right">
              <el-select class="btn-right" clearable size="mini" v-model="form.category" placeholder="请选择">
                  <el-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="2" class="left-title">
                名称
            </el-col>
            <el-col :span="6" class="row-right">
                <el-input v-model="form.name" clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
          </el-form-item>
          <p class="title-info">进货</p>
          <el-form-item class="row-wrapper border-top">
            <el-col :span="2" class="left-title">
                进货标价
            </el-col>
            <el-col :span="6" class="row-right">
                <el-input v-model="form.name" clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" class="left-title">
                进货数量
            </el-col>
            <el-col :span="6" class="row-right">
               <el-input v-model="form.name" clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" class="left-title">
                进货折扣
            </el-col>
            <el-col :span="6" class="row-right">
                <el-input v-model="form.name" clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item class="row-wrapper">
            <el-col :span="2" class="left-title">
                标准进货总额
            </el-col>
            <el-col :span="6" class="row-right">
                5
            </el-col>
            <el-col :span="2" class="left-title">
                实际进货总额
            </el-col>
            <el-col :span="6" class="row-right">
                <el-input v-model="form.name" clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" title="正数为挣，负数为赔" class="left-title">
                差额
            </el-col>
            <el-col :span="6" class="row-right">
                6
            </el-col>
          </el-form-item>
          <p class="title-info">出货</p>
          <el-form-item class="row-wrapper border-top">
            <el-col :span="2" class="left-title">
                出货标价
            </el-col>
            <el-col :span="6" class="row-right">
                <el-input v-model="form.name" clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" class="left-title">
                出货数量
            </el-col>
            <el-col :span="6" class="row-right">
               <el-input v-model="form.name" clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" class="left-title">
                出货折扣
            </el-col>
            <el-col :span="6" class="row-right">
                <el-input v-model="form.name" clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item class="row-wrapper">
            <el-col :span="2" class="left-title">
                标准出货总额
            </el-col>
            <el-col :span="6" class="row-right">
                5
            </el-col>
            <el-col :span="2" class="left-title">
                实际出货总额
            </el-col>
            <el-col :span="6" class="row-right">
                <el-input v-model="form.name" clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" title="正数为挣，负数为赔" class="left-title">
                差额
            </el-col>
            <el-col :span="6" class="row-right">
                6
            </el-col>
          </el-form-item>
          <p class="title-info">结算</p>
          <el-form-item class="row-wrapper border-top">
            <el-col :span="2" class="left-title">
                剩余数量
            </el-col>
            <el-col :span="6" class="row-right">
                <el-input v-model="form.name" clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" class="left-title">
                商品净利润
            </el-col>
            <el-col :span="6" class="row-right">
               22
            </el-col>
          </el-form-item>
        </div>
        <div style="text-align:left;margin-bottom: 5px">
          <el-button type="primary" size="mini" @click="addDetail">增加明细</el-button>
        </div>
        <final-table
          :columns="column"
          :data="tableData"
          border
          :row-height="40"
          class="table-wrapper"
          ref="refTable"
        ></final-table>
      </el-form>
    </div>
    <div class="bth-wrapper">
      <el-button type="primary" class="bth" @click="handleSave">保存</el-button>
      <el-button type="primary" class="bth" @click="handleCancel">关闭</el-button>
    </div>
  </final-dialog>
</template>

<script>
import jsonBrand from './data/brand.json'
import jsonCategory from './data/category.json'
const resetForm = {
  brand: '',
  category: '',
  name: ''
}
export default {
  data () {
    return {
      column: Object.freeze([
        {
          prop: 'name',
          label: '名称',
          headerAlign: 'center',
          align: 'center',
          render: (h, { row }) => {
            return (
              <div class="cell-wrapper auth-height">
                <el-input
                  size="mini"
                  v-model={row.name}
                  class="border-none debitAmount"
                ></el-input>
              </div>
            )
          }
        },
        {
          prop: 'brand',
          label: '品牌',
          headerAlign: 'center',
          align: 'center',
          render: (h, { row, index }) => {
            const brandList = () => {
              return this.brandList.map(item => {
                return <el-option
                  key={item.id}
                  label={item.name}
                  value={item.id}>
                </el-option>
              })
            }
            return (
              <div>
                <el-select v-model={row.brand} size="mini" placeholder="请选择">
                  {brandList()}
                </el-select>
              </div>
            )
          }
        },
        {
          prop: 'category',
          label: '品类',
          headerAlign: 'center',
          align: 'center',
          render: (h, { row, index }) => {
            const categoryList = () => {
              return this.categoryList.map(item => {
                return <el-option
                  key={item.id}
                  label={item.name}
                  value={item.id}>
                </el-option>
              })
            }
            return (
              <div>
                <el-select v-model={row.category} size="mini" placeholder="请选择">
                  {categoryList()}
                </el-select>
              </div>
            )
          }
        },
        {
          label: '操作',
          headerAlign: 'center',
          align: 'center',
          width: '120px',
          render: (h, { row, index }) => {
            return (
              <div>
                <el-button type="danger" size="mini"
                  on-click={() => this.deleteIt(row, index)}>删除</el-button>
              </div>
            )
          }
        }
      ]),
      tableData: [],
      visible: false,
      // 品牌list
      brandList: [],
      // 品类list
      categoryList: [],
      form: {
        brand: '',
        category: '',
        name: ''
      }
    }
  },
  methods: {
    handleSave () {
      console.log('保存')
    },
    handleCancel () {
      this.visible = false
    },
    resetData () {
      const { brand } = jsonBrand
      const { category } = jsonCategory
      this.brandList = brand
      this.categoryList = category
    },
    deleteIt (row, index) {
      this.tableData.splice(index, 1)
    },
    addDetail () {
      this.tableData.push(resetForm)
    },
    openDialog () {
      // this.form = { ...row }
      this.resetData()
      this.visible = true
    }
  }
}
</script>

<style lang='scss' scoped>
  .table-box {
    height: 500px;
    overflow: hidden;
    overflow-y: auto;
    border: 1px solid $--base-border-color;
    border-right: 0;
    border-left: 0;
    .title-info{
      margin: 10px 0;
      font-size: 16px;
    }
    .table-tab {
      // border-top: 1px solid #dddddd;
      margin: 5px 0;
    }
    border: 1px solid #ddd;
    padding: 10px;
    margin-top: 15px;
    .border-top {
      border-top: 1px solid #dddddd;
    }
    .row-wrapper {
      line-height: 39px;
      border-bottom: 1px solid #dddddd;
      border-right: 1px solid #dddddd;
      border-left: 1px solid #dddddd;
      margin-bottom: 0;
      .left-title {
        text-align: center;
        background: #f5f7fa;
        color: #909399;
      }
      .row-right {
        padding: 0 30px;
        // height: 40px;
      }
      &.fixed-border-top {
        border-top: 1px solid #ddd;
      }
      &.fixed-margin-bottom {
        margin-bottom: 15px;
      }
      &.border-none {
        border: none;
      }
      .fixed-border-right {
        border-right: 1px solid #ddd;
        &.text-align {
          text-align: center;
        }
      }
    }
    .table-wrapper{
      box-sizing: border-box;
      ::v-deep {
        .el-table__body {
          .el-table__row {
            &:hover {
              td {
                background: #fff;
              }
            }
          }
        }
        .cell-wrapper {
          line-height: 30px;
          &.auth-height {
            min-height: 40px;
            // line-height: 40px;
            input {
              border:none;
              min-height: 40px;
            }
            .el-select{
              width: 100%;
              span{
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
.bth-wrapper{
    margin-top: 10px;
    text-align: center;
    .bth{
        width: 100px;
        &:first-of-type{
            margin-right: 30px;
        }
    }
}
</style>
<style lang="scss">
.table-box{
    .row-wrapper{
        .el-form-item__content{
            line-height: 40px;
        }
    }
    .el-select, .el-input{
      width: 100%;
    }
}
</style>
