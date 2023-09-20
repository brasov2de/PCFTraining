type DataSet = ComponentFramework.PropertyTypes.DataSet;


export function parseItems(dataset: DataSet): any[]{
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