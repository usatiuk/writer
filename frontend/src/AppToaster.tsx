import { Position, Toaster } from "@blueprintjs/core";

export const AppToaster = Toaster.create({
    className: "recipe-toaster",
    position: Position.TOP,
});

export function showDeletionToast(cancelFn: () => void) {
    AppToaster.show({
        message: "Document deleted!",
        intent: "danger",
        timeout: 2900,
        action: {
            text: "Undo",
            onClick: cancelFn,
        },
    });
}

export function showSharedToast() {
    AppToaster.show({
        message: "Link copied to clipboard!",
        intent: "success",
        timeout: 2000,
    });
}
