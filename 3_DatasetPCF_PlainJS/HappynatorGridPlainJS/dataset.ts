
type DataSet = ComponentFramework.PropertyTypes.DataSet;
// eslint-disable-next-line no-undef
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;

function getSortedColumnsOnView(columns: DataSetInterfaces.Column[]): DataSetInterfaces.Column[] {    
    const columns1 = columns
        .filter((columnItem: DataSetInterfaces.Column) => {
            // some column are supplementary and their order is not > 0
            return columnItem.order >= 0;            
        });

    // Sort those columns so that they will be rendered in order
    return columns1.sort((a: DataSetInterfaces.Column, b: DataSetInterfaces.Column) => {
        return a.order - b.order;
    });
}

export interface IIconToggleProps {
    iconOn: string;
    iconOff: string;
    colorOn: string;
    colorOff: string;
    labelOn : string;
    labelOff : string;
    value: boolean | undefined;
    onChange ?: (value: boolean | undefined) => void;
}

function renderHappyCell(parent: HTMLTableCellElement, {iconOn, iconOff, colorOn, colorOff, labelOn, labelOff, value, onChange} : IIconToggleProps ): void {  
    const icon = document.createElement("i");
    icon.setAttribute("data-icon-name", value ? "CheckMark" : "Cancel");
    parent.appendChild(icon);        
    let label = document.createElement("span");
    label.innerHTML = value ? `${iconOn} ${labelOn}` : `${iconOff} ${labelOff}`;
    label.style.cursor = "pointer";
    label.style.color = value ? colorOn : colorOff;
    label.onclick = (ev: MouseEvent) => {
        ev.stopPropagation();
        if(onChange) onChange(!value);
    }
    parent.appendChild(label);    
}

function renderRowSelector(row: HTMLTableRowElement, checked: boolean, onClick : (selected: boolean)=>void): void {
    let cell = row.insertCell(0);   
    let checkbox =  document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.onclick = ( ev: MouseEvent) => {
        ev.stopPropagation();
        onClick((ev.target as HTMLInputElement).checked);
    }
    cell.appendChild(checkbox);    
}

//<i data-icon-name="Cancel" aria-hidden="true" class="root-219" style="color: rgb(192, 57, 43);"></i>

function renderTableHeader(table: HTMLTableElement, columnDisplayNames : string[] ): void {
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

export function renderGrid(table: HTMLTableElement, dataset: DataSet): void {
    
    if(dataset.loading) return;
    const sortedColumns = getSortedColumnsOnView(dataset.columns);
    if(table.lastChild) {
        table.removeChild(table.lastChild);
    }
    else{
       renderTableHeader(table, sortedColumns.map(c => c.displayName));
    }

    
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
            if(column.alias === "happyProperty") {
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