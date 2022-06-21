<!--
 * @Description: 组件信息描述 进货单详情
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-08-26 17:51:32
 * @,@LastEditors: ,: MR·ggy
 * @,@LastEditTime: ,: 2021-02-18 10:41:12
 -->
<template>
  <final-dialog :visible.sync="visible"
    title="进货单详情"
    fixed
    top="5vh"
    width="90%">
    <div class="table-box">
      <el-form :show-message="false">
        <div class="table-tab">
          <el-form-item class="row-wrapper border-top">
            <el-col :span="2" class="left-title">
                名称
            </el-col>
            <el-col :span="4" class="row-right">
                <el-input v-model="form.projectName" clearable size="mini" placeholder="请输入名称"></el-input>
            </el-col>
            <el-col :span="2" class="left-title">
                进货时间
            </el-col>
            <el-col :span="4" class="row-right">
              <el-date-picker
                v-model="form.purchaseTime"
                type="date"
                size="mini"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
            <el-col :span="2" class="left-title">
                正装总价
            </el-col>
            <el-col :span="4" class="row-right">
                <el-input v-model="form.purchasePrice" disabled v-floatNumber size="mini"></el-input>
            </el-col>
            <el-col :span="2" class="left-title" v-if="form.hasGift">
                赠品总价
            </el-col>
            <el-col :span="4" class="row-right" v-if="form.hasGift">
                <el-input v-model="form.giftPrice" disabled v-floatNumber size="mini"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item class="row-wrapper">
            <el-col :span="2" class="left-title">
                备注一
            </el-col>
            <el-col :span="6" class="row-right">
                <el-checkbox v-model="form.hasGift">是否含赠品</el-checkbox>
            </el-col>
            <el-col :span="2" class="left-title">
                备注二
            </el-col>
            <el-col :span="6" class="row-right">
                <el-checkbox v-model="form.hasIntegral">是否含积分</el-checkbox>
            </el-col>
            <el-col :span="2" class="left-title" v-if="form.hasIntegral">
                总积分
            </el-col>
            <el-col :span="6" class="row-right" v-if="form.hasIntegral">
              <el-input v-model="form.totalIntegral" v-int-number size="mini"></el-input>
            </el-col>
          </el-form-item>
        </div>
        <div class="table_box">
          <div class="table-title-style">
            <p class="tableTitle">正装明细</p>
            <el-button type="primary" size="mini" @click="addDetail">增加明细</el-button>
          </div>
          <final-table
            :columns="column"
            :data="form.tableData"
            size="mini"
            :row-height="40"
            class="table-wrapper"
            ref="refTable"
          ></final-table>
          <br>
          <div v-if="form.hasGift" class="table-title-style">
            <p class="tableTitle">赠品明细</p>
            <el-button type="primary" size="mini" @click="addGiftDetail">增加明细</el-button>
          </div>
          <final-table
            v-show="form.hasGift"
            :columns="giftColumn"
            :data="form.giftTableData"
            size="mini"
            :row-height="40"
            class="table-wrapper"
            ref="refTable"
          ></final-table>
        </div>
      </el-form>
    </div>
    <div class="bth-wrapper">
      <el-button type="primary" class="bth" @click="handleSave">保存</el-button>
      <el-button type="primary" class="bth" @click="handleCancel">关闭</el-button>
    </div>
  </final-dialog>
</template>

