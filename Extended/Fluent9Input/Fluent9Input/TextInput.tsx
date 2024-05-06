import * as React from 'react';
import { FluentProvider, Input, InputOnChangeData, InputProps, Theme } from '@fluentui/react-components';

export interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    theme ?: Theme;
}

export const useDebounce = (value: string, delay: number) => {
    
    const [debouncedValue, setDebouncedValue] = React.useState(value);
  
    React.useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {clearTimeout(handler);};
    }, [value, delay]);
  
    return debouncedValue;
  };

export const TextInput: React.FC<TextInputProps> = ({ value, onChange, theme }) => {    
    const [val, setVal] = React.useState<string>(value);
    const debouncedValue = useDebounce(val, 500);
    //using lodash debounce to delay the onChange event until the user stopps typing
    
    const handleChange : InputProps["onChange"] = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        console.log("TextInput handleChange");
        setVal(data.value);
    }

    React.useEffect(() => {        
        onChange(debouncedValue);
    }, [debouncedValue]);

    React.useEffect(() => {
        setVal(value);
    }, [value]);

    
    return (        
        <FluentProvider theme={theme}>
        <Input type="text" value={val} onChange={handleChange} />        
        </FluentProvider>
    );
};

export default TextInput;