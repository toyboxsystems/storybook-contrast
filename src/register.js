import React from "react";
import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import { useStorybookState } from "@storybook/api";
import { StoryPanel } from "./StoryPanel";

const ADDON_ID = "myaddon";
const PANEL_ID = `${ADDON_ID}/panel`;

const SRC = "http://localhost:3000";

const sendMessage = json => {
    // Make sure you are sending a string, and to stringify JSON
    document
        .getElementById("the_iframe")
        .contentWindow.postMessage(JSON.stringify(json), "*");
};

const sendState = () => {
    sendMessage({
        type: "storybook_state",
        data: window.contrastStorybookState
    });
};

const setStorySource = source => {
    window.contrastStorySource = source;
};

const sendStorySource = () => {
    sendMessage({
        type: "storybook_source",
        data: window.contrastStorybookState
    });
};

const setup = () => {
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
            const json = JSON.parse(e.data);

            switch (json.type) {
                case "get_state":
                    return sendState();
            }
        }
    });

    sendState();
};

const Content = () => {
    const state = useStorybookState();
    window.contrastStorybookState = state;
    console.log("SETTING STATE");

    if (window.setupContrast) {
        sendState();
    }

    // return null;
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
            return (
                <AddonPanel active={active} key={key}>
                    <span style={{ display: "none" }}>
                        <StoryPanel
                            key={key}
                            api={api}
                            setSource={setStorySource}
                        />
                    </span>
                    <Content />
                </AddonPanel>
            );
        }
    });
});
