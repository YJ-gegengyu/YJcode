/*
 * @Description: 组件信息描述
 * @version: 2.1.0
 * @Author: MR·ggy
 * @Date: 2020-06-20 18:08:24
 * @,@LastEditors: ,: MR·ggy
 * @,@LastEditTime: ,: 2021-01-04 14:01:26
 */
import Vue from 'vue'
import plTable from 'pl-table'

import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Loading,
  MessageBox,
  Message,
  Notification,
  Input,
  Button,
  ButtonGroup,
  Form,
  FormItem,
  Dialog,
  Cascader,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Badge,
  Table,
  TableColumn,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Select,
  Option,
  Scrollbar,
  Tabs,
  TabPane,
  Collapse,
  CollapseItem,
  Autocomplete,
  TimePicker,
  DatePicker,
  Popover,
  tree,
  Tooltip,
  CascaderPanel,
  Progress
} from 'element-ui'
Vue.use(plTable)
Vue.use(Tooltip)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Badge)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Cascader)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Scrollbar)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Autocomplete)
Vue.use(Popover)
Vue.use(tree)
Vue.use(Progress)
Vue.use(CascaderPanel)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 2100 }
