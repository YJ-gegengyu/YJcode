<!--
 * @,@Description: ,: 组件信息描述
 * @,@version: ,: 3.0.0
 * @,@Author: ,: MR·ggy
 * @,@Date: ,: 2020-12-08 15:41:54
 * @,@LastEditors: ,: MR·ggy
 * @,@LastEditTime: ,: 2020-12-25 16:11:57
 -->
<template>
  <section ref="treeSelectwrapper">
    <div class="input-wrapper">
      <el-input :placeholder="defaultPlaceholder"
        :readonly="!filterable"
        v-model="valueTitle"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        class="input"></el-input>
      <i class="el-icon-arrow-down"
        :class="popoverVisible? 'is-reverse' : '' "></i>
    </div>
    <el-popover trigger="click"
      :append-to-body="false"
      v-model="popoverVisible">
      <el-scrollbar class="scroll-wrapper"
        wrapClass="content-wrap"
        style="height:200px;">
        <el-tree :data="data"
          ref="selectTree"
          :props="defaultProps"
          highlight-current
          :node-key="nodeKey"
          :default-expanded-keys="defaultExpandedKey"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick">
        </el-tree>
      </el-scrollbar>
    </el-popover>
  </section>
</template>

<script>
export default {
  name: 'final-tree-select',
  props: {
    placeholder: {
      default: '请选择',
      type: String
    },
    // 是否开启搜索
    filterable: {
      default: false,
      type: Boolean
    },
    // tree节点key
    nodeKey: {
      default: 'id',
      type: String
    },
    // 配置项
    props: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Array,
      default: () => []
    },
    // 初始值
    value: {
      type: [Number, String],
      default: null
    }
  },
  data () {
    return {
      defaultExpandedKey: [],
      popoverVisible: false,
      valueTitle: '',
      defaultValue: null,
      defaultPlaceholder: null,
      defaultProps: {
        label: 'title',
        children: 'children'
      }
    }
  },
  created () {
    this.defaultPlaceholder = this.placeholder
    this.defaultProps = { ...this.defaultProps, ...this.props }
  },
  mounted () {
    this.defaultValue = this.value
    this.initData()
  },
  methods: {
    // 开始搜索
    handleInput (val) {
      this.filterable && this.$refs.selectTree.filter(val)
    },
    handleBlur (e) {
      if (this.filterable && this.valueTitle) {
        this.valueTitle = this.defaultPlaceholder
      }
    },
    handleFocus () {
      if (this.filterable && this.valueTitle) {
        this.defaultPlaceholder = this.valueTitle
        this.valueTitle = ''
        this.$refs.selectTree.filter('')
      }
      this.popoverVisible = true
    },
    // 切换选项
    handleNodeClick (node) {
      this.valueTitle = node[this.defaultProps.label]
      this.defaultPlaceholder = node[this.defaultProps.label]
      this.defaultValue = node[this.nodeKey]
      this.$emit('change', this.defaultValue)
      this.$emit('input', this.defaultValue)
      this.defaultExpandedKey = []
      this.popoverVisible = false
    },
    initData () {
      // 默认是否有值
      if (this.defaultValue) {
        this.valueTitle = this.$refs.selectTree.getNode(this.defaultValue) && this.$refs.selectTree.getNode(this.defaultValue).data[
          this.defaultProps.label
        ]
        this.$refs.selectTree.setCurrentKey(this.defaultValue)
        this.defaultExpandedKey = [this.defaultValue]
      } else {
        this.valueTitle = ''
        this.defaultPlaceholder = this.placeholder
      }
      // 判断点击的是否包含
      document.addEventListener('click', (e) => {
        if (this.$refs.treeSelectwrapper && !this.$refs.treeSelectwrapper.contains(e.target)) {
          this.popoverVisible = false
        }
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    }
  },
  beforeDestroy () {
    console.log(111)
  },
  watch: {
    value (val) {
      this.defaultValue = this.value
      this.initData()
    }
  }
}
</script>

<style lang='scss' scoped>
.input-wrapper {
  position: relative;
  i {
    position: absolute;
    height: 100%;
    right: 5px;
    top: 0;
    text-align: center;
    color: #c0c4cc;
    transition: all 0.3s;
    pointer-events: none;
    width: 25px;
    line-height: 32px;
    &.is-reverse {
      transform: rotate(180deg);
    }
  }
}
::v-deep {
  .input {
    input {
      padding-right: 30px;
    }
  }
  .el-tree {
    .is-current {
      &.el-tree-node {
        .el-tree-node__content {
          background: #fff;
          height: auto;
          padding: 0 20px;
        }
        .el-tree-node__label {
          font-weight: normal;
        }
      }
      .el-tree-node__content {
        .el-tree-node__label {
          color: #409eff;
          font-weight: 700;
        }
      }
      .el-tree-node__children {
        .el-tree-node__label {
          color: #606266;
          font-weight: normal;
        }
      }
    }
  }
  .content-wrap {
    overflow-x: hidden;
  }
  .el-popover {
    width: 100%;
    margin-top: 1px;
  }
}
</style>
