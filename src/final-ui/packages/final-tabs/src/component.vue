<!--
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-07-08 17:16:50
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-07-16 15:51:05
 -->
<template>
  <div class="final-ui-tabs_wrapper">
    <template v-if="bthIsShow">
      <span class="final-tabs_nav-prev"
        @click="handlePrev">
        <i class="el-icon-d-arrow-left"></i>
      </span>
      <span class="final-tabs_nav-next"
        @click="handleNext">
        <i class="el-icon-d-arrow-right"></i>
      </span>
    </template>
    <div class="final-scroll"
      ref="finalScroll">
      <div class="final-tabs_nav"
        ref="tabNav"
        :style="{transform:`translateX(-${offset}px)`}">
        <div :key="index"
          :class="tabActive(item)"
          class="tab-item"
          v-for="(item,index) in navList"
          @click="handleTabClick(index)">
          {{item.label}}
        </div>
      </div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'final-tabs',
  props: {
    value: [String, Number],
    //   切换之前
    beforeLeave: Function
  },
  data () {
    return {
      offset: 0,
      // 保存父组件的value到currentValue变量中，以便在本地维护
      currentValue: this.value,
      // 将pane的标题保存到数组中
      navList: [],
      bthIsShow: false
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue () {
      this.updateStatus()
    }
  },
  mounted () {
    this.$nextTick(() => {
      //  获取当前的可视宽度
      const { width } = this.$refs.finalScroll.getBoundingClientRect()
      //   获取滚动条总宽度
      const scrollWidth = this.$refs.tabNav.scrollWidth
      if (scrollWidth > width) {
        this.bthIsShow = true
      }
    })
  },
  methods: {
    handlePrev () {
      //  获取当前的可视宽度
      const { width } = this.$refs.finalScroll.getBoundingClientRect()
      //   //   获取滚动条总宽度
      //   const scrollWidth = this.$refs.tabNav.scrollWidth
      //   //   // 获取滚动条剩余宽度
      //   const scrollMax = scrollWidth - width
      if (this.offset > width) {
        // if (scrollMax - width > width) {
        //   this.offset = this.offset - width
        // }
        this.offset = this.offset - width
      } else {
        this.offset = 0
      }
    },
    handleNext () {
      //  获取当前的可视宽度
      const { width } = this.$refs.finalScroll.getBoundingClientRect()
      //   获取滚动条总宽度
      const scrollWidth = this.$refs.tabNav.scrollWidth
      // 获取滚动条剩余宽度
      const scrollMax = scrollWidth - width
      //   当当前移动的宽度
      if (this.offset === scrollWidth) return false
      //   总宽度 大于当前 的偏移量  等于还没滑到头
      if (scrollWidth > this.offset) {
        //   如果当前滚动条可滚动的位置 - 当前已经滚动的位置 超过一屏 那么直接滚动一屏
        if (scrollMax - this.offset > width) {
          this.offset = this.offset + width
        } else {
          // 没超过 滚动到剩余位置
          this.offset = this.offset + (scrollMax - this.offset)
        }
      }
    },
    tabActive (item) {
      // 为当前选中的tab加一个tabs-tab-active class
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.currentValue
        }
      ]
    },
    getTabs () {
      // 使用$children遍历子组件，得到所有的pane组件
      return this.$children.filter(function (item) {
        return item.$options.name === 'final-tab-pane'
      })
    },
    // 更新tabs
    updateNave () {
      this.navList = []
      this.getTabs().forEach((pane, index) => {
        this.navList.push({
          label: pane.label,
          name: pane.name || index
        })
        // 如果没有设置name，默认设置为索引值
        if (!pane.name) pane.name = index
        // 设置第一个pane为当前显示的tab
        if (index === 0) {
          if (!this.currentValue) {
            this.currentValue = pane.name || index
          }
        }
      })
      this.updateStatus()
    },
    updateStatus () {
      const tabs = this.getTabs()
      // 显示当前选中的tab对应的pane组件，隐藏没有选中的
      tabs.forEach(tab => {
        tab.show = tab.name === this.currentValue
      })
    },
    // 点击tab标题触发
    handleTabClick (index) {
      const nav = this.navList[index]
      const name = nav.name
      if (this.beforeLeave) {
        if (this.beforeLeave(name, this.currentValue)) {
          this.currentValue = name
          // 实现子组件与父组件通信
          this.$emit('tab-click', name)
        }
      } else {
        this.currentValue = name
        // 实现子组件与父组件通信
        this.$emit('tab-click', name)
      }
      this.$emit('input', this.currentValue)
    }
  }
}
</script>

<style lang='scss' scoped>
.final-ui-tabs_wrapper {
  width: 100%;
  padding: 0 20px;
  position: relative;
  box-sizing: border-box;
  .final-scroll {
    overflow: hidden;
  }
  .final-tabs_nav {
    white-space: nowrap;
    transition: transform 0.3s;
  }
  .tab-item {
    padding: 0 10px;
    text-align: center;
    line-height: 35px;
    display: inline-block;
    &.tabs-tab-active{
        background: red;
        color: #fff;
    }
  }
  .final-tabs_nav-prev,
  .final-tabs_nav-next {
    position: absolute;
    cursor: pointer;
    line-height: 35px;
    font-size: 12px;
    color: #909399;
  }
  .final-tabs_nav-next {
    right: -5px;
  }
  .final-tabs_nav-prev {
    left: -5px;
  }
}
</style>
