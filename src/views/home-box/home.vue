<template>
  <div class="home">
    <template>
      <ve-line :data="chartData" :after-set-option="afterSetOptionOnce" :extend="traderExtend" :seetings="chartSettings" :colors="colors"></ve-line>
    </template>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      chartData: {
        columns: ['日期', '圣罗兰', '修丽可'],
        rows: [
          { 日期: '2019-01', 圣罗兰: '40', 修丽可: '50' },
          { 日期: '2019-06', 圣罗兰: '50', 修丽可: '60' },
          { 日期: '2019-09', 圣罗兰: '70', 修丽可: '80' }
        ]
      },
      chartSettings: {
      },
      traderExtend: {},
      colors: ['#0E9CFF', '#FFA70D']
    }
  },
  created () {
    this.initChartData()
    console.log(process.env.VUE_APP_server_url, window.serverConfig.server_url)
  },
  methods: {
    afterSetOptionOnce (echartInstance, data) {
      if (this.chartData.rows.length) {
        if (!this.loop) {
          // 设置自动轮播
          window.tools.loopShowTooltip(echartInstance, data, {
            interval: 3000,
            loopSeries: false
          })
          this.loop = true
        }
      }
    },
    initChartData () {
      this.tradeChartSettings = {
        yAxisType: ['KMB', 'KMB'], // 数据类型
        yAxisName: ['日均运量', '同比变化'] // y轴坐标轴的名称，在下面可以更改样式
      }
      this.initTraderExtend()
    },
    initTraderExtend () {
      this.traderExtend = {
        yAxis (item) {
          /* 右轴 */
          // 坐标轴名称的文字样式
          item[1].nameTextStyle = {
            padding: [0, 50, 0, 0]
          }
          item[1].splitNumber = 5
          return item
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
