import * as React from "react";

export default {
    title: "Addons/Design assets",

    parameters: {
        options: {
            selectedPanel: "storybook/design-assets/panel"
        }
    }
};

export const SingleImage = () => (
    <div>
        <h1 style={{ padding: "20px", fontSize: "12px" }}>hello</h1>
        <p style={{ padding: "20px", fontSize: "12px" }}>world</p>
    </div>
);

export const DSingleImage = () => (
    <div>
        <div style={{ padding: "20px", fontSize: "14px" }}>hello</div>
        <div>world</div>
        <div>This story should a single image in the assets panel</div>
    </div>
);

SingleImage.storyName = "single image";

SingleImage.parameters = {
    assets: ["https://via.placeholder.com/300/09f/fff.png"]
};
