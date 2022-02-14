<!--
 * @Description: 组件信息描述
 * @version: 2.1.0
 * @Author: MR·ggy
 * @Date: 2020-06-30 11:50:14
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-06-30 15:11:58
 -->
<template>
  <div class="g-submenu">
    <el-submenu :index="data.id" class="submenu">
      <template slot="title">{{data.menuName}}</template>
      <template v-for="child in data.children">
        <sub-menu :key="child.id"
          :data="child"
          v-if="child.children"></sub-menu>
        <el-menu-item v-else :index="child.menuContent"
          :key="child.id">{{child.menuName}}</el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>
<script>
export default {
  name: 'sub-menu',
  props: {
    data: {
      default: () => {},
      type: Object
    }
  },
  components: {}
}
</script>

<style lang='scss' scoped>
.g-submenu{
  float: left;
  .submenu{
      ::v-deep{
          .el-submenu__title{
            height: 60px;
            line-height: 60px;
            margin: 0;
            border-bottom: 2px solid transparent;
          }
          i{
              color: #fff;
              right: 2px;
          }
      }
  }
}
</style>
