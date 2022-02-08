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
        <div class="title-info">
          <span>商品基本信息</span>
          <div class="typeOfGoods">
            <el-select clearable size="mini" @change="goodsChange" v-model="form.goodsType" placeholder="货品类型">
              <el-option
                v-for="item in goodsTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="table-tab">
          <el-form-item class="row-wrapper border-top">
            <el-col :span="2" class="left-title">
                品牌
            </el-col>
            <el-col :span="6" class="row-right">
                <el-select class="btn-right" @change="changeBrand" clearable size="mini" v-model="form.brand" placeholder="请选择">
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
              <el-select class="btn-right" @change="categoryChange" clearable size="mini" v-model="form.category" placeholder="请选择">
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
          <el-form-item class="row-wrapper">
            <el-col :span="2" class="left-title">
                来源
            </el-col>
            <el-col :span="6" class="row-right">
                <el-input v-model="form.source" clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" class="left-title">
                价格
            </el-col>
            <el-col :span="6" class="row-right">
              <el-input v-model="form.price" @input="priceChange" v-floatNumber clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" class="left-title" v-if="form.goodsType === 1 || form.goodsType === '1'">
                状态
            </el-col>
            <el-col :span="6" class="row-right" v-if="form.goodsType === 1 || form.goodsType === '1'">
              <el-select class="btn-right" @change="stateChange" clearable size="mini" v-model="form.state" placeholder="请选择">
                  <el-option
                    v-for="item in stateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <p class="title-info">进货</p>
          <el-form-item class="row-wrapper border-top">
            <!-- <el-col :span="2" class="left-title">
                进货标价
            </el-col>
            <el-col :span="6" class="row-right">
                <el-input v-model="form.purchasePrice" @input="purchaseInput" v-floatNumber clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col> -->
            <el-col :span="2" class="left-title">
                进货数量
            </el-col>
            <el-col :span="6" class="row-right">
               <el-input v-model="form.purchaseQuantity" @input="purchaseInput" v-int-number clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" class="left-title" v-if="form.goodsType === 1 || form.goodsType === '1'">
                进货折扣
            </el-col>
            <el-col :span="6" class="row-right" v-if="form.goodsType === 1 || form.goodsType === '1'">
                <el-input v-model="form.purchaseDiscount" @input="purchaseInput" v-int-number maxlength="2" clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item class="row-wrapper" v-if="form.goodsType === 1 || form.goodsType === '1'">
            <el-col :span="2" class="left-title">
                标准进货总额
            </el-col>
            <el-col :span="6" class="row-right">
                {{form.totalStandardPurchase}}
            </el-col>
            <el-col :span="2" class="left-title">
                实际进货总额
            </el-col>
            <el-col :span="6" class="row-right">
                <el-input v-model="form.totalActualPurchase" @input="calculatePurchase" v-floatNumber clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" title="正数为挣，负数为赔" class="left-title">
                差额
            </el-col>
            <el-col :span="6" class="row-right">
                {{form.purchaseDifference}}
            </el-col>
          </el-form-item>
          <p class="title-info">出货</p>
          <el-form-item class="row-wrapper border-top">
            <!-- <el-col :span="2" class="left-title">
                出货标价
            </el-col>
            <el-col :span="6" class="row-right">
                <el-input v-model="form.shipmentPrice" @input="shipmentInput" v-floatNumber clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col> -->
            <el-col :span="2" class="left-title">
                出货数量
            </el-col>
            <el-col :span="6" class="row-right">
               <el-input v-model="form.shipmentQuantity" @input="shipmentInput" v-int-number clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" class="left-title" v-if="form.goodsType === 1 || form.goodsType === '1'">
                出货折扣
            </el-col>
            <el-col :span="6" class="row-right" v-if="form.goodsType === 1 || form.goodsType === '1'">
                <el-input v-model="form.shipmentDiscount" @input="shipmentInput" v-int-number maxlength="2" clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item class="row-wrapper" v-if="form.goodsType === 1 || form.goodsType === '1'">
            <el-col :span="2" class="left-title">
                标准出货总额
            </el-col>
            <el-col :span="6" class="row-right">
                {{form.totalStandardShipment}}
            </el-col>
            <el-col :span="2" class="left-title">
                实际出货总额
            </el-col>
            <el-col :span="6" class="row-right">
                <el-input v-model="form.totalActualShipment" @input="calculateShipment" v-floatNumber clearable size="mini" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" title="正数为挣，负数为赔" class="left-title">
                差额
            </el-col>
            <el-col :span="6" class="row-right">
                {{form.shipmentDifference}}
            </el-col>
          </el-form-item>
          <p class="title-info">结算</p>
          <el-form-item class="row-wrapper border-top">
            <el-col :span="2" class="left-title">
                剩余数量
            </el-col>
            <el-col :span="6" class="row-right">
                <!-- <el-input v-model="form.remainingQuantity" v-int-number clearable size="mini" placeholder="请输入内容"></el-input> -->
                {{form.remainingQuantity}}
            </el-col>
            <el-col :span="2" class="left-title">
                商品净利润
            </el-col>
            <el-col :span="6" class="row-right">
               {{form.netProfit}}
            </el-col>
          </el-form-item>
          <p class="title-info" v-if="form.goodsType === 1 || form.goodsType === '1'">阶段</p>
          <el-steps :active="form.state" align-center v-if="form.goodsType === 1 || form.goodsType === '1'">
            <el-step title="已交款" description="等待发货"></el-step>
            <el-step title="发货中" description="等待收货"></el-step>
            <el-step title="已收货" description="等待结款"></el-step>
            <el-step title="已结款" description="交易结束"></el-step>
          </el-steps>
        </div>
        <!-- <div style="text-align:left;margin-bottom: 5px">
          <el-button type="primary" size="mini" @click="addDetail">增加明细</el-button>
        </div>
        <final-table
          :columns="column"
          :data="tableData"
          border
          :row-height="40"
          class="table-wrapper"
          ref="refTable"
        ></final-table> -->
      </el-form>
    </div>
    <div class="bth-wrapper">
      <el-button type="primary" class="bth" @click="handleSave">保存</el-button>
      <el-button type="primary" class="bth" @click="handleCancel">关闭</el-button>
    </div>
  </final-dialog>
