// js/diffEngine.js

export function buildDiff(original, transformed) {
    const origLines = original.split("\n");
    const newLines = transformed.split("\n");

    const max = Math.max(origLines.length, newLines.length);

    const diff = [];

    for (let i = 0; i < max; i++) {
        const a = origLines[i];
        const b = newLines[i];

        diff.push({
            original: a,
            transformed: b,
            type: getDiffType(a, b)
        });
    }

    return diff;
}

function getDiffType(a, b) {
    if (a && !b) return "removed";
    if (!a && b) return "added";
    if (a !== b) return "changed";
    return "same";
}
