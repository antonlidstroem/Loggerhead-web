export function renderLog(doc, container) {
    container.innerHTML = "";

    doc.lines.forEach(line => {
        const div = document.createElement("div");

        div.textContent = line.text;

        if (line.level) div.classList.add(line.level);
        if (line.match) div.classList.add("HIGHLIGHT");

        if (line.count > 1) {
            const badge = document.createElement("span");
            badge.textContent = ` x${line.count}`;
            badge.style.opacity = "0.6";
            badge.style.marginLeft = "6px";
            div.appendChild(badge);
        }

        container.appendChild(div);
    });
}

export function renderStats(doc, container) {
    const s = doc.stats;

    container.innerHTML = `
        <div>Chars: ${s.after.chars} (was ${s.before.chars})</div>
        <div>Lines: ${s.after.lines} (was ${s.before.lines})</div>
        <div>Tokens: ${s.after.tokens} (was ${s.before.tokens})</div>
        <div>Reduction: ${s.reductionPercent}%</div>
    `;
}

export function renderDiff(diff, container) {
    container.innerHTML = "";

    diff.forEach(d => {
        const row = document.createElement("div");
        row.className = "diff-row";

        const left = document.createElement("div");
        const right = document.createElement("div");

        left.textContent = d.original || "";
        right.textContent = d.transformed || "";

        left.className = "diff-left";
        right.className = "diff-right";

        if (d.type === "removed") left.classList.add("DIFF-REMOVED");
        if (d.type === "added") right.classList.add("DIFF-ADDED");
        if (d.type === "changed") {
            left.classList.add("DIFF-REMOVED");
            right.classList.add("DIFF-ADDED");
        }

        row.appendChild(left);
        row.appendChild(right);

        container.appendChild(row);
    });
}