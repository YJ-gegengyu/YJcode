<!--
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-09-07 15:40:45
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-09-07 16:30:47
 -->
<template>
  <div class="el-progress"
    :class="[
      'el-progress--' + type,
      status ? 'is-' + status : '',
      {
        'el-progress--without-text': !showText,
        'el-progress--text-inside': textInside,
      }
    ]">
    <div class="el-progress-bar"
      v-if="type === 'line'">
      <div class="el-progress-bar__outer"
        :style="{height: strokeWidth + 'px'}">
        <div class="el-progress-bar__inner"
          :style="barStyle">
          <div class="el-progress-bar__innerText"
            v-if="showText && textInside">{{content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'final-progress',
  props: {
    // 显示类型
    type: {
      type: String,
      default: 'line',
      validator: (val) => ['line', 'circle', 'dashboard'].indexOf(val) > -1
    },
    // 百分比
    percentage: {
      type: Number,
      default: 0,
      required: true
    },
    // 颜色
    color: {
      type: [String, Array, Function],
      default: ''
    },
    // 文字是否显示到内部
    textInside: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 126
    },
    // 进度条状态
    status: {
      type: String,
      validator: (val) => ['success', 'exception', 'warning'].indexOf(val) > -1
    },
    // 是否显示进度条文字内容
    showText: {
      type: Boolean,
      default: true
    },
    strokeWidth: {
      type: Number,
      default: 6
    }
  },
  data () {
    return {}
  },
  computed: {
    barStyle () {
      const style = {}
      style.width = (this.percentage > 100 ? 100 : this.percentage) + '%'
      style.backgroundColor = this.getCurrentColor(this.percentage)
      return style
    },
    content () {
      if (typeof this.format === 'function') {
        return this.format(this.percentage) || ''
      } else {
        return `${this.percentage}%`
      }
    }
  },
  methods: {
    getCurrentColor (percentage) {
      if (typeof this.color === 'function') {
        return this.color(percentage)
      } else if (typeof this.color === 'string') {
        return this.color
      } else {
        return this.getLevelColor(percentage)
      }
    },
    getLevelColor (percentage) {
      const colorArray = this.getColorArray().sort((a, b) => a.percentage - b.percentage)
      for (let i = 0; i < colorArray.length; i++) {
        if (colorArray[i].percentage > percentage) {
          return colorArray[i].color
        }
      }
      return colorArray[colorArray.length - 1].color
    },
    getColorArray () {
      const color = this.color
      const span = 100 / color.length
      return color.map((seriesColor, index) => {
        if (typeof seriesColor === 'string') {
          return {
            color: seriesColor,
            progress: (index + 1) * span
          }
        }
        return seriesColor
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
