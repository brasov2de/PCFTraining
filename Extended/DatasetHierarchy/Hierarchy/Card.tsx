import * as React from 'react';
import {Icon} from "@fluentui/react/lib/Icon"

interface ICardProps {
    id: string;
    entityName: string;
    title: string;
    subtitle: string;
    icon?: string;
    backgroundColor?: string;
    color?: string;
    width?:number;
    onClick?: (id: string, entityName: string) => void;
}

const Card: React.FC<ICardProps> = ({ title, subtitle, icon, backgroundColor, color, width, id, entityName, onClick }) => {
    const clickCallback = () => {
        onClick?.(id, entityName);
    }
    return (
        <div className="container" onClick={clickCallback}>
        <div className="card" style={{backgroundColor: backgroundColor ?? "transparent", color: color ?? "black", width: width ? `${width}px` : "200px" }}>
            <div className="cardIcon">
                <Icon iconName={icon} ></Icon>
            </div>
            <div className="cardText" style={{display: "grid"}}>                
                <label className="title" title={title}>{title}&nbsp;</label>
                <label title={subtitle}>{subtitle}&nbsp;</label>
            </div>            
            
            
        </div>
        </div>
    );
};

export default Card;

//Org
//OpenFolderHorizontal
//#AF7AC5
//#F39C12