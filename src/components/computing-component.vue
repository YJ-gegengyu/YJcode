<!--
 * @Description: 组件信息描述 赠品管理
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-08-26 17:51:32
 * @,@LastEditors: ,: MR·ggy
 * @,@LastEditTime: ,: 2021-02-18 10:41:12
 -->
<template>
  <final-dialog :visible.sync="visible"
    title="计算组件"
    fixed
    top="0vh"
    width="90%">
    <div class="table-box">
    </div>
    <div class="bth-wrapper">
      <!-- <el-button type="primary" class="bth" @click="handleSave">保存</el-button> -->
      <el-button type="primary" class="bth" @click="handleCancel">关闭</el-button>
    </div>
  </final-dialog>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleCancel () {
      this.visible = false
    },
    openDialog () {
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
  }
</style>
