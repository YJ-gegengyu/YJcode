<template>
  <div class="layout">
    <div class="nav-style">
      <navBar></navBar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import navBar from './common/nav-bar'
export default {
  name: 'layout',
  data () {
    return {
    }
  },
  components: {
    navBar
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.layout {
  height: 100%;
  .nav-style{
    height: 60px;
    line-height: 60px;
    width: 100%;
  }
}
</style>
