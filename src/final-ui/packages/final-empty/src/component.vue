<!--
 * @,@Description: ,: 组件信息描述
 * @,@version: ,: 3.0.0
 * @,@Author: ,: MR·小涛
 * @,@Date: ,: 2020-12-24 16:24:20
 * @,@LastEditors: ,: MR·小涛
 * @,@LastEditTime: ,: 2020-12-29 11:41:02
 -->
<template>
  <section class="empty-wrapper">
    <div>
      <!-- <img src="@/assets/img/empty1.jpg"
        width="126"
        alt=""> -->
        <!-- <img src="@/assets/img/empty.png"
        width="368"
        alt=""> -->
        无
    </div>
    <slot>
      <span class="empty-desc">
        {{emptyText}}
      </span>
    </slot>
  </section>
</template>

<script>
export default {
  name: 'final-empty',
  props: {
    emptyText: {
      default: '暂无数据',
      type: String
    }
  },
  data () {
    return {}
  },
  components: {}
}
</script>

<style lang='scss' scoped>
.empty-wrapper {
  width: 100%;
  text-align: center;
  margin-top: 30px;
  .empty-desc {
    color: #ccc;
  }
}
</style>
