<template>
  <final-dialog :visible.sync="visible"
    :title="titleName"
    fixed
    top="5vh"
    class="dictionaries-detail"
    width="60%">
    <div class="btn-box">
      <el-button type="primary" class="btn-style" @click="addItem" size="mini">
        添加品牌<i class="el-icon-plus el-icon--right"></i>
      </el-button>
      <el-button type="primary" class="btn-style" @click="saveList" size="mini">
        保存
      </el-button>
    </div>
    <div class="content-con">
      <el-card class="card-style" v-for="(item, index) in nameList" :key="index">
        <span>名称：</span>
        <el-input class="input-name" v-model="item.name" clearable size="mini" placeholder="请输入名称"></el-input>
        <el-button v-if="index !== 0" @click="deleteDetail(index)" type="danger" class="card-icon-style" size="mini" icon="el-icon-delete"></el-button>
      </el-card>
    </div>
  </final-dialog>
</template>

<script>
import { insertOrUpdateDic } from 'api/dictionaries-setting'
import { BRAND, CATEGORY, SOURCE } from 'enum'
const restData = [
  {
    id: 0,
    name: ''
  }
]
export default {
  data () {
    return {
      titleName: '',
      nameList: [],
      visible: false,
      typeId: null
    }
  },
  methods: {
    addItem () {
      this.nameList.push(
        {
          id: 0,
          name: ''
        }
      )
    },
    async saveList () {
      this.nameList.map(item => {
        this.$set(item, 'typeId', this.typeId)
      })
      const res = await insertOrUpdateDic(this.nameList)
      console.log(res)
    },
    deleteDetail (index) {
      this.nameList.splice(index, 1)
    },
    showDialog (row, type) {
      if (row && row.length) {
        this.nameList = row
      } else {
        this.nameList = restData
      }
      switch (type) {
        case BRAND:
          this.titleName = '品牌管理'
          break
        case CATEGORY:
          this.titleName = '品类管理'
          break
        case SOURCE:
          this.titleName = '来源管理'
          break
      }
      this.typeId = type
      this.visible = true
    }
  }
}
</script>
<style lang='scss' scoped>
.dictionaries-detail {
  .btn-box {
    text-align: left;
  }
  .btn-style {
    margin-bottom: 10px;
  }
  .content-con {
    max-height: 500px;
    overflow: auto;
    .card-style {
      text-align: left;
      margin-bottom: 5px;
      position: relative;
      .card-icon-style {
        height: 30px;
        position: absolute;
        top: 50%;
        bottom: 50%;
        right: 10px;
        margin: auto;
      }
    }
  }
}
</style>
<style lang='scss'>
.dictionaries-detail {
  .card-style {
    .input-name {
      display: inline-block;
      width: 200px;
    }
  }
}
</style>
