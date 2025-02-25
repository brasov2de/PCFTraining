import * as React from 'react';
import {FluentProvider, Input, Theme, makeStyles} from '@fluentui/react-components';
import { PersonRegular, MicRegular } from "@fluentui/react-icons";


export interface IHelloWorldProps {
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

export const HelloWorld: React.FC<IHelloWorldProps> = ({ name, isDisabled, theme, isCanvasApp }) => {
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
        <Input
          value={name}          
          appearance='filled-darker'
          className={styles.root}
          readOnly={isDisabled}
          disabled={isDisabled && isCanvasApp===true}
        />
    </FluentProvider>
    );
  
};



