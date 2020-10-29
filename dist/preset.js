"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function managerEntries() {
  var entry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return [].concat((0, _toConsumableArray2["default"])(entry), [require.resolve("./register")]);
}

function webpack() {
  var webpackConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _webpackConfig$module = webpackConfig.module,
      module = _webpackConfig$module === void 0 ? {} : _webpackConfig$module;
  var loaderOptions = options.loaderOptions,
      _options$rule = options.rule,
      rule = _options$rule === void 0 ? {} : _options$rule;
  return _objectSpread(_objectSpread({}, webpackConfig), {}, {
    module: _objectSpread(_objectSpread({}, module), {}, {
      rules: [].concat((0, _toConsumableArray2["default"])(module.rules || []), [_objectSpread(_objectSpread({
        test: [/\.stories\.(jsx?$|tsx?$)/]
      }, rule), {}, {
        enforce: "pre",
        use: [{
          loader: require.resolve("@storybook/source-loader"),
          options: {
            loaderOptions: loaderOptions,
            injectStoryParameters: false
          }
        }]
      })])
    })
  });
}

module.exports = {
  webpack: webpack,
  managerEntries: managerEntries
};
//# sourceMappingURL=preset.js.map