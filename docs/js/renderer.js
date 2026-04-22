// js/renderer.js

export function renderLog(doc, container) {
    container.innerHTML = "";

    doc.lines.forEach(line => {
        const div = document.createElement("div");
        div.textContent = line.text;

        if (line.level) {
            div.className = line.level;
        }

        container.appendChild(div);
    });
}

// js/renderer.js (ADD FUNCTION)

export function renderStats(doc, container) {
    const s = doc.stats;

    container.innerHTML = `
        <div>Chars: ${s.after.chars} (was ${s.before.chars})</div>
        <div>Lines: ${s.after.lines} (was ${s.before.lines})</div>
        <div>Tokens: ${s.after.tokens} (was ${s.before.tokens})</div>
        <div>Reduction: ${s.reductionPercent}%</div>
    `;
}

export function filterLines(doc, query) {
    if (!query) return doc.lines;

    return doc.lines.map(line => ({
        ...line,
        hidden: !line.text.toLowerCase().includes(query.toLowerCase())
    }));
}

// js/renderer.js (EXTENSION)

export function renderLog(doc, container) {
    container.innerHTML = "";

    doc.lines.forEach(line => {
        const div = document.createElement("div");

        div.textContent = line.text;

        if (line.level) div.classList.add(line.level);
        if (line.match) div.classList.add("HIGHLIGHT");

        if (line.hidden) {
            div.style.display = "none";
        }

        container.appendChild(div);
    });
}

export function renderDiff(diff, container) {
    container.innerHTML = "";

    diff.forEach(d => {
        const div = document.createElement("div");

        if (d.type === "removed") div.className = "DIFF-REMOVED";
        if (d.type === "added") div.className = "DIFF-ADDED";
        if (d.type === "changed") div.className = "DIFF-CHANGED";

        div.textContent = `${d.original || ""} → ${d.transformed || ""}`;

        container.appendChild(div);
    });
}
