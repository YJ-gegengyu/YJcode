"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _plTable = _interopRequireDefault(require("pl-table"));

var _elementUi = require("element-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Description: 组件信息描述
 * @version: 2.1.0
 * @Author: MR·小涛
 * @Date: 2020-06-20 18:08:24
 * @,@LastEditors: ,: MR·小涛
 * @,@LastEditTime: ,: 2021-01-04 14:01:26
 */
_vue["default"].use(_plTable["default"]);

_vue["default"].use(_elementUi.Tooltip);

_vue["default"].use(_elementUi.DatePicker);

_vue["default"].use(_elementUi.TimePicker);

_vue["default"].use(_elementUi.Radio);

_vue["default"].use(_elementUi.RadioGroup);

_vue["default"].use(_elementUi.RadioButton);

_vue["default"].use(_elementUi.Badge);

_vue["default"].use(_elementUi.Dropdown);

_vue["default"].use(_elementUi.DropdownMenu);

_vue["default"].use(_elementUi.DropdownItem);

_vue["default"].use(_elementUi.Menu);

_vue["default"].use(_elementUi.Submenu);

_vue["default"].use(_elementUi.MenuItem);

_vue["default"].use(_elementUi.MenuItemGroup);

_vue["default"].use(_elementUi.Button);

_vue["default"].use(_elementUi.ButtonGroup);

_vue["default"].use(_elementUi.Input);

_vue["default"].use(_elementUi.Form);

_vue["default"].use(_elementUi.FormItem);

_vue["default"].use(_elementUi.Dialog);

_vue["default"].use(_elementUi.Cascader);

_vue["default"].use(_elementUi.Table);

_vue["default"].use(_elementUi.TableColumn);

_vue["default"].use(_elementUi.Checkbox);

_vue["default"].use(_elementUi.CheckboxButton);

_vue["default"].use(_elementUi.CheckboxGroup);

_vue["default"].use(_elementUi.Select);

_vue["default"].use(_elementUi.Option);

_vue["default"].use(_elementUi.Scrollbar);

_vue["default"].use(_elementUi.Tabs);

_vue["default"].use(_elementUi.TabPane);

_vue["default"].use(_elementUi.Collapse);

_vue["default"].use(_elementUi.CollapseItem);

_vue["default"].use(_elementUi.Autocomplete);

_vue["default"].use(_elementUi.Popover);

_vue["default"].use(_elementUi.tree);

_vue["default"].use(_elementUi.Progress);

_vue["default"].use(_elementUi.CascaderPanel);

_vue["default"].prototype.$loading = _elementUi.Loading.service;
_vue["default"].prototype.$msgbox = _elementUi.MessageBox;
_vue["default"].prototype.$alert = _elementUi.MessageBox.alert;
_vue["default"].prototype.$confirm = _elementUi.MessageBox.confirm;
_vue["default"].prototype.$prompt = _elementUi.MessageBox.prompt;
_vue["default"].prototype.$notify = _elementUi.Notification;
_vue["default"].prototype.$message = _elementUi.Message;
_vue["default"].prototype.$ELEMENT = {
  size: 'small',
  zIndex: 4000
};