import * as React from "react";
import { storiesOf, setAddon } from "@storybook/react";

storiesOf("Example", module)
    .add("Static source", () => (
        <div>
            <span>
                <p>hello, world.</p>
            </span>
        </div>
    ))
    .add("foo", () => (
        <div>
            <span>
                <p>foo, bar.</p>
            </span>
        </div>
    ));
