import { processLog } from "./logEngine.js";
import { renderLog, renderStats, renderDiff } from "./renderer.js";
import { copyText, exportJSON } from "./exportService.js";
import { saveSession, getLatest } from "./storage.js";
import { buildDiff } from "./diffEngine.js";
import { searchLines } from "./searchEngine.js";

// DOM (safe init)
const logArea = document.getElementById("log-area");
const status = document.getElementById("status");
const statsPanel = document.getElementById("statsPanel");
const profileSelect = document.getElementById("profileSelect");
const fileInput = document.getElementById("fileInput");

// expose for inline HTML
window.fileInput = fileInput;

let currentDoc = null;
let isDiffView = false;

// --------------------
// FILE LOAD
// --------------------
fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    logArea.innerText = text;

    status.innerText = `Loaded: ${file.name}`;
});

// --------------------
// PASTE
// --------------------
window.pasteFromClipboard = async function () {
    try {
        const text = await navigator.clipboard.readText();
        logArea.innerText = text;
        status.innerText = "Pasted";
    } catch {
        status.innerText = "Clipboard blocked";
    }
};

// --------------------
// CLEAR
// --------------------
window.clearScreen = function () {
    logArea.innerHTML = "";
    currentDoc = null;
    statsPanel.innerHTML = "";
    isDiffView = false;
    status.innerText = "Cleared";
};

// --------------------
// WASH
// --------------------
window.washLog = function () {
    const input = logArea.innerText.trim();
    if (!input) return;

    currentDoc = processLog(input, profileSelect.value);
    isDiffView = false;

    renderLog(currentDoc, logArea);
    renderStats(currentDoc, statsPanel);

    saveSession(currentDoc);

    status.innerText = `Washed (-${currentDoc.stats.reductionPercent}%)`;
};

// --------------------
// COPY
// --------------------
window.copyClean = function () {
    if (!currentDoc) return;

    copyText(currentDoc.transformedText);
    status.innerText = "Copied cleaned log";
};

window.copyOriginal = function () {
    if (!currentDoc) return;

    copyText(currentDoc.originalText);
    status.innerText = "Copied original log";
};

// --------------------
// EXPORT
// --------------------
window.exportJSONFile = function () {
    if (!currentDoc) return;

    exportJSON("log.json", currentDoc);
    status.innerText = "Exported JSON";
};

// --------------------
// SEARCH
// --------------------
window.searchLog = function (query) {
    if (!currentDoc || isDiffView) return;

    const resultLines = searchLines(currentDoc.lines, query);

    renderLog({ ...currentDoc, lines: resultLines }, logArea);
};

// --------------------
// DIFF TOGGLE
// --------------------
window.toggleDiff = function () {
    if (!currentDoc) return;

    if (isDiffView) {
        // tillbaka till normal vy
        renderLog(currentDoc, logArea);
        renderStats(currentDoc, statsPanel);
        status.innerText = "Normal view";
        isDiffView = false;
        return;
    }

    const diff = buildDiff(
        currentDoc.originalText,
        currentDoc.transformedText
    );

    renderDiff(diff, logArea);

    status.innerText = "Diff view";
    isDiffView = true;
};

// --------------------
// RESTORE SESSION
// --------------------
window.restoreLast = function () {
    const doc = getLatest();
    if (!doc) return;

    currentDoc = doc;
    isDiffView = false;

    renderLog(doc, logArea);
    renderStats(doc, statsPanel);

    status.innerText = "Restored session";
};

// --------------------
// MOBILE MENU
// --------------------
window.toggleMenu = function () {
    document.getElementById("mobileMenu").classList.toggle("open");
};