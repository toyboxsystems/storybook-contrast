"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _addons = require("@storybook/addons");

var _components = require("@storybook/components");

var _api = require("@storybook/api");

var ADDON_ID = "contrast-app";
var PANEL_ID = "".concat(ADDON_ID, "/panel");
console.log("production");
<<<<<<< HEAD
console.log(undefined);
var src =
    "production" === "development" ||
    localStorage.getItem("contrast-env") === "development"
        ? "http://localhost:3000"
        : "https://work.contrast.app";

if (window.location.href.includes("storybook.contrast.app") || undefined) {
    src = src + "/demo";
=======
var src = "production" === "development" || localStorage.getItem("contrast-env") === "development" ? "http://localhost:3000" : "https://work.contrast.app";

if (window.location.href.includes("demo.contrast.app") || undefined || localStorage.getItem("contrast-demo")) {
  src = src + "/demo";
>>>>>>> use demo in dev
}

window.linkedContrast = false;

var sendMessage = function sendMessage(json) {
    // Make sure you are sending a string, and to stringify JSON
    var frame = document.getElementById("the_iframe");

    if (frame && frame.contentWindow) {
        frame.contentWindow.postMessage(JSON.stringify(json), "*");
    }
};

var sendState = function sendState() {
    sendMessage({
        type: "storybook_state",
        data: window.contrastStorybookState
    });
};

var sendStory = function sendStory() {
    var state = window.contrastStorybookState;
    var story = state["storiesHash"][state["storyId"]];

    if (story && story["parameters"]) {
        var parameters = story["parameters"];
        console.log({
            state: state,
            parameters: parameters
        });
        sendMessage({
            type: "storybook_source",
            data: {
                name: story["name"],
                url: window.location.href,
                urlPath: story["path"],
                codeSnippet:
                    parameters["storySource"] &&
                    parameters["storySource"]["source"],
                fileName: parameters["fileName"]
            }
        });
    }
};

var setStorySource = function setStorySource(source) {
    window.contrastStorySource = source;
    sendStory();
};

var setup = function setup() {
    if (!window.linkedContrast) {
        // addEventListener support for IE8
        var bindEvent = function bindEvent(element, eventName, eventHandler) {
            if (element.addEventListener) {
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + eventName, eventHandler);
            }
        }; // Listen to message from child window

        console.log("linked contrast");
        window.linkedContrast = true;
        bindEvent(window, "message", function (e) {
            console.log(e.origin, src);

            if (e.origin === src) {
                var json = JSON.parse(e.data);

                switch (json.type) {
                    case "get_story":
                        return sendStory();

                    case "get_state":
                        return sendState();
                }
            }
        });
    }
};

var Content = function Content() {
    return /*#__PURE__*/ _react["default"].createElement("iframe", {
        onLoad: setup,
        id: "the_iframe",
        width: "100%",
        height: "100%",
        src: src
    });
};

_addons.addons.register(ADDON_ID, function (api) {
    _addons.addons.add(PANEL_ID, {
        type: _addons.types.PANEL,
        title: "Contrast",
        render: function render(_ref) {
            var active = _ref.active,
                key = _ref.key;
            window.contrastStorybookState = (0, _api.useStorybookState)();
            sendStory();
            return /*#__PURE__*/ _react["default"].createElement(
                _components.AddonPanel,
                {
                    active: active,
                    key: key
                },
                /*#__PURE__*/ _react["default"].createElement(Content, null)
            );
        }
    });
});
//# sourceMappingURL=register.js.map
