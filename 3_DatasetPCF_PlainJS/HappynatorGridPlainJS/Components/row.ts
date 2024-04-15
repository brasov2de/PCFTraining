

type DataSet = ComponentFramework.PropertyTypes.DataSet;


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

export interface IRowParams {
    id: string;
    tbody : HTMLTableSectionElement; 
    index: number; 
    isSelected: boolean;
    onSelectRow?: (ids:string[]) => void; 
    onDblClick?: () => void;
}

export function renderRow({id, tbody, index, isSelected, onSelectRow, onDblClick}: IRowParams): HTMLTableRowElement {
    let row = tbody.insertRow(index);       
    if(isSelected) {
        row.classList.add("selected");
    }
    
    
    row.onclick = () => {
        if(onSelectRow) onSelectRow(isSelected ? [] : [id]);
    
    };     
    row.ondblclick = () => { if(onDblClick) onDblClick() };   
    renderRowSelector(row,  isSelected  , (selected) => {
        if(onSelectRow) onSelectRow(isSelected ? [] : [id]);
    });
    return row;
}
