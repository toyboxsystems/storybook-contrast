import * as React from "react";
import Card from "./Card";

export default {
    title: "Addons/Design assets",

    parameters: {
        options: {
            selectedPanel: "storybook/design-assets/panel"
        }
    }
};

export const Example = () => (
    <Card>
        <h1 style={{ padding: "20px", fontSize: "14px" }}>hello</h1>
        <p>world</p>
    </Card>
);

export const Example2 = () => (
    <Card>
        <p>world</p>
        <p>world</p>
        <p>world</p>
        <p>world</p>
    </Card>
);
