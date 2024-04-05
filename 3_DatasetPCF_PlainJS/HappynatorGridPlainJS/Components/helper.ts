

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

export function renderRowSelector(row: HTMLTableRowElement, checked: boolean, onClick : (selected: boolean)=>void): void {
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

export function renderHappyCell(parent: HTMLTableCellElement, {iconOn, iconOff, colorOn, colorOff, labelOn, labelOff, value, onChange} : IIconToggleProps ): void {  
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