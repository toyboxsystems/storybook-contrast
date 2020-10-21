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
    <div>This story should a single image in the assets panel</div>
);

export const DSingleImage = () => (
    <div>
        <div>This story should a single image in the assets panel</div>
        <div>This story should a single image in the assets panel</div>
    </div>
);

SingleImage.storyName = "single image";

SingleImage.parameters = {
    assets: ["https://via.placeholder.com/300/09f/fff.png"]
};
