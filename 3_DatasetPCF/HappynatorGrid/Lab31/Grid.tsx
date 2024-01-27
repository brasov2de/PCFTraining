/* eslint-disable react/display-name */
import * as React from 'react';
import { DetailsList } from '@fluentui/react/lib/DetailsList';
import { IconToggle } from './Components/IconToggle';
import { parseItems } from './Components/Utils';

type DataSet = ComponentFramework.PropertyTypes.DataSet;

export interface IGridProps {
  dataset: DataSet;  
}

const GridInternal = ({dataset}: IGridProps) : JSX.Element => {

  const columns = dataset.columns.sort((column1, column2) => column1.order - column2.order).map((column) => {
    const isHappyColumn = column.alias === 'happyProperty';
    return {
      key: column.name,
      name: column.displayName,
      fieldName: column.name,
      minWidth: column.visualSizeFactor < 10 ? 100 : column.visualSizeFactor , 
      onRender : isHappyColumn ? (item: any) => {
        return <IconToggle 
        colorOn='green'
        colorOff='red'
        iconOn='Emoji2'
        iconOff='Sad'
        labelOn='Happy'
        labelOff='Sad'
        value={item.raw.getValue(column.name)==true || item.raw.getValue(column.name)=="1" }   
        onChange={(value) =>{
          const record = item.raw;
          record.setValue(column.name , value);
          record.save();
        }}               
        />

      } : undefined     
    };
  });

  const [items, setItems] = React.useState<any[]>([]);
    React.useEffect(() => {
        setItems(parseItems(dataset));
    }, [dataset]);


  return (<DetailsList 
    items={items}
    columns={columns}
  />);
};

export const Grid = React.memo(GridInternal);
