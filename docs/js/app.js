import { processLog } from "./logEngine.js";
import { renderLog, renderStats } from "./renderer.js";
import { copyText, downloadText, exportJSON } from "./exportService.js";
import { saveSession } from "./storage.js";

const logArea = document.getElementById("log-area");
const status = document.getElementById("status");
const statsPanel = document.getElementById("statsPanel");
const profileSelect = document.getElementById("profileSelect");

let currentDoc = null;

// WASH
window.washLog = function () {
    const input = logArea.innerText.trim();
    if (!input) return;

    currentDoc = processLog(input, profileSelect.value);

    renderLog(currentDoc, logArea);
    renderStats(currentDoc, statsPanel);

    saveSession(currentDoc);

    status.innerText =
        `Washed (-${currentDoc.stats.reductionPercent}%)`;
};

// COPY CLEAN
window.copyClean = function () {
    if (!currentDoc) return;
    copyText(currentDoc.transformedText);
    status.innerText = "Copied cleaned log";
};

// COPY ORIGINAL
window.copyOriginal = function () {
    if (!currentDoc) return;
    copyText(currentDoc.originalText);
    status.innerText = "Copied original log";
};

// EXPORT JSON
window.exportJSONFile = function () {
    if (!currentDoc) return;
    exportJSON("log.json", currentDoc);
    status.innerText = "Exported JSON";
};

import { processLog } from "./logEngine.js";
import { renderLog, renderDiff } from "./renderer.js";
import { buildDiff } from "./diffEngine.js";
import { searchLines } from "./searchEngine.js";

let currentDoc = null;

window.searchLog = function (query) {
    if (!currentDoc) return;

    currentDoc.lines = searchLines(currentDoc.lines, query);
    renderLog(currentDoc, logArea);
};

window.toggleDiff = function () {
    if (!currentDoc) return;

    const diff = buildDiff(
        currentDoc.originalText,
        currentDoc.transformedText
    );

    renderDiff(diff, logArea);
};
