import { washProfiles } from "./washProfiles.js";
import { calculateStats, compareStats } from "./statsEngine.js";
import { collapseLines } from "./collapseEngine.js";

export function processLog(inputText, profileName = "default") {
    const profile = washProfiles[profileName] || washProfiles.default;

    const statsBefore = calculateStats(inputText);

    let transformed = inputText;

    for (const rule of profile.rules) {
        if (rule.type === "replace") {
            transformed = transformed.replace(rule.pattern, rule.replacement);
        }
    }

    const statsAfter = calculateStats(transformed);
    const comparison = compareStats(statsBefore, statsAfter);

    const rawLines = transformed.split("\n").map(line => ({
        text: line,
        level: classifyLine(line)
    }));

    const lines = collapseLines(rawLines);

    return {
        originalText: inputText,
        transformedText: transformed,
        lines,
        stats: comparison,
        profileUsed: profile.name
    };
}

function classifyLine(line) {
    const upper = line.toUpperCase();

    if (["ERROR", "FAIL", "TRACEBACK", "500", "429"].some(x => upper.includes(x)))
        return "ERROR";

    if (["WARNING", "VIOLATES", "INTERVENTION"].some(x => upper.includes(x)))
        return "WARNING";

    if (["INFO", "FETCH", "XHR"].some(x => upper.includes(x)))
        return "INFO";

    if (line.includes("---"))
        return "SYSTEM";

    return "NONE";
}