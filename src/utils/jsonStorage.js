export function loadData(key, defaultData) {
  if (typeof window !== 'undefined') {
    const raw = window.localStorage.getItem(key);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (error) {
        console.warn('Failed to parse persisted JSON:', error);
      }
    }
  }
  return defaultData;
}

export function saveData(key, data) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
}
