
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
