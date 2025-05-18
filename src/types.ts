export type Corner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
export type Action =
    | "none"
    | "scrollToTop"
    | "scrollToBottom"
    | "reload"
    | "back"
    | "forward";

export type CornerActions = {
    [key in Corner]: Action;
}