import * as React from 'react';
import { debounce } from 'lodash';
import { Input, InputOnChangeData, InputProps } from '@fluentui/react-components';

export interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {    
    const handleChange : InputProps["onChange"] = debounce((event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        console.log("TextInput handleChange");
        onChange(data.value);
    }, 500);

    return (
        <Input type="text" defaultValue={value} onChange={handleChange} />
    );
};

export default TextInput;