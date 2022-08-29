import sanitizeHtml from "sanitize-html";

function sanitize(text: string) {
    // TODO: allow more coding embeds
    return sanitizeHtml(text, {
        allowedIframeHostnames: []
    })
}

export const util = {
    sanitize
}
