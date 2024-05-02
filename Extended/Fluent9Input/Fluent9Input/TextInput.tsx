import * as React from 'react';
import { debounce } from 'lodash';
import { FluentProvider, Input, InputOnChangeData, InputProps, Theme } from '@fluentui/react-components';

export interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    theme ?: Theme;
}

export const TextInput: React.FC<TextInputProps> = ({ value, onChange, theme }) => {    
    //using lodash debounce to delay the onChange event until the user stopps typing
    const handleChange : InputProps["onChange"] = debounce((event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        console.log("TextInput handleChange");
        onChange(data.value);
    }, 500);

    return (        
        <FluentProvider theme={theme}>
        <Input type="text" defaultValue={value} onChange={handleChange} />        
        </FluentProvider>
    );
};

export default TextInput;