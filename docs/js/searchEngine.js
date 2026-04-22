// js/searchEngine.js

export function searchLines(lines, query) {
    if (!query) return lines;

    const q = query.toLowerCase();

    return lines.map(line => {
        const match = line.text.toLowerCase().includes(q);

        return {
            ...line,
            match,
            hidden: false // we highlight instead of hiding by default
        };
    });
}

export function regexSearch(lines, regexStr) {
    let regex;

    try {
        regex = new RegExp(regexStr, "gi");
    } catch {
        return lines;
    }

    return lines.map(line => ({
        ...line,
        match: regex.test(line.text)
    }));
}
