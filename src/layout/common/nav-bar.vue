<template>
  <div class="nav-bar">
    <el-menu :mode="mode"
        background-color="#008ae3"
        text-color="#fff"
        active-text-color="#fff"
        router
        unique-opened
        style="overflow:hidden;height:100%">
        <template v-for="(menu,index) in data">
        <el-menu-item :index="menu.menuContent"
            :key="menu.id"
            v-if="!menu.children">
            {{menu.menuName}}
        </el-menu-item>
        <sub-menu :key="index"
            v-else
            :data="menu"></sub-menu>
        </template>
    </el-menu>
  </div>
</template>

<script>
import subMenu from './subMenu'
export default {
  name: 'navbar',
  data () {
    return {
      mode: 'horizontal',
      data: [
        {
          id: 1,
          menuContent: '/goods-list/index',
          menuName: '进货管理',
          children: [
            {
              id: 5,
              menuContent: '/goods-list/index',
              menuName: '正装管理'
            },
            {
              id: 6,
              menuContent: '/gift-list/index',
              menuName: '赠品管理'
            }
          ]
        },
        {
          id: 2,
          menuContent: '/goods-list/index',
          menuName: '积分管理'
        },
        {
          id: 3,
          menuContent: '/goods-list/index',
          menuName: '赠品管理'
        },
        {
          id: 4,
          menuContent: '',
          menuName: '统计分析',
          children: [
            {
              id: 5,
              menuContent: '/goods-list/index',
              menuName: '单品价格分析'
            },
            {
              id: 6,
              menuContent: '/goods-list/index',
              menuName: '收入分析'
            }
          ]
        }
      ]
    }
  },
  methods: {
  },
  components: {
    subMenu
  }
}
</script>

<style lang="scss" scoped>
</style>
