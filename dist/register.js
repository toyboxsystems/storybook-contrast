"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _addons = require("@storybook/addons");

var _components = require("@storybook/components");

var _api = require("@storybook/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ADDON_ID = "myaddon";
var PANEL_ID = ADDON_ID + "/panel";

var SRC = "http://localhost:3000";

var sendMessage = function sendMessage(json) {
    // Make sure you are sending a string, and to stringify JSON
    document.getElementById("the_iframe").contentWindow.postMessage(JSON.stringify(json), "*");
};

var sendState = function sendState() {
    sendMessage({
        type: "storybook_state",
        data: window.contrastStorybookState
    });
};

var setup = function setup() {
    console.log("SETUP");

    window.setupContrast = true;

    // addEventListener support for IE8
    function bindEvent(element, eventName, eventHandler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, eventHandler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + eventName, eventHandler);
        }
    }

    // Listen to message from child window
    bindEvent(window, "message", function (e) {
        console.log("from child", e);
        if (e.origin === SRC) {
            var json = JSON.parse(e.data);

            switch (json.type) {
                case "get_state":
                    return sendState();
            }
        }
    });

    sendState();
};

var Content = function Content() {
    var state = (0, _api.useStorybookState)();
    window.contrastStorybookState = state;
    console.log("SETTING STATE");

    if (window.setupContrast) {
        sendState();
    }

    // return null;
    return _react2.default.createElement("iframe", {
        onLoad: setup,
        id: "the_iframe",
        width: "100%",
        height: "100%",
        src: SRC
    });
};

_addons.addons.register(ADDON_ID, function (api) {
    _addons.addons.add(PANEL_ID, {
        type: _addons.types.PANEL,
        title: "Contrast",
        render: function render(_ref) {
            var active = _ref.active,
                key = _ref.key;

            return _react2.default.createElement(
                _components.AddonPanel,
                { active: active, key: key },
                _react2.default.createElement(Content, null)
            );
        }
    });
});
//# sourceMappingURL=register.js.map