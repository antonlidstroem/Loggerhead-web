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
