// js/statsEngine.js

export function calculateStats(text) {
    const chars = text.length;
    const lines = text.split("\n").length;

    // very simple token estimate (can upgrade later to tiktoken-like)
    const tokens = text
        .split(/\s+/)
        .filter(Boolean).length;

    return {
        chars,
        lines,
        tokens
    };
}

export function compareStats(before, after) {
    const reduction = before.chars
        ? Math.round(((before.chars - after.chars) / before.chars) * 100)
        : 0;

    return {
        before,
        after,
        reductionPercent: reduction
    };
}
