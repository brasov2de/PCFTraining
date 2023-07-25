/* eslint-disable react/display-name */
import * as React from 'react';
import {Icon} from '@fluentui/react/lib/Icon';
import { Label } from '@fluentui/react/lib/Label';
import {mergeStyles} from '@fluentui/react/lib/Styling';

const iconContainerClass = mergeStyles({
    width: "100px",
    height: "40px",
    display: "inline-flex",
    flexWrap: "nowrap",
    justifyContent: "flex-start", 
    alignItems: "baseline" , 
    cursor: "pointer", 
    border: "1px solid transparent"
}, {
    selectors: {
        ":hover": {
            borderColor: "lightGray"            
        }, 
        i: {
            fontSize: "20px", 
            marginTop: "3px"
        },
        label: {
            cursor: "pointer"      
        }
    }
})



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

export const IconToggle = React.memo(({iconOn, iconOff, colorOn, colorOff, labelOn, labelOff, value, onChange}: IIconToggleProps) => {
    const changeValue = React.useCallback(() => {
        onChange(!value);
    }, [value]);
    return (<div className={iconContainerClass} onClick={changeValue}>
        <div style={{width:"30px"}}>
            <Icon iconName={value ? iconOn : iconOff} style={{color: value ? colorOn : colorOff}} ></Icon>
        </div>
        <Label>{value===true ? labelOn : labelOff}</Label>
    </div>)
})
