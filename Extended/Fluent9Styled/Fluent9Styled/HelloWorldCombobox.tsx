import * as React from 'react';
import {Combobox, Option, FluentProvider, Input, Theme, makeStyles} from '@fluentui/react-components';



export interface IHelloWorldComboboxProps {
  name?: string;
  isDisabled: boolean, 
  theme ?: Theme
  isCanvasApp?: boolean
}

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
})

export const HelloWorldCombobox: React.FC<IHelloWorldComboboxProps> = ({ name, isDisabled, theme, isCanvasApp }) => {
  const styles = useStyles();

  const myTheme = isDisabled && isCanvasApp===false
    ? {...theme, 
      colorCompoundBrandStroke: theme?.colorNeutralStroke1,
      colorCompoundBrandStrokeHover: theme?.colorNeutralStroke1Hover,
      colorCompoundBrandStrokePressed: theme?.colorNeutralStroke1Pressed,
      colorCompoundBrandStrokeSelected: theme?.colorNeutralStroke1Selected,
    }
    : theme
  return (    
    <FluentProvider theme={myTheme} className={styles.root} >
      {!isDisabled || isCanvasApp === true
        ? <Combobox
            //value={name}          
            appearance='filled-darker'
            className={styles.root}
            readOnly={isDisabled}
            disabled={isDisabled && isCanvasApp===true}          
          >          
            <Option >Test</Option>        
          </Combobox>
      : <Input
          value={name}          
          appearance='filled-darker'
          className={styles.root}
          readOnly={isDisabled}        
        />  
      }
        
    </FluentProvider>
    );
  
};

/*

<Input
          value={name}          
          appearance='filled-darker'
          className={styles.root}
          readOnly={isDisabled}
          disabled={isDisabled && isCanvasApp===true}
        />
        */
