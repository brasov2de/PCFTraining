import { Icon } from '@fluentui/react/lib/components/Icon';
import * as React from 'react';
import { CellEditorOverrides, CellEditorProps, GetEditorParams } from './types';
import { IconToggle } from '../Components/IconToggle';


export  const cellEditorOverrides: CellEditorOverrides = {
   
    ["TwoOptions"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {     
      const column = rendererParams.colDefs[rendererParams.columnIndex];             
      if(column.name==="diana_ishappy"){        
        const value  = defaultProps.value as string === "1" ? false : true;      
        rendererParams.onCellValueChanged(value===true ? "1" : "0"); //autochange value on click
        const onChange=() =>{          
          rendererParams.onCellValueChanged(value ? "0" : "1");      
          rendererParams.stopEditing(false);
        }
        return (<IconToggle 
            iconOn="Emoji2" iconOff="Sad" colorOn="green" colorOff="red" 
            labelOn={(column as any).customizerParams.labels.onText} 
            labelOff={(column as any).customizerParams.labels.offText}
            value={defaultProps.value===true} 
            onChange={onChange}
            ></IconToggle>)
    }
  }
}
 


