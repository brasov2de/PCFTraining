/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams } from './types';
import { IconToggle } from '../Components/IconToggle';

export const cellRendererOverrides= {
    ["TwoOptions"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {     
        const column = rendererParams.colDefs[rendererParams.columnIndex];                         
        if(column.name==="diana_ishappy"){                      
            const onCellClicked = () => {
                if(props.startEditing) props.startEditing();                  
            } 
        return (<IconToggle 
            iconOn="Emoji2" iconOff="Sad" colorOn="green" colorOff="red" 
            labelOn={(column as any).customizerParams.labels.onText} 
            labelOff={(column as any).customizerParams.labels.offText}
            value={props.value===true} 
            onChange={onCellClicked}
            ></IconToggle>);        
        }
      }
}