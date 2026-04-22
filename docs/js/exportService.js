// js/exportService.js

export function copyText(text) {
    navigator.clipboard.writeText(text);
}

export function downloadText(filename, text) {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

export function exportJSON(filename, data) {
    const json = JSON.stringify(data, null, 2);
    downloadText(filename, json);
}
