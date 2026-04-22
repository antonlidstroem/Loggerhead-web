// js/app.js

import { processLog } from "./logEngine.js";
import { renderLog } from "./renderer.js";

const logArea = document.getElementById("log-area");
const status = document.getElementById("status");
const fileInput = document.getElementById("fileInput");

let currentDoc = null;

// FILE LOAD
fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();

    logArea.innerText = text;
    status.innerText = `Loaded: ${file.name}`;
});

// PASTE
window.pasteFromClipboard = async function () {
    try {
        const text = await navigator.clipboard.readText();
        logArea.innerText = text;
        status.innerText = "Pasted";
    } catch {
        status.innerText = "Clipboard blocked";
    }
};

// CLEAR
window.clearScreen = function () {
    logArea.innerHTML = "";
    status.innerText = "Cleared";
};

// WASH (MAIN ENTRY)
window.washLog = function () {
    const input = logArea.innerText.trim();
    if (!input) return;

    currentDoc = processLog(input, "default");

    renderLog(currentDoc, logArea);

    status.innerText =
        `Washed (${currentDoc.stats.after.chars} chars, -${currentDoc.stats.reductionPercent}%)`;
};

// MOBILE MENU
window.toggleMenu = function () {
    document.getElementById("mobileMenu").classList.toggle("open");
};