<script>
import { accMul, accAdd } from 'utils'
import jsonBrand from 'json/brand.json'
import jsonCategory from 'json/category.json'
// import jsonState from 'json/state.json'
const resetForm = {
  // brand: '',
  // brandName: '',
  purchaseTime: '',
  projectName: '',
  purchasePrice: '',
  giftPrice: '',
  hasGift: false,
  hasIntegral: false,
  totalIntegral: '',
  tableData: [],
  giftTableData: []
}
export default {
  data () {
    return {
      column: Object.freeze([
        {
          label: '序号',
          align: 'center',
          width: 50,
          render (h, { index }) {
            return <span>{index + 1}</span>
          }
        },
        {
          prop: 'goodsName',
          label: '货品名称',
          headerAlign: 'center',
          align: 'center',
          render: (h, { row }) => {
            return (
              <div class="cell-wrapper auth-height">
                <el-input
                  size="mini" clearable
                  v-model={row.goodsName}
                  class="border-none"
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
          render: (h, { row }) => {
            return (
              <div class="cell-wrapper auth-height">
                <el-input
                  size="mini" clearable
                  v-model={row.brand}
                  class="border-none"
                ></el-input>
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
                <el-select v-model={row.category} clearable size="mini" placeholder="请选择">
                  {categoryList()}
                </el-select>
              </div>
            )
          }
        },
        {
          prop: 'source',
          label: '来源',
          headerAlign: 'center',
          align: 'center',
          render: (h, { row }) => {
            return (
              <div class="cell-wrapper auth-height">
                <el-input
                  size="mini" clearable
                  v-model={row.source}
                  class="border-none"
                ></el-input>
              </div>
            )
          }
        },
        {
          prop: 'unitPrice',
          label: '原价单价',
          headerAlign: 'center',
          align: 'center',
          render: (h, { row }) => {
            return (
              <div class="cell-wrapper auth-height">
                <final-input
                  size="mini" number v-floatNumber
                  v-model={row.unitPrice}
                  on-input={() => this.calculationRow(row)}
                  class="border-none"
                ></final-input>
              </div>
            )
          }
        },
        {
          prop: 'quantity',
          label: '数量',
          headerAlign: 'center',
          align: 'center',
          render: (h, { row }) => {
            return (
              <div class="cell-wrapper auth-height">
                <el-input
                  size="mini" clearable v-int-number
                  v-model={row.quantity}
                  on-input={() => this.calculationRow(row)}
                  class="border-none"
                ></el-input>
              </div>
            )
          }
        },
        {
          prop: 'purchaseDiscount',
          label: '购入折扣',
          headerAlign: 'center',
          align: 'center',
          render: (h, { row }) => {
            return (
              <div class="cell-wrapper auth-height">
                <el-input
                  size="mini" clearable number
                  v-model={row.purchaseDiscount}
                  on-input={() => this.calculationRow(row)}
                  class="border-none"
                ></el-input>
              </div>
            )
          }
        },
        {
          prop: 'purchaseSinglePrice',
          label: '购入单品总价',
          headerAlign: 'center',
          align: 'center'
        },
        {
          label: '操作',
          headerAlign: 'center',
          align: 'center',
          width: '120px',
          render: (h, { row, index }) => {
            return (
              <div class="table-bth">
                {
                  <el-dropdown trigger="click" size="mini"
                    on-command={(type) => this.handleBtn(type, row, index, 'tableData')}>
                    <el-button type="primary" size="mini">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      {
                        <el-dropdown-item command="deleteIt">删除</el-dropdown-item>
                      }
                    </el-dropdown-menu>
                  </el-dropdown>
                }
              </div>
            )
          }
        }
      ]),
      giftColumn: Object.freeze([
        {
          label: '序号',
          align: 'center',
          width: 50,
          render (h, { index }) {
            return <span>{index + 1}</span>
          }
        },
        {
          prop: 'giftGoodsName',
          label: '赠品名称',
          headerAlign: 'center',
          align: 'center',
          render: (h, { row }) => {
            return (
              <div class="cell-wrapper auth-height">
                <el-input
                  size="mini" clearable
                  v-model={row.giftGoodsName}
                  class="border-none"
                ></el-input>
              </div>
            )
          }
        },
        {
          prop: 'giftBrand',
          label: '品牌',
          headerAlign: 'center',
          align: 'center',
          render: (h, { row }) => {
            return (
              <div class="cell-wrapper auth-height">
                <el-input
                  size="mini" clearable
                  v-model={row.giftBrand}
                  class="border-none"
                ></el-input>
              </div>
            )
          }
        },
        {
          prop: 'giftCategory',
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
                <el-select v-model={row.giftCategory} clearable size="mini" placeholder="请选择">
                  {categoryList()}
                </el-select>
              </div>
            )
          }
        },
        {
          prop: 'giftSource',
          label: '来源',
          headerAlign: 'center',
          align: 'center',
          render: (h, { row }) => {
            return (
              <div class="cell-wrapper auth-height">
                <el-input
                  size="mini" clearable
                  v-model={row.source}
                  class="border-none"
                ></el-input>
              </div>
            )
          }
        },
        {
          prop: 'giftSinglePrice',
          label: '购入单品单价',
          headerAlign: 'center',
          align: 'center',
          render: (h, { row }) => {
            return (
              <div class="cell-wrapper auth-height">
                <final-input
                  size="mini" number v-floatNumber
                  v-model={row.giftSinglePrice}
                  on-input={() => this.calculationGiftRow(row)}
                  class="border-none"
                ></final-input>
              </div>
            )
          }
        },
        {
          prop: 'giftQuantity',
          label: '赠品数量',
          headerAlign: 'center',
          align: 'center',
          render: (h, { row }) => {
            return (
              <div class="cell-wrapper auth-height">
                <el-input
                  size="mini" clearable v-int-number
                  v-model={row.giftQuantity}
                  on-input={() => this.calculationGiftRow(row)}
                  class="border-none"
                ></el-input>
              </div>
            )
          }
        },
        {
          prop: 'giftSingleTotal',
          label: '购入单品总价',
          headerAlign: 'center',
          align: 'center'
          // render: (h, { row }) => {
          //   return (
          //     <div class="cell-wrapper auth-height">
          //       <el-input
          //         size="mini" clearable v-int-number
          //         v-model={row.giftSingleTotal}
          //         class="border-none"
          //       ></el-input>
          //     </div>
          //   )
          // }
        },
        {
          label: '操作',
          headerAlign: 'center',
          align: 'center',
          width: '120px',
          render: (h, { row, index }) => {
            return (
              <div class="table-bth">
                {
                  <el-dropdown trigger="click" size="mini"
                    on-command={(type) => this.handleBtn(type, row, index, 'giftTableData')}>
                    <el-button type="primary" size="mini">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      {
                        <el-dropdown-item command="deleteIt">删除</el-dropdown-item>
                      }
                    </el-dropdown-menu>
                  </el-dropdown>
                }
              </div>
            )
          }
        }
      ]),
      visible: false,
      // 品牌list
      brandList: [],
      // 品类list
      categoryList: [],
      form: {
        // brand: '',
        // brandName: '',
        purchaseTime: '',
        projectName: '',
        purchasePrice: '',
        giftPrice: '',
        hasGift: false,
        hasIntegral: false,
        totalIntegral: '',
        tableData: [],
        giftTableData: []
      }
    }
  },
  methods: {
    handleSave () {
      this.$emit('handleSave', this.form)
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    },
    // categoryChange (row, index) {
    //   const obj = this.categoryList.find(item => item.id === row.category)
    //   row.categoryName = obj.name
    // },
    changeBrand (val) {
      const obj = this.brandList.find(item => item.id === val)
      this.form.brandName = obj.name
    },
    resetData () {
      const { brand } = jsonBrand
      const { category } = jsonCategory
      this.brandList = brand
      this.categoryList = category
    },
    deleteIt (row, index, who) {
      this.form[who].splice(index, 1)
      who === 'tableData' && this.totalProjectAmount()
    },
    addDetail () {
      this.form.tableData.unshift({
        goodsName: '',
        brand: '',
        category: '',
        source: '',
        // 单价
        unitPrice: 0,
        // 购入折扣
        purchaseDiscount: '',
        // 数量
        quantity: '',
        // 购入单品总价
        purchaseSinglePrice: ''
      })
    },
    // 行内按钮操作
    handleBtn (name, row, index, who) {
      switch (name) {
        case 'deleteIt':
          this.deleteIt(row, index, who)
      }
    },
    addGiftDetail () {
      this.form.giftTableData.unshift({
        giftGoodsName: '',
        // 品牌
        giftBrand: '',
        // 品类
        giftCategory: '',
        // 来源
        giftSource: '',
        // 数量
        giftQuantity: '',
        giftSinglePrice: 0,
        giftSingleTotal: ''
      })
    },
    // 当前正装行计算
    calculationRow (row) {
      // 单价 * 数量
      const amout = accMul(row.unitPrice, row.quantity)
      // 购入折扣
      const mrzk = row.purchaseDiscount ? row.purchaseDiscount : 1
      row.purchaseSinglePrice = accMul(amout, mrzk)
      this.totalProjectAmount()
    },
    // 核算项目购入正装总金额
    totalProjectAmount () {
      const purchaseTotal = this.form.tableData.reduce(
        (prev, next) => accAdd(prev, next.purchaseSinglePrice),
        0
      )
      this.form.purchasePrice = this.setFormatNumber(purchaseTotal)
    },
    // 当前行赠品计算
    calculationGiftRow (row) {
      // 单价 * 数量
      const amout = accMul(row.giftSinglePrice, row.giftQuantity)
      row.giftSingleTotal = amout
      this.totalGiftAmount()
    },
    // 项目 赠品总合计
    totalGiftAmount () {
      const giftTotal = this.form.giftTableData.reduce(
        (prev, next) => accAdd(prev, next.giftSingleTotal),
        0
      )
      this.form.giftPrice = this.setFormatNumber(giftTotal)
    },
    openDialog (row) {
      if (row) {
        this.form = { ...row }
      } else {
        this.form = { ...resetForm }
      }
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
    .table_box {
      height: 380px;
      overflow: auto;
    }
    .table-title-style{
      text-align:left;
      margin-bottom:5px;
      position:relative;
    }
    .tableTitle{
      width: 200px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      position: absolute;
      line-height: 28px;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
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
