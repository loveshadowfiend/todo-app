export const formatTime = (date: Date): string => {
    const now = new Date();
    // in seconds
    const diff = Math.round((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) {
        return "только что";
    } else if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        return `${minutes} ${pluralize(minutes, ["минуту", "минуты", "минут"])} назад`;
    } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return `${hours} ${pluralize(hours, ["час", "часа", "часов"])} назад`;
    } else {
        return date.toLocaleString();
    }
};

const pluralize = (count: number, words: string[]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return words[
        count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ];
};
