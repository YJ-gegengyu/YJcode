/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-07-01 17:54:57
 * @,@LastEditors: ,: MR·ggy
 * @,@LastEditTime: ,: 2020-12-24 16:25:48
 */
import Dialog from './packages/final-dialog/index.js'
import FinalDragDialog from './packages/final-drag-dialog/index.js'
import FinalTable from './packages/final-table/index.js'
import FinalInput from './packages/final-input/index.js'
import FinalTabs from './packages/final-tabs/index.js'
import FinalTabPane from './packages/final-tab-pane/index.js'
import FinalTabNav from './packages/final-tab-nav/index.js'
import FinalSelect from './packages/final-select/index.js'
import FinalOption from './packages/final-option/index.js'
import FinalMessageBox from './packages/final-message-box/index'
import FinalPopover from './packages/final-popover/index.js'
import FinalProgress from './packages/final-progress/index.js'
import FinalDrawer from './packages/final-drawer/index.js'
import FinalUpload from './packages/final-upload/index.js'
import FinalSelectTree from './packages/final-select-tree/index.js'
import FinalEmpty from './packages/final-empty/index.js'
// import selectYear from '@/components/base-template/index.js'
const components = [
  Dialog,
  FinalTable,
  FinalInput,
  FinalTabs,
  FinalTabPane,
  FinalTabNav,
  FinalDragDialog,
  FinalSelect,
  FinalOption,
  FinalMessageBox,
  FinalPopover,
  FinalProgress,
  FinalDrawer,
  FinalUpload,
  FinalSelectTree,
  // selectYear,
  FinalEmpty
]
const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  Vue.prototype.$msgBox = FinalMessageBox
}
export default {
  install,
  Dialog,
  FinalTable,
  FinalInput,
  FinalTabs,
  FinalTabPane,
  FinalTabNav,
  FinalDragDialog,
  FinalSelect,
  FinalOption,
  FinalMessageBox,
  FinalPopover,
  FinalProgress,
  FinalDrawer,
  FinalUpload,
  FinalSelectTree,
  // selectYear,
  FinalEmpty
}
