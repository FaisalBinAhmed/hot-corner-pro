export type Corner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
export type Action =
    | "none"
    | "scrollToTop"
    | "scrollToBottom"
    | "reload"
    | "back"
    | "duplicateTab"
    | "toggleBlur"
    | "toggleGreyScale"
    | "forward";

export type CornerActions = {
    [key in Corner]: Action;
}