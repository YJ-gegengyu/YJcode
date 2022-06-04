<template>
  <div class="content">
    <el-tabs v-model="componentName" type="card">
      <el-tab-pane label="品牌" name="brandList"></el-tab-pane>
      <el-tab-pane label="来源" name="sourceList"></el-tab-pane>
      <el-tab-pane label="品类" name="categoryList"></el-tab-pane>
    </el-tabs>
    <component :is="componentName"></component>
  </div>
</template>

<script>
import brandList from './components/brand-list.vue'
import sourceList from './components/source-list.vue'
import categoryList from './components/category-list.vue'
export default {
  name: 'dictionariesList',
  data () {
    return {
      componentName: 'brandList'
    }
  },
  components: {
    brandList,
    sourceList,
    categoryList
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.content {
  height: calc(100% - 60px);
  padding: 10px;
  // padding-top: 10px;
  .search-head-data {
    width: 240px;
  }
  .search-head-input {
    width: 150px;
  }
  .btn {
    text-align: right;
    margin: 15px 0;
    .btn-right{
      margin-right: 10px;
    }
  }
}
</style>
<style lang="scss">
.content {
  .mr {
    margin-right: 10px;
  }
}
</style>
