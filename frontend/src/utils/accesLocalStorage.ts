export const accesLocalStorage = (key: string) => {
    const localData = localStorage.getItem(key);
    return localData ? JSON.parse(localData) : null;
}