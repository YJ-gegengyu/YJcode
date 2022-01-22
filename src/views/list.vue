<template>
  <div class="content">
    <div class="btn">
      <el-select class="btn-right" size="mini" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="addItem" size="mini">
        增加条目<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
    </div>
    <final-table
      :columns="column"
      row-key="fileID"
      :data="tableData"
      class="table-wrapper"
      ref="refTable"
    ></final-table>
    <detail ref="detaile"></detail>
  </div>
</template>

<script>
import detail from '@/components/detail.vue'
export default {
  name: 'list',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      tableData: [],
      column: Object.freeze([
        {
          type: 'selection'
        },
        {
          prop: 'name',
          label: '选中附件名称',
          headerAlign: 'center',
          align: 'center'
        }
      ])
    }
  },
  components: {
    detail
  },
  created () {
    console.log(1)
  },
  methods: {
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
