/* eslint-disable react/display-name */
import * as React from 'react';
import { DetailsList } from '@fluentui/react/lib/DetailsList';
import { IconToggle } from './Components/IconToggle';

type DataSet = ComponentFramework.PropertyTypes.DataSet;

export interface IHappynatorGridProps {
  dataset: DataSet;
  isCanvas : boolean;
}
export const HappynatorGridComponent = React.memo(({dataset, isCanvas}: IHappynatorGridProps) : JSX.Element => {

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
          if(isCanvas){
            record.setValue(column.name, {Id: value === true ? true : false});
          }
          else{
            record.setValue(column.name, value);          
          }
          record.save();
        }}               
        />

      } : undefined     
    };
  });

  const [items, setItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    const newItems = dataset.sortedRecordIds.map((id) => {
      const record = dataset.records[id];
      const attributes = dataset.columns.map((column) => {
        return {                    
          [column.name]: record.getFormattedValue(column.name)
        }
      });

      return Object.assign({}, ...attributes,
        {key: record.getRecordId(),
        raw: record        
        });
    });    
    setItems(newItems);
  }, [dataset]);


  return (<DetailsList 
    items={items}
    columns={columns}
  />);
});
