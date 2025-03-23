export function formatDate(date: Date, format: string): string {
    const map: Record<string, string> = {
        // Year
        y: date.getFullYear().toString().slice(-2),
        Y: date.getFullYear().toString(),
        // Month
        m: (date.getMonth() + 1).toString().padStart(2, '0'),
        // Day
        d: date.getDate().toString().padStart(2, '0'),
        // Hour (24h)
        H: date.getHours().toString().padStart(2, '0'),
        // Hour (12h)
        h: (date.getHours() % 12 || 12).toString().padStart(2, '0'),
        // Minutes
        i: date.getMinutes().toString().padStart(2, '0'),
        // Seconds
        s: date.getSeconds().toString().padStart(2, '0'),
        // AM/PM
        A: date.getHours() >= 12 ? 'PM' : 'AM'
    };

    return format.replace(/y|Y|m|d|H|h|i|s|A/g, (match) => map[match] || match);
}