</template>

<script>
import jsonBrand from 'json/brand.json'
import jsonCategory from 'json/category.json'
import jsonState from 'json/state.json'
import { accMul, accDiv, accSub } from 'utils'
const resetForm = {
  goodsType: 1,
  goodsName: '正装',
  brand: '',
  brandName: '',
  category: '',
  categoryName: '',
  name: '',
  stateName: '已交款',
  price: '',
  source: '',
  state: 1,
  purchaseQuantity: '',
  purchaseDiscount: '',
  totalStandardPurchase: 0,
  totalActualPurchase: '',
  purchaseDifference: '',
  shipmentQuantity: '',
  shipmentDiscount: '',
  totalStandardShipment: 0,
  totalActualShipment: '',
  shipmentDifference: '',
  remainingQuantity: 0,
  netProfit: 0
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
      // 阶段
      stateList: [],
      // 货品类型
      goodsTypeList: [
        {
          id: 1,
          name: '正装'
        },
        {
          id: 2,
          name: '赠品'
        },
        {
          id: 3,
          name: '积分'
        }
      ],
      form: {
        goodsType: 1,
        goodsName: '正装',
        brand: '',
        brandName: '',
        category: '',
        categoryName: '',
        name: '',
        stateName: '已交款',
        price: '',
        source: '',
        state: 1,
        purchaseQuantity: '',
        purchaseDiscount: '',
        totalStandardPurchase: 0,
        totalActualPurchase: '',
        purchaseDifference: '',
        shipmentQuantity: '',
        shipmentDiscount: '',
        totalStandardShipment: 0,
        totalActualShipment: '',
        shipmentDifference: '',
        remainingQuantity: 0,
        netProfit: 0
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
    priceChange () {
      this.purchaseInput()
      this.shipmentInput()
    },
    categoryChange (val) {
      const obj = this.categoryList.find(item => item.id === val)
      this.form.categoryName = obj.name
    },
    goodsChange (val) {
      const obj = this.goodsTypeList.find(item => item.id === val)
      this.form.goodsName = obj.name
    },
    changeBrand (val) {
      const obj = this.brandList.find(item => item.id === val)
      this.form.brandName = obj.name
    },
    stateChange (val) {
      const obj = this.stateList.find(item => item.id === val)
      this.form.stateName = obj.name
    },
    // 标准进货价格计算
    purchaseInput () {
      const aAmout = accMul(this.form.price, this.form.purchaseQuantity)
      const zk = this.form.purchaseDiscount.length === 2 ? accDiv(this.form.purchaseDiscount, 100) : accDiv(this.form.purchaseDiscount, 10)
      this.form.totalStandardPurchase = accMul(aAmout, zk)
      this.form.totalActualPurchase = accMul(aAmout, zk)
      this.calculatePurchase()
      if (!this.form.shipmentQuantity) {
        this.form.remainingQuantity = this.form.purchaseQuantity
      } else {
        this.form.remainingQuantity = accSub(this.form.purchaseQuantity, this.form.shipmentQuantity)
      }
    },
    // 进货差额计算
    calculatePurchase () {
      this.form.purchaseDifference = accSub(this.form.totalActualPurchase, this.form.totalStandardPurchase)
      this.form.netProfit = accSub(this.form.totalActualShipment, this.form.totalActualPurchase)
    },
    // 标准出货价格计算
    shipmentInput () {
      if (Number(this.form.shipmentQuantity) > Number(this.form.purchaseQuantity)) {
        alert('出货数量不可能高于进货数量')
        this.form.shipmentQuantity = ''
        this.form.remainingQuantity = this.form.purchaseQuantity ? this.form.purchaseQuantity : 0
        return false
      }
      if (this.form.goodsType === 1 || this.form.goodsType === '1') {
        const aAmout = accMul(this.form.price, this.form.shipmentQuantity)
        const ck = this.form.shipmentDiscount.length === 2 ? accDiv(this.form.shipmentDiscount, 100) : accDiv(this.form.shipmentDiscount, 10)
        this.form.totalStandardShipment = accMul(aAmout, ck)
        this.form.totalActualShipment = accMul(aAmout, ck)
        this.calculateShipment()
      } else {
        this.form.netProfit = accMul(this.form.price, this.form.shipmentQuantity)
      }
      this.form.remainingQuantity = accSub(this.form.purchaseQuantity, this.form.shipmentQuantity)
    },
    // 出货差额计算
    calculateShipment () {
      this.form.shipmentDifference = accSub(this.form.totalActualShipment, this.form.totalStandardShipment)
      this.form.netProfit = accSub(this.form.totalActualShipment, this.form.totalActualPurchase)
    },
    resetData () {
      const { brand } = jsonBrand
      const { category } = jsonCategory
      const { state } = jsonState
      this.brandList = brand
      this.categoryList = category
      this.stateList = state
    },
    deleteIt (row, index) {
      this.tableData.splice(index, 1)
    },
    // addDetail () {
    //   this.tableData.push(resetForm)
    // },
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
    height: 700px;
    overflow: hidden;
    overflow-y: auto;
    border: 1px solid $--base-border-color;
    border-right: 0;
    border-left: 0;
    .title-info{
      margin: 10px 0;
      font-size: 16px;
    }
    .typeOfGoods{
      display: inline-block;
      margin-left: 20px;
      width: 200px;
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
