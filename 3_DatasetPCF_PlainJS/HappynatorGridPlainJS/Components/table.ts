
type DataSet = ComponentFramework.PropertyTypes.DataSet;


export function renderTableHeader(table: HTMLTableElement, columnDisplayNames : string[] ): void {
    if(table.lastChild) {
        table.removeChild(table.lastChild);
    }
    else{
        let thead = table.createTHead();
        let row = thead.insertRow(0);   
        row.appendChild(document.createElement("th"));
        columnDisplayNames.forEach((displayName, index) => {
            let th = document.createElement("th");
            let text = document.createTextNode(displayName);
            th.appendChild(text);
            row.appendChild(th);
        });
        table.appendChild(thead);    
    }
}


export function getSortedColumnsOnView(columns: ComponentFramework.PropertyHelper.DataSetApi.Column[]): ComponentFramework.PropertyHelper.DataSetApi.Column[] {    
    const columns1 = columns.filter((columnItem) => {
            // some column are supplementary and their order is not > 0
            return columnItem.order >= 0;            
        });

    // Sort those columns so that they will be rendered in order
    return columns1.sort((a, b) => {
        return a.order - b.order;
    });
}