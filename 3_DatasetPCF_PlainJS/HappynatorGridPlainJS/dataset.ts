
type DataSet = ComponentFramework.PropertyTypes.DataSet;
import { getSortedColumnsOnView, renderHappyCell, renderRowSelector, renderTableHeader } from "./Components/helper";


export function renderGrid(table: HTMLTableElement, dataset: DataSet): void {        
    if(dataset.loading) return;
    const sortedColumns = getSortedColumnsOnView(dataset.columns);   
    renderTableHeader(table, sortedColumns.map(c => c.displayName));

    
    const selectedRecordIds = dataset.getSelectedRecordIds() ?? [];
    const tbody = table.createTBody();

    dataset.sortedRecordIds.forEach((id, i) => {
        let row = tbody.insertRow(i);
        const record = dataset.records[id];
        const isSelected = selectedRecordIds.includes(id);
        if(isSelected) {
            row.classList.add("selected");
        }

        row.onclick = () => {           
            dataset.setSelectedRecordIds(isSelected ? [] : [id]);
        }   
        row.ondblclick = (ev) => {
            dataset.openDatasetItem(record.getNamedReference());
        }     
        renderRowSelector(row,  isSelected  , (selected) => {
           dataset.setSelectedRecordIds(isSelected ? [] : [id]);
        });
        sortedColumns.forEach((column, j) => {
            let cell = row.insertCell(j + 1);
            cell.style.width = column.visualSizeFactor < 10 ? "100px" : column.visualSizeFactor + "px";
            if(column.alias === "happyProperty" || column.name === "diana_ishappy") {
                renderHappyCell(cell, {
                    iconOn: "😍",
                    iconOff: "🙁",
                    colorOn: "green",
                    colorOff: "red",
                    labelOn: "Happy",
                    labelOff: "Sad",
                    value: (record.getValue(column.name) as boolean ) == true || (record.getValue(column.name) as any ) == "1",
                    onChange: (value) => {
                        (record as any).setValue(column.name, value);
                        (record as any).save().catch(console.error);
                    }
                });
            }
            else{
                let text = document.createTextNode(record.getFormattedValue(column.name));
                cell.appendChild(text);
            }
        });        
    });
    table.appendChild(tbody);

}