import { Icon } from '@fluentui/react/lib/components/Icon';
import * as React from 'react';
import { CellEditorOverrides, CellEditorProps, GetEditorParams } from '../Components/types';
import { IconToggle } from '../Components/IconToggle';


export  const cellEditorOverrides: CellEditorOverrides = {
   
    ["TwoOptions"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {     
      const column = rendererParams.colDefs[rendererParams.columnIndex];             
      if(column.name==="diana_ishappy"){                  
        const onChange=(value ?: boolean) =>{          
          rendererParams.onCellValueChanged(!value);      
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
 


