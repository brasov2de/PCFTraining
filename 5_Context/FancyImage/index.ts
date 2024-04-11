import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class FancyImage implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private image : HTMLImageElement;
    private isZoomed : boolean = false;
    private context : ComponentFramework.Context<IInputs>;
    private pngImage : string |null = null;
    private svg: HTMLElement ;
    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    private getResourceImagePromise = (resourceName: string, fileType : string): Promise<string> => {
        return new Promise((resolve, reject) => {
            this.context.resources.getResource(resourceName, (fileContent : string)=> {
                resolve(`data:image/${fileType==="svg"?"svg+xml":fileType};base64,${fileContent}`);
            }, reject);
        });
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this.context = context;
       this.image = document.createElement("img");     
       context.mode.trackContainerResize(true);             
       this.getResourceImagePromise("Images/smiley.jpg", "jpg").then((resource) => {
           this.pngImage = resource;
       });
       this.image.onclick = () => {
            this.isZoomed = !this.isZoomed;
            context.mode.setFullScreen(this.isZoomed);
       }
       container.appendChild(this.image);

       this.svg = document.createElement("div");
       container.appendChild(this.svg);
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        console.log(context.updatedProperties);
        if(context.updatedProperties.includes("fullscreen_open")){
            this.isZoomed = true;
        }
        else if(context.updatedProperties.includes("fullscreen_close")){
            this.isZoomed = false;
        }
        if(context.parameters.image.raw==null || context.parameters.image.raw===""){
            this.image.src = this.pngImage ?? "";
            this.svg.style.display = "none";
            this.image.style.display = "block";
        }
        else{
            this.image.style.display = "none";
            this.svg.style.display = "block";            
            this.svg.innerHTML = context.parameters.image.raw;
            this.svg.style.setProperty("--svg-fill-hover", context.parameters.hoverColor.raw ?? "red");
            this.svg.style.setProperty("--svg-fill", context.parameters.color.raw ?? "blue");
        }
     
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
