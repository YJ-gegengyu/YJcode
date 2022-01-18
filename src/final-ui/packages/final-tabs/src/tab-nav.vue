<!--
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-08 17:16:50
 * @,@LastEditors: ,: MR·小涛
 * @,@LastEditTime: ,: 2020-11-12 14:51:47
 -->
<template>
  <div class="final-ui-tabs_wrapper">
    <template>
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
        <div class="tab-item"
          :class="activeClass(item,index)"
          v-for="(item,index) in data"
          :key="index"
          @click="handleTabClick(item,index)">{{item[dataProps.label]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'final-tab-nav',
  props: {
    dataProps: {
      default: () => ({
        label: 'label',
        prop: 'name'
      })
    },
    value: [String, Number],
    // 导航组件
    data: {
      default: () => [],
      type: Array
    },
    //   切换之前
    beforeLeave: Function
  },
  watch: {
    value (val) {
      this.currentIndex = val
    }
  },
  data () {
    return {
      // 保存父组件的value到currentValue变量中
      currentIndex: this.value || 0,
      offset: 0
    }
  },
  methods: {
    activeClass (item, index) {
      return [{ active: this.currentIndex === item[this.dataProps.prop] || this.currentIndex === index }]
    },
    handlePrev () {
      if (this.offset === 0) return false
      //  获取当前的可视宽度
      const { width } = this.$refs.finalScroll.getBoundingClientRect()
      //   //   获取滚动条总宽度
      // const scrollWidth = this.$refs.tabNav.scrollWidth
      //   // 获取滚动条剩余宽度
      // const scrollMax = scrollWidth - width
      if (this.offset > width) {
        // if (scrollMax - width > width) {
        //   this.offset = this.offset - width
        // } else {
        //   this.offset = this.offset - width
        //   console.log(222)
        // }
        this.offset = this.offset - width
      } else {
        this.offset = 0
      }
    },
    handleNext () {
      //   获取滚动条总宽度
      const scrollWidth = this.$refs.tabNav.scrollWidth
      //   当当前移动的宽度
      if (this.offset === scrollWidth) return false
      //  获取当前的可视宽度
      const { width } = this.$refs.finalScroll.getBoundingClientRect()
      // 获取滚动条剩余宽度
      const scrollMax = scrollWidth - width
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
    handleTabClick (item, index) {
      if (this.beforeLeave) {
        // 找到上次的
        const result = this.data.find(item => item[this.dataProps.prop] === this.currentIndex)
        // 如果上次的找不到那么吧下标传过去
        if (this.beforeLeave(result || index, this.currentIndex)) {
          this.currentIndex = item[this.dataProps.prop] || index
          this.$emit('tab-click', item, this.currentIndex)
        }
      } else {
        this.currentIndex = item[this.dataProps.prop] || index
        this.$emit('tab-click', item, this.currentIndex)
      }
      this.$emit('input', this.currentIndex)
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
  margin-bottom: 5px;
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
    cursor: pointer;
    &.active{
      background: $--button-border-color;
      color: #fff;
    }
  }
  .final-tabs_nav-prev,
  .final-tabs_nav-next {
    position: absolute;
    cursor: pointer;
    line-height: 35px;
    font-size: 22px;
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
