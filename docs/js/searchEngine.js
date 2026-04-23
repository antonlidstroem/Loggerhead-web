export function searchLines(lines, query) {
    if (!query) {
        return lines.map(l => ({ ...l, match: false }));
    }

    const q = query.toLowerCase();

    return lines.map(line => {
        const match = line.text.toLowerCase().includes(q);

        return {
            ...line,
            match
        };
    });
}