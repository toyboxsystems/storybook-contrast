"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoryPanel = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _router = require("@storybook/router");

var _components = require("@storybook/components");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var StyledStoryLink = (0, _theming.styled)(_router.Link)(function (_ref) {
  var theme = _ref.theme;
  return {
    display: "block",
    textDecoration: "none",
    borderRadius: theme.appBorderRadius,
    color: "inherit",
    "&:hover": {
      background: theme.background.hoverable
    }
  };
});

var SelectedStoryHighlight = _theming.styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    background: theme.background.hoverable,
    borderRadius: theme.appBorderRadius
  };
});

var StyledSyntaxHighlighter = (0, _theming.styled)(_components.SyntaxHighlighter)(function (_ref3) {
  var theme = _ref3.theme;
  return {
    fontSize: theme.typography.size.s2 - 1
  };
});

var areLocationsEqual = function areLocationsEqual(a, b) {
  return a.startLoc.line === b.startLoc.line && a.startLoc.col === b.startLoc.col && a.endLoc.line === b.endLoc.line && a.endLoc.col === b.endLoc.col;
};

var StoryPanel = function StoryPanel(_ref4) {
  var api = _ref4.api,
      setSource = _ref4.setSource;

  var _React$useState = _react["default"].useState({
    source: "loading source...",
    locationsMap: {}
  }),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  var story = api.getCurrentStoryData();

  var selectedStoryRef = _react["default"].useRef(null);

  _react["default"].useEffect(function () {
    if (story) {
      var _story$parameters = story.parameters;
      _story$parameters = _story$parameters === void 0 ? {} : _story$parameters;
      var _story$parameters$sto = _story$parameters.storySource;
      _story$parameters$sto = _story$parameters$sto === void 0 ? {
        source: "",
        locationsMap: {}
      } : _story$parameters$sto;
      var _source = _story$parameters$sto.source,
          _locationsMap = _story$parameters$sto.locationsMap;

      var _currentLocation = _locationsMap ? _locationsMap[Object.keys(_locationsMap).find(function (key) {
        var sourceLoaderId = key.split("--");
        return story.id.endsWith(sourceLoaderId[sourceLoaderId.length - 1]);
      })] : undefined;

      setState({
        source: _source,
        locationsMap: _locationsMap,
        currentLocation: _currentLocation
      });
    }
  }, [story ? story.id : null]);

  _react["default"].useEffect(function () {
    if (selectedStoryRef.current) {
      selectedStoryRef.current.scrollIntoView();
    }
  }, [selectedStoryRef.current]);

  var source = state.source,
      locationsMap = state.locationsMap,
      currentLocation = state.currentLocation;

  var createPart = function createPart(_ref5) {
    var rows = _ref5.rows,
        stylesheet = _ref5.stylesheet,
        useInlineStyles = _ref5.useInlineStyles;
    return rows.map(function (node, i) {
      return (0, _components.createSyntaxHighlighterElement)({
        node: node,
        stylesheet: stylesheet,
        useInlineStyles: useInlineStyles,
        key: "code-segement".concat(i)
      });
    });
  };

  var createStoryPart = function createStoryPart(_ref6) {
    var rows = _ref6.rows,
        stylesheet = _ref6.stylesheet,
        useInlineStyles = _ref6.useInlineStyles,
        location = _ref6.location,
        id = _ref6.id,
        refId = _ref6.refId;
    var first = location.startLoc.line - 1;
    var last = location.endLoc.line;
    var storyRows = rows.slice(first, last);
    var storySource = createPart({
      rows: storyRows,
      stylesheet: stylesheet,
      useInlineStyles: useInlineStyles
    });
    var storyKey = "".concat(first, "-").concat(last);

    if (currentLocation && areLocationsEqual(location, currentLocation)) {
      return /*#__PURE__*/_react["default"].createElement(SelectedStoryHighlight, {
        key: storyKey,
        ref: selectedStoryRef
      }, storySource);
    }

    return /*#__PURE__*/_react["default"].createElement(StyledStoryLink, {
      to: refId ? "/story/".concat(refId, "_").concat(id) : "/story/".concat(id),
      key: storyKey
    }, storySource);
  };

  var createParts = function createParts(_ref7) {
    var rows = _ref7.rows,
        stylesheet = _ref7.stylesheet,
        useInlineStyles = _ref7.useInlineStyles;
    var parts = [];
    var lastRow = 0;
    Object.keys(locationsMap).forEach(function (key) {
      var location = locationsMap[key];
      var first = location.startLoc.line - 1;
      var last = location.endLoc.line;
      var kind = story.kind,
          refId = story.refId; // source loader ids are different from story id

      var sourceIdParts = key.split("--");
      var id = api.storyId(kind, sourceIdParts[sourceIdParts.length - 1]);
      var start = createPart({
        rows: rows.slice(lastRow, first),
        stylesheet: stylesheet,
        useInlineStyles: useInlineStyles
      });
      var storyPart = createStoryPart({
        rows: rows,
        stylesheet: stylesheet,
        useInlineStyles: useInlineStyles,
        location: location,
        id: id,
        refId: refId
      });
      parts.push(start);
      parts.push(storyPart);
      lastRow = last;
    });
    var lastPart = createPart({
      rows: rows.slice(lastRow),
      stylesheet: stylesheet,
      useInlineStyles: useInlineStyles
    });
    parts.push(lastPart);
    return parts;
  };

  var lineRenderer = function lineRenderer(_ref8) {
    var rows = _ref8.rows,
        stylesheet = _ref8.stylesheet,
        useInlineStyles = _ref8.useInlineStyles;
    // because of the usage of lineRenderer, all lines will be wrapped in a span
    // these spans will receive all classes on them for some reason
    // which makes colours cascade incorrectly
    // this removed that list of classnames
    var myrows = rows.map(function (_ref9) {
      var properties = _ref9.properties,
          rest = (0, _objectWithoutProperties2["default"])(_ref9, ["properties"]);
      return _objectSpread(_objectSpread({}, rest), {}, {
        properties: {
          className: []
        }
      });
    });

    if (!locationsMap || !Object.keys(locationsMap).length) {
      return createPart({
        rows: myrows,
        stylesheet: stylesheet,
        useInlineStyles: useInlineStyles
      });
    }

    var parts = createParts({
      rows: myrows,
      stylesheet: stylesheet,
      useInlineStyles: useInlineStyles
    });
    return /*#__PURE__*/_react["default"].createElement("span", null, parts);
  };

  setSource(source);
  return story ? /*#__PURE__*/_react["default"].createElement(StyledSyntaxHighlighter, {
    language: "jsx",
    showLineNumbers: true,
    renderer: lineRenderer,
    format: false,
    copyable: false,
    padded: true
  }, source) : null;
};

exports.StoryPanel = StoryPanel;
//# sourceMappingURL=StoryPanel.js.map