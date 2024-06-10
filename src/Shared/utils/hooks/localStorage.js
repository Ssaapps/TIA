import { useState } from 'react';

const useLocalStorage = (key) => {
    const storedValue = localStorage?.getItem(key) ? JSON.parse(localStorage?.getItem(key)) : null
    const [value, setValue] = useState(storedValue);
    const setStoredValue = (newValue) => {
        if (newValue === undefined) {
            localStorage.removeItem(key);
            setValue(undefined);
            return;
        }
        const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
        setValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
    };
    return [value, setStoredValue];
};

export default useLocalStorage;
