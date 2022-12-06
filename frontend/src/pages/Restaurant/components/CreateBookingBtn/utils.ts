
/**
 * @returns Current time in HH:MM
 */

export const getCurrentTime = () => {
    const date = new Date();
    const hours = addZero(date.getHours());
    const Minutes = addZero(date.getMinutes());
    return hours + ':' + Minutes
}

/**
 * @returns Current date in YYYY-MM-DD
 */

export const getCurrentDate = () => {
    let date = new Date()
    return date.toISOString().split('T')[0]
}

function addZero(i: number | string) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}