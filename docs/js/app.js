import { processLog } from "./logEngine.js";
import { renderLog, renderStats, renderDiff } from "./renderer.js";
import { copyText, exportJSON } from "./exportService.js";
import { saveSession, getLatest } from "./storage.js";
import { buildDiff } from "./diffEngine.js";
import { searchLines } from "./searchEngine.js";

// DOM
const logArea = document.getElementById("log-area");
const status = document.getElementById("status");
const statsPanel = document.getElementById("statsPanel");
const profileSelect = document.getElementById("profileSelect");
const fileInput = document.getElementById("fileInput");

// expose
window.fileInput = fileInput;

let currentDoc = null;
let isDiffView = false;

let matches = [];
let matchIndex = 0;

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
    statsPanel.innerHTML = "";
    currentDoc = null;
    isDiffView = false;
    status.innerText = "Cleared";
};

// WASH
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

// COPY
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

// EXPORT
window.exportJSONFile = function () {
    if (!currentDoc) return;
    exportJSON("log.json", currentDoc);
    status.innerText = "Exported JSON";
};

// SEARCH
window.searchLog = function (query) {
    if (!currentDoc || isDiffView) return;

    const resultLines = searchLines(currentDoc.lines, query);

    matches = resultLines
        .map((l, i) => l.match ? i : -1)
        .filter(i => i !== -1);

    matchIndex = 0;

    renderLog({ ...currentDoc, lines: resultLines }, logArea);

    status.innerText = `${matches.length} matches`;
};

window.nextMatch = function () {
    if (!matches.length) return;

    matchIndex = (matchIndex + 1) % matches.length;
    scrollToMatch();
};

window.prevMatch = function () {
    if (!matches.length) return;

    matchIndex = (matchIndex - 1 + matches.length) % matches.length;
    scrollToMatch();
};

function scrollToMatch() {
    const el = logArea.children[matches[matchIndex]];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
}

// DIFF
window.toggleDiff = function () {
    if (!currentDoc) return;

    if (isDiffView) {
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

// RESTORE
window.restoreLast = function () {
    const doc = getLatest();
    if (!doc) return;

    currentDoc = doc;
    isDiffView = false;

    renderLog(doc, logArea);
    renderStats(doc, statsPanel);

    status.innerText = "Restored session";
};

// MOBILE MENU
window.toggleMenu = function () {
    document.getElementById("mobileMenu").classList.toggle("open");
};