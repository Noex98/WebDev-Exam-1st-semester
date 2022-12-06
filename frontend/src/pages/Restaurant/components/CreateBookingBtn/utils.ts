
/**
 * @returns Current time in HH:MM
 */

export const getCurrentTime = () => {
    const date = new Date();
    return date.toLocaleTimeString().slice(0, -6);
}

/**
 * @returns Current date in YYYY-MM-DD
 */

export const getCurrentDate = () => {
    let date = new Date()
    return date.toISOString().split('T')[0]
}