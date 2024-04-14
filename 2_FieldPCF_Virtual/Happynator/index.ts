import { IIconToggleProps, IconToggle } from "./Components/IconToggle";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

import * as React from "react";

export class Happynator implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private value : boolean |undefined;

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        try{
            context.utils.getEntityMetadata("diana_pcftraining", ["diana_ishappy"]).then(console.log);
        }
        catch (error){            
            console.log(error);
        }
    }

    private onChange = (value ?: boolean) => {
        this.value = value;
        this.notifyOutputChanged();
    }


    //icons: https://developer.microsoft.com/en-us/fluentui#/styles/web/icons
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        console.log("Updated Properties", context.updatedProperties);
        const options = context.parameters.sampleProperty.attributes?.Options;
        const props: IIconToggleProps = { 
            colorOn : options?.[1].Color ?? "green", 
            colorOff : options?.[0].Color ?? "red", 
            labelOn : options?.[1].Label ?? "Happy",
            labelOff : options?.[0].Label ?? "Sad",
            iconOn : context.parameters.iconOn.raw ?? "Emoji2", 
            iconOff : context.parameters.iconOff.raw ?? "Sad", 
            value : context.parameters.sampleProperty.raw || false,
            onChange : this.onChange.bind(this) 
        };
        return React.createElement(
            IconToggle, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { 
            sampleProperty : this.value
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}


//FiddlerAutoresponder 
//REGEX:(.*?)(\/css)?(\/|cc_)Dianamics.Happynator.(?'path')
//2_FieldPCF_Virtual\out\controls\Happynator\$2\${path}
