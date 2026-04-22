// js/storage.js

const KEY = "loggerhead_history";

export function saveSession(doc) {
    const history = getHistory();

    history.unshift({
        timestamp: Date.now(),
        doc
    });

    localStorage.setItem(KEY, JSON.stringify(history.slice(0, 10)));
}

export function getHistory() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function getLatest() {
    const history = getHistory();
    return history[0]?.doc || null;
}
