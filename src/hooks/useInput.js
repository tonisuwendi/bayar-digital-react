import { useState } from 'react';

const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);

    const handleSetValue = (event) => {
        const { value: inputValue } = event.target;
        setValue(inputValue);
    };

    return [value, handleSetValue];
};

export default useInput;
