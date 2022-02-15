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
      <div class="cards" v-for="(item, key) in cardList" :key="key">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>计算条目</span>
            <div style="float: right; padding: 3px 0">
              <el-button type="text">添加数字项</el-button>
              <el-dropdown @command="handleCommand">
                <el-button type="primary" size="mini">
                  添加操作符<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="mini" slot="dropdown">
                  <el-dropdown-item command="accAdd">+</el-dropdown-item>
                  <el-dropdown-item command="accSub">-</el-dropdown-item>
                  <el-dropdown-item command="accMul">*</el-dropdown-item>
                  <el-dropdown-item command="accDiv">/</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="bth-wrapper">
      <!-- <el-button type="primary" class="bth" @click="handleSave">保存</el-button> -->
      <el-button type="primary" class="bth" @click="handleCancel">关闭</el-button>
    </div>
  </final-dialog>
</template>

<script>
// import { accAdd, accSub, accMul, accDiv } from 'utils'
export default {
  data () {
    return {
      cardList: []
    }
  },
  methods: {
    handleCommand (val) {
      console.log(val)
    },
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
