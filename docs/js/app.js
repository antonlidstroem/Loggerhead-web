import { processLog } from "./logEngine.js";
import { renderLog, renderStats, renderDiff } from "./renderer.js";
import { copyText, exportJSON } from "./exportService.js";
import { saveSession, getLatest } from "./storage.js";
import { buildDiff } from "./diffEngine.js";
import { searchLines } from "./searchEngine.js";

const logArea = document.getElementById("log-area");
const status = document.getElementById("status");
const statsPanel = document.getElementById("statsPanel");
const profileSelect = document.getElementById("profileSelect");
const fileInput = document.getElementById("fileInput");

window.fileInput = fileInput;

let currentDoc = null;
let isDiffView = false;

// 🔥 CRITICAL: expose EVERYTHING USED IN HTML
window.pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    logArea.innerText = text;
    status.innerText = "Pasted";
};

window.clearScreen = () => {
    logArea.innerHTML = "";
    statsPanel.innerHTML = "";
    currentDoc = null;
    status.innerText = "Cleared";
};

window.washLog = () => {
    const input = logArea.innerText.trim();
    if (!input) return;

    currentDoc = processLog(input, profileSelect.value);
    isDiffView = false;

    renderLog(currentDoc, logArea);
    renderStats(currentDoc, statsPanel);

    saveSession(currentDoc);

    status.innerText = `Washed (-${currentDoc.stats.reductionPercent}%)`;
};

window.copyClean = () => {
    if (!currentDoc) return;
    copyText(currentDoc.transformedText);
    status.innerText = "Copied clean";
};

window.copyOriginal = () => {
    if (!currentDoc) return;
    copyText(currentDoc.originalText);
    status.innerText = "Copied original";
};

window.exportJSONFile = () => {
    if (!currentDoc) return;
    exportJSON("log.json", currentDoc);
};

window.toggleDiff = () => {
    if (!currentDoc) return;

    if (isDiffView) {
        renderLog(currentDoc, logArea);
        isDiffView = false;
        status.innerText = "Normal";
        return;
    }

    const diff = buildDiff(currentDoc.originalText, currentDoc.transformedText);
    renderDiff(diff, logArea);

    isDiffView = true;
    status.innerText = "Diff";
};

window.restoreLast = () => {
    const doc = getLatest();
    if (!doc) return;

    currentDoc = doc;
    renderLog(doc, logArea);
    renderStats(doc, statsPanel);

    status.innerText = "Restored";
};

window.searchLog = (q) => {
    if (!currentDoc) return;

    const lines = searchLines(currentDoc.lines, q);
    renderLog({ ...currentDoc, lines }, logArea);
};

window.toggleMenu = () => {
    document.getElementById("mobileMenu").classList.toggle("open");
};

// file load
fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    const text = await file.text();

    logArea.innerText = text;
    status.innerText = "Loaded";
});