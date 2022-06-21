<template>
  <div class="components-content">
    <div class="btn">
      <el-input class="inputg_style" size="mini" v-model="req.name" placeholder="名称搜索"></el-input>
      <el-button class="mr" size="mini" type="primary" @click="getList" icon="el-icon-search"></el-button>
      <el-button type="primary" @click="addItem" size="mini">
        添加品牌<i class="el-icon-plus el-icon--right"></i>
      </el-button>
    </div>
    <final-table
      :columns="column"
      :data="res.dics"
      size="small"
      ref="refTable"
    ></final-table>
    <el-pagination @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="req.currentPageIndex"
      :page-sizes="[20, 30, 40, 50, 100]"
      :page-size="req.totalPageCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="res.totalCount">
    </el-pagination>
    <detail-dialog ref="detailDialog"></detail-dialog>
    <product ref="product"></product>
  </div>
</template>

<script>
import { deleteDic, getDic } from 'api/dictionaries-setting'
import detailDialog from './common/detail-dialog'
import product from './common/product'
import { BRAND } from 'enum'
export default {
  name: 'brandList',
  data () {
    return {
      req: {
        currentPageIndex: 1,
        totalPageCount: 20,
        typeId: BRAND,
        name: ''
      },
      res: {},
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
          label: '品牌名称',
          headerAlign: 'center',
          align: 'center'
        },
        {
          label: '操作',
          headerAlign: 'center',
          align: 'center',
          width: '260px',
          render (h, { row, index }) {
            return (
              <div>
                <el-button type="primary" size="mini"
                  on-click={() => this.editRow(row, index)}>修改</el-button>
                <el-button type="danger" size="mini"
                  on-click={() => this.deleteRow(row)}>删除</el-button>
                <el-button type="primary" size="mini"
                  on-click={() => this.productview(row, index)}>产品查看</el-button>
              </div>
            )
          }
        }
      ])
    }
  },
  components: {
    detailDialog,
    product
  },
  methods: {
    async getList () {
      const res = await getDic(this.req)
      this.confirm({
        type: 'success',
        message: res.data
      })
      this.req = res.data
    },
    // 每页条数该表
    handleSizeChange (val) {
      this.req.currentPageIndex = 1
      this.req.totalPageCount = val
      this.getList()
    },
    // 获取分页
    handleCurrentChange (val) {
      this.req.currentPageIndex = val
      this.getList()
    },
    // 删除
    async deleteRow (row) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteDic({ id: [row.id] })
        this.confirm({
          type: 'success',
          message: res.data
        })
        this.getList()
      }).catch(_ => {
        return false
      })
    },
    productview (row) {
      this.$refs.product.showDialog(row.id)
    },
    // 修改
    editRow (row) {
      this.$refs.detailDialog.showDialog([row], BRAND)
    },
    // 新增
    addItem () {
      this.$refs.detailDialog.showDialog([], BRAND)
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
  .inputg_style {
    width: 200px;
  }
}
</style>
