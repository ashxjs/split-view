import { CSSProperties } from "react";

export type ComponentStyle = {
    LeftPanel: CSSProperties;
    SplitView: CSSProperties;
    DividerHitBox: CSSProperties;
    Divider: CSSProperties;
    RightPanel: CSSProperties;
}

export const styles: ComponentStyle = {
    LeftPanel: {
        height: "100%",
        overflowY: "auto"
    },
    SplitView: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start"
    },
    DividerHitBox: {
        cursor: "col-resize",
        alignSelf: "stretch",
        display: "flex",
        alignItems: "center",
    },
    Divider: {
        width: "2px",
        height: "100%",
        border: "2px solid #e3e3e3"
    },
    RightPanel: {
        flex: 1
    }
};