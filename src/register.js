import React from "react";
import _ from "lodash";
import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import { useStorybookState } from "@storybook/api";

const ADDON_ID = "contrast-app";
const PANEL_ID = `${ADDON_ID}/panel`;

const SRC = "https://work.contrast.app";
// const SRC = "http://localhost:3000";

window.linkedContrast = false;

const sendMessage = json => {
    // Make sure you are sending a string, and to stringify JSON

    const frame = document.getElementById("the_iframe");
    if (frame && frame.contentWindow) {
        frame.contentWindow.postMessage(JSON.stringify(json), "*");
    }
};

const sendState = () => {
    sendMessage({
        type: "storybook_state",
        data: window.contrastStorybookState
    });
};

const sendStory = () => {
    const state = useStorybookState();
    const story = state["storiesHash"][state["storyId"]];
    if (story && story["parameters"]) {
        const parameters = story["parameters"];
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

const setStorySource = source => {
    window.contrastStorySource = source;
    sendStory();
};

const setup = () => {
    if (!window.linkedContrast) {
        console.log("linked contrast");
        window.linkedContrast = true;

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
            if (e.origin === SRC) {
                const json = JSON.parse(e.data);

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

const Content = () => {
    return (
        <iframe
            onLoad={setup}
            id="the_iframe"
            width="100%"
            height="100%"
            src={SRC}
        />
    );
};

addons.register(ADDON_ID, api => {
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: "Contrast",
        render: ({ active, key }) => {
            sendStory();

            return (
                <AddonPanel active={active} key={key}>
                    <Content />
                </AddonPanel>
            );
        }
    });
});
