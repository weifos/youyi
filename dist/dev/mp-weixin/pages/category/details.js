(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/category/details"],{

/***/ 87:
/*!***********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fcategory%2Fdetails"} ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _details = _interopRequireDefault(__webpack_require__(/*! ./pages/category/details.vue */ 88));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_details.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 88:
/*!****************************************!*\
  !*** ./src/pages/category/details.vue ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _details_vue_vue_type_template_id_4f4db396___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./details.vue?vue&type=template&id=4f4db396& */ 89);
/* harmony import */ var _details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./details.vue?vue&type=script&lang=js& */ 91);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _details_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./details.vue?vue&type=style&index=0&lang=scss& */ 93);
/* harmony import */ var _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 38);

var renderjs





/* normalize component */

var component = Object(_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _details_vue_vue_type_template_id_4f4db396___WEBPACK_IMPORTED_MODULE_0__["render"],
  _details_vue_vue_type_template_id_4f4db396___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _details_vue_vue_type_template_id_4f4db396___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "src/pages/category/details.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 89:
/*!***********************************************************************!*\
  !*** ./src/pages/category/details.vue?vue&type=template&id=4f4db396& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_template_id_4f4db396___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--14-0!../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./details.vue?vue&type=template&id=4f4db396& */ 90);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_template_id_4f4db396___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_template_id_4f4db396___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_template_id_4f4db396___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_template_id_4f4db396___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 90:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--14-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./src/pages/category/details.vue?vue&type=template&id=4f4db396& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l1 = _vm.__map(_vm.pResult.specNames, function(item, index) {
    var l0 = _vm.__map(_vm.pResult.specValues, function(citem, index) {
      var f0 = _vm._f("getCustomName")(
        _vm.pResult.specCustoms,
        item.id,
        citem.id,
        citem.val
      )

      return {
        $orig: _vm.__get_orig(citem),
        f0: f0
      }
    })

    return {
      $orig: _vm.__get_orig(item),
      l0: l0
    }
  })

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l1: l1
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 91:
/*!*****************************************************************!*\
  !*** ./src/pages/category/details.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./details.vue?vue&type=script&lang=js& */ 92);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 92:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./src/pages/category/details.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api = _interopRequireDefault(__webpack_require__(/*! @/modules/api */ 13));

var _userInfo = _interopRequireDefault(__webpack_require__(/*! @/modules/userInfo */ 15));

