import * as React from 'react';
import { DetailsList, IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { TItem, parseItems } from './Components/Utils';
import { IconToggle } from './Components/IconToggle';
import { useSelection } from './Components/useSelection';

export interface IGridProps {
  dataset : ComponentFramework.PropertyTypes.DataSet;
}

const GridInternal = ({dataset}: IGridProps) => {  
  const [items, setItems] = React.useState<TItem[]>([]);
  const [columns, setColumns] = React.useState<IColumn[]>([]);
  const {selection, selectedCount, onItemInvoked} = useSelection(dataset);

  React.useEffect(() => {
    setItems(parseItems(dataset));
    setColumns(dataset.columns.sort((a,b) => a.order - b.order).map((column) => {
      const isHappyColumn = column.alias === 'happyProperty';
      return {
        key: column.name,
        name: column.displayName,
        fieldName: column.name,
        minWidth: column.visualSizeFactor < 10 ? 100 : column.visualSizeFactor,
        onRender: isHappyColumn ?  (item: TItem) => {
          return <IconToggle 
          iconOn="Emoji2"
          iconOff="Sad"
          colorOn="green" 
          colorOff="red"
          labelOn="Happy"
          labelOff="Sad"
          value={item.raw.getValue(column.name) == true || item.raw.getValue(column.name) == "1"}
          onChange={(value) => {
            const record = item.raw;
            (record as any).setValue(column.name, value);
            //for custom Page: (record as any).setValue(column.name, {Id: value})
            (record as any).save();

          }}
           />
        } : undefined
      }
    }));
  },[dataset]);

  return (
   <DetailsList   
    items={items}
    columns={columns}    
    selection={selection}
 //   selectionMode={SelectionMode.multiple}
    onItemInvoked={onItemInvoked}
   />
  );
}

export const Grid = React.memo(GridInternal);

