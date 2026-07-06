import { useEffect, useState } from 'react';
import { loadData, saveData } from '../utils/jsonStorage';

function normalizeData(savedValue, fallbackValue) {
  if (Array.isArray(fallbackValue)) {
    return Array.isArray(savedValue) ? savedValue : fallbackValue;
  }

  if (fallbackValue && typeof fallbackValue === 'object') {
    if (!savedValue || typeof savedValue !== 'object' || Array.isArray(savedValue)) {
      return fallbackValue;
    }

    return Object.keys(fallbackValue).reduce((acc, key) => {
      acc[key] = normalizeData(savedValue[key], fallbackValue[key]);
      return acc;
    }, {});
  }

  return savedValue ?? fallbackValue;
}

export default function useJsonData(key, defaultData) {
  const [items, setItems] = useState(() => normalizeData(undefined, defaultData));

  useEffect(() => {
    const saved = loadData(key, defaultData);
    setItems(normalizeData(saved, defaultData));
  }, [key, defaultData]);

  useEffect(() => {
    saveData(key, items);
  }, [key, items]);

  return [items, setItems];
}
