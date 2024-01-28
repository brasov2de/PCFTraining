import * as React from 'react';
import { DetailsList, IColumn } from '@fluentui/react/lib/DetailsList';
import { TItem, parseItems } from './Components/Utils';
import { IconToggle } from './Components/IconToggle';

export interface IGridProps {
  dataset : ComponentFramework.PropertyTypes.DataSet;
}

const GridInternal = ({dataset}: IGridProps) => {  
  const [items, setItems] = React.useState<TItem[]>([]);
  const [columns, setColumns] = React.useState<IColumn[]>([]);

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
           />
        } : undefined
      }
    }));
  },[dataset]);

  return (
   <DetailsList   
    items={items}
    columns={columns}
   />
  );
}

export const Grid = React.memo(GridInternal);

