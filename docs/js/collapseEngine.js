export function collapseLines(lines) {
    const result = [];

    let prev = null;

    for (const line of lines) {
        if (prev && prev.text === line.text) {
            prev.count++;
        } else {
            prev = { ...line, count: 1 };
            result.push(prev);
        }
    }

    return result;
}