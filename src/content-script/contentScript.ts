import type { Action, Corner, CornerActions } from "../types";


function getCornerFromCoordinates(x: number, y: number, width: number, height: number): Corner | null {
    const zoneWidth = width * 0.2;
    const zoneHeight = height * 0.2;

    if (x < zoneWidth && y < zoneHeight) return "topLeft";
    if (x > width - zoneWidth && y < zoneHeight) return "topRight";
    if (x < zoneWidth && y > height - zoneHeight) return "bottomLeft";
    if (x > width - zoneWidth && y > height - zoneHeight) return "bottomRight";

    return null;
}

const toggleBlur = () => {
    const current = document.body.style.filter;
    if (current.includes("blur")) {
        document.body.style.filter = "";
    } else {
        document.body.style.filter = "blur(8px)";
    }
};


function performAction(action: Action) {
    switch (action) {
        case "scrollToTop":
            window.scrollTo({ top: 0, behavior: "smooth" });
            break;
        case "scrollToBottom":
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            break;
        case "reload":
            location.reload();
            break;
        case "back":
            history.back();
            break;
        case "forward":
            history.forward();
            break;
        case "duplicateTab":
            window.open(location.href, "_blank");
            break;
        case "toggleBlur":
            toggleBlur();
            break;
        case "none":
            break;
        default:
            break;
    }
}

// local state
let cornerActions: CornerActions = {
    topLeft: "none",
    topRight: "none",
    bottomLeft: "none",
    bottomRight: "none",
};

chrome.storage.sync.get(["cornerActions"], (result) => {
    if (result.cornerActions) {
        cornerActions = result.cornerActions as CornerActions;
    }
});

// update local state when storage changes
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "sync" && changes.cornerActions?.newValue) {
        cornerActions = changes.cornerActions.newValue as CornerActions;
    }
});

document.addEventListener("dblclick", (e: MouseEvent) => {
    const corner = getCornerFromCoordinates(
        e.clientX,
        e.clientY,
        window.innerWidth,
        window.innerHeight
    );

    if (corner) {
        const action = cornerActions[corner];
        performAction(action);
    }
});
