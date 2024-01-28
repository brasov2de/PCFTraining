type DataSet = ComponentFramework.PropertyTypes.DataSet;

export type TItem={
    key: string,
    raw: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord,
    [key: string]: any
}

export function parseItems(dataset: DataSet): TItem[]{
    return dataset.sortedRecordIds.map((id) => {
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
}