var _appGlobal = _interopRequireDefault(__webpack_require__(/*! @/modules/appGlobal */ 14));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _uniNumberBox = function _uniNumberBox() {
  __webpack_require__.e(/*! require.ensure | node-modules/@dcloudio/uni-ui/lib/uni-number-box/uni-number-box */ "node-modules/@dcloudio/uni-ui/lib/uni-number-box/uni-number-box").then((function () {
    return resolve(__webpack_require__(/*! @dcloudio/uni-ui/lib/uni-number-box/uni-number-box */ 426));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var _uniPopup = function _uniPopup() {
  __webpack_require__.e(/*! require.ensure | node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup */ "node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup").then((function () {
    return resolve(__webpack_require__(/*! @dcloudio/uni-ui/lib/uni-popup/uni-popup */ 433));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var operationButton = function operationButton() {
  __webpack_require__.e(/*! require.ensure | components/yoyi-operation-button/index */ "components/yoyi-operation-button/index").then((function () {
    return resolve(__webpack_require__(/*! @/components/yoyi-operation-button/ */ 384));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var _default = {
  data: function data() {
    return {
      imgUrl: '',
      isShow: false,
      //是否能够购买
      isCanSubmit: false,
      store_id: 0,
      //是否加入购物车
      isAddToCart: false,
      //显示sku模态框
      showDialog: false,
      //购买数量
      buyCount: 1,
      //选择的sku
      selectSku: null,
      //单价
      unitPrice: 0,
      //总计
      totalPrice: 0,
      //商品详情
      pResult: {
        product: {
          name: ''
        },
        skus: [],
        imgs: []
      },
      //是否收藏
      collected: false,
      discountInfo: [{
        type: "优惠购",
        name: "现在购买享受 ¥ 27.50，限购10件…"
      }],
      //小图封面
      coverUrl: ''
    };
  },
  components: {
    uniPopup: _uniPopup,
    uniNumberBox: _uniNumberBox,
    operationButton: operationButton
  },
  filters: {
    getCustomName: function getCustomName(specCustoms, name_id, val_id, val) {
      var custom_name = val;
      specCustoms.forEach(function (item, index) {
        if (name_id == item.specname_id && val_id == item.specvalue_id && item.custom_value != '') {
          custom_name = item.custom_value;
          return;
        }
      });
      return custom_name;
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show: function show(newData, oldData) {
      this.isShow = newData;
    }
  },
  onLoad: function onLoad(opt) {
    this.api_203(opt.id);
  },
  methods: {
    onClickCollect: function onClickCollect() {
      this.collected = true;
    },
    //购买或加入购物车
    popupOpen: function popupOpen(isAddToCart) {
      this.isAddToCart = isAddToCart;

      if (this.pResult.skus.length > 0) {
        this.$refs.popup.open();
      } else {
        uni.showToast({
          title: '库存不足',
          duration: 2000,
          icon: 'none'
        });
      }
    },
    closePopup: function closePopup() {
      this.$refs.popup.close();
    },
    change: function change(value) {
      this.buyCount = value;
    },
    //规格选中事件
    check: function check(item) {
      var that = this; //是否可用点击

      if (!item.is_enable) return; //当前索引      

      var i = that.pResult.specNames.findIndex(function (val) {
        return val.id == item.specname_id;
      }); //设置点击状态

      that.pResult.specValues.map(function (obj, index, arr) {
        if (obj.specname_id == item.specname_id) {
          obj.checked = false;

          if (item.id == obj.id) {
            obj.checked = true;
          }
        }
      }); //判断下一行索引是否大于数组总长度 

      if (i + 1 > that.pResult.specNames.length - 1) {
        //全部选中
        that.getSelectSkuVal();
      } else {
        //清除未选择的状态
        var clearSpecNames = that.pResult.specNames.filter(function (val, index) {
          return index > i;
        });
        clearSpecNames.forEach(function (item, index) {
          that.pResult.specValues.map(function (obj, i) {
            if (obj.specname_id == item.id) {
              obj.checked = false;
              obj.is_enable = false;
            }
          });
        }); //绑定下一行

        that.bindSKU(that.pResult.specNames[i + 1].id, item);
      }
    },
    //绑定每行sku状态
    bindSKU: function bindSKU(spec_name_id, specVal) {
      //SKU集合
      var skus = this.pResult.skus;
      var checkedVal = this.pResult.specValues.filter(function (val) {
        return val.checked;
      }).map(function (item) {
        return item.specname_id + "_" + item.id;
      }).join(','); //处理规格值

      this.pResult.specValues.filter(function (val) {
        return val.specname_id == spec_name_id;
      }).map(function (obj, index) {
        //在sku集合里面获取首行可点的规格
        skus.forEach(function (item, index) {
          if (item.stock_num <= 0) {
            obj.is_enable = false;
            return;
          }

          var exist = 0;
          var pass = false;
          var arr = checkedVal.split(',');
          var arr1 = item.specset.split(',');
          arr.forEach(function (o, i) {
            arr1.forEach(function (oo, ii) {
              if (oo == o) {
                exist++;
              }
            });
          }); //是否是第一次加载

          if (checkedVal.length) {
            pass = exist == arr.length;
          } else {
            pass = true;
          }

          item.specset.split(',').forEach(function (o, i) {
            if (pass && o.split('_')[0] == spec_name_id && obj.specname_id + "_" + obj.id == o) {
              obj.is_enable = true;
              return;
            }
          });
        });

        if (specVal != undefined && specVal.id == obj.id) {
          obj.checked = true;
        }
      });
    },
    //获取选中完成的sku
    getSelectSkuVal: function getSelectSkuVal() {
      var that = this;
      var items = that.pResult.specValues.filter(function (val) {
        return val.checked == true;
      });

      if (items.length < that.pResult.specNames.length) {
        var name = that.pResult.specNames[items.length].name;
        uni.showToast({
          title: "请选择" + name,
          duration: 2000
        });
        return null;
      }

      var data = null;

      if (that.pResult.product.is_open_spec) {
        //获取选中数据
        var sku_id = items.map(function (item) {
          return item.specname_id + "_" + item.id;
        }).join(','); //在当前sku集合中获取

        that.pResult.skus.forEach(function (item, index) {
          if (_appGlobal.default.util.compareSku(sku_id, item.specset)) {
            data = item;
            return;
          }
        });
      } else {
        data = that.selectSku;
      }

      that.selectSku = data;
      that.checkUpdate();
      return data;
    },
    //提交
    submit: function submit() {
      this.$refs.popup.close(); //初始化是否能够提交

      if (!this.isCanSubmit) return; //选中的商品SKU

      var tmp = this.getSelectSkuVal();

      if (tmp != null) {
        //门店商品ID
        //tmp.sto_product_id = this.selectSku.product.id
        //平台商品ID
        tmp.product_id = this.selectSku.product_id; //加入购物车的数量

        tmp.count = this.buyCount; //加入购物车

        if (this.isAddToCart) {
          _userInfo.default.methods.setShoppingCart(tmp);
        } else {
          //加入本地存取立即购买
          _userInfo.default.methods.setBuyNow(tmp);

          uni.navigateTo({
            url: '/pages/user/confirm-order'
          });
        }
      }
    },
    //关闭当前页
    close: function close() {
      this.selectSku.specset = '';
      this.selectSku.sale_price = 0;
      this.selectSku.product_id = 0;
      this.$emit('cancelSKU');
    },
    //加
    add: function add() {
      if (this.buyCount >= 99) return;
      this.buyCount = this.buyCount + 1;
      this.checkUpdate();
    },
    //减
    sub: function sub() {
      if (this.buyCount <= 1) return;
      this.buyCount = this.buyCount - 1;
      this.checkUpdate();
    },
    //勾选改变更新小计
    checkUpdate: function checkUpdate() {
      this.unitPrice = this.selectSku.sale_price; //设置总计

      this.totalPrice = this.selectSku.sale_price * this.buyCount;
    },
    //处理输入方式
    handleInput: function handleInput() {
      var value = this.validateNumber(e.detail.value);
      val.replace(/\D/g, '');
    },
    //初始化
    init: function init() {},

    /**
     * 加载商品详情
     */
    api_203: function api_203(id) {
      var that = this;

      _api.default.post(_api.default.api_203, _api.default.getSign({
        ID: id
      }), function (vue, res) {
        if (res.data.Basis.State == _api.default.state.state_200) {
          res.data.Result.specValues.forEach(function (obj, i) {
            that.$set(obj, "checked", false);
            that.$set(obj, "is_enable", false);
          });
          that.pResult = res.data.Result;

          if (that.pResult.product.is_open_spec) {
            if (that.pResult.specNames.length == 0) return;
            that.totalPrice = 0; //获购买数量

            that.buyCount = 1; //获取首行规格名称id

            var one_name_id = that.pResult.specNames[0].id; //绑定首行状态

            that.bindSKU(one_name_id);
          } else {
            if (that.pResult.skus[0] != undefined) {
              that.selectSku = that.pResult.skus[0];
              that.totalPrice = that.selectSku.sale_price;
              that.checkUpdate();
            }
          }

          that.isCanSubmit = that.pResult.skus.filter(function (sku) {
            return sku.is_enable;
          }).length > 0;
        } else {
          uni.showToast({
            title: res.data.Msg,
            duration: 2000
          });
        }
      });
    },

    /**
     * 提交订单
     */
    api_314: function api_314() {
      var that = this;

      _api.default.post(_api.default.api_314, _api.default.getSign({}), function (app, res) {
        if (res.data.Basis.State != _api.default.state.state_200) {
          wx.showToast({
            title: res.data.Basis.Msg,
            icon: 'none',
            duration: 3000
          });
        } else {}
      });
    },

    /**
     * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
     */
    switchTab: function switchTab(url) {
      //重新跳转到用户中心 
      uni.switchTab({
        url: url
      });
    },

    /**
     * 保留当前页面，跳转到应用内的某个页面
     */
    navigateTo: function navigateTo(url) {
      uni.navigateTo({
        url: url
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 93:
/*!**************************************************************************!*\
  !*** ./src/pages/category/details.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../node_modules/css-loader??ref--8-oneOf-1-1!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./details.vue?vue&type=style&index=0&lang=scss& */ 94);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_details_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 94:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./src/pages/category/details.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[87,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/category/details.js.map