n<!--
 * @Description: 摘要选择
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-11 21:56:40
  * @,@LastEditors: ,: MR·小涛
 * @,@LastEditTime: ,: 2020-10-20 17:47:20
 -->
<template>
  <el-drawer
    title="产品信息"
    size="400px"
    :show-close="false"
    :visible.sync="visible"
    class="product-detail"
    destroy-on-close
    :close-on-press-escape="false"
    :wrapperClosable="false">
    <div class="btn">
      <el-button type="primary" class="btn-right" @click="addItem" size="mini">
        添加产品<i class="el-icon-plus el-icon--right"></i>
      </el-button>
    </div>
    <div class="dialog_content">
      <final-table
        :columns="column"
        :data="products"
        size="small"
        ref="refTable"
      ></final-table>
    </div>
    <div class="footer-bth">
      <el-button type="primary" size="small"
        @click="handleCancel">关闭</el-button>
    </div>
    <product-detail ref="productDetail"></product-detail>
  </el-drawer>
</template>
<script>
import { deleteProduct, getProduct } from 'api/dictionaries-setting'
import productDetail from './product-detail'
export default {
  data () {
    return {
      visible: false,
      products: [],
      productId: null,
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
          prop: 'productName',
          label: '产品名称',
          headerAlign: 'center',
          align: 'center'
        },
        {
          label: '操作',
          headerAlign: 'center',
          align: 'center',
          width: '140px',
          render: (h, { row, index }) => {
            return (
              <div>
                <el-button type="primary" size="mini"
                  on-click={() => this.editRow(row, index)}>修改</el-button>
                <el-button type="danger" size="mini"
                  on-click={() => this.deleteRow(row, index)}>删除</el-button>
              </div>
            )
          }
        }
      ])
    }
  },
  components: {
    productDetail
  },
  methods: {
    // 取消
    handleCancel () {
      this.visible = false
      this.$parent.getList()
    },
    async getList () {
      const res = await getProduct(this.productId)
      this.confirm({
        type: 'success',
        message: res.data
      })
      this.products = res.data.products
    },
    async deleteRow (row) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteProduct({ id: [row.id] })
        this.confirm({
          type: 'success',
          message: res.data
        })
        this.getList()
      }).catch(_ => {
        return false
      })
    },
    // 修改
    editRow (row) {
      this.$refs.productDetail.showDialog([row])
    },
    // 新增
    addItem () {
      this.$refs.productDetail.showDialog()
    },
    async showDialog (id) {
      this.visible = true
      this.productId = id
      this.getList()
    }
  }
}
</script>

<style lang='scss' scoped>
.product-detail {
  .footer-bth {
    position: absolute;
    bottom: 20px;
    right: 10px;
    text-align: right;
  }
  .btn {
    text-align: right;
    margin-bottom: 10px;
    .btn-right{
      margin-right: 10px;
    }
  }
  .dialog_content{
    height: 100%;
  }
}
</style>
<style lang='scss'>
.product-detail {
  .el-drawer__body{
    height: 100%;
  }
  .addAdministration-item-dialog-content{
    height: 100%;
    .select-type {
      width: calc(90%);
    }
  }
}
</style>
