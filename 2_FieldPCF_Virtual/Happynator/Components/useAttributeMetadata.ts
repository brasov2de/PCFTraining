import * as React from "react";
import { IInputs } from "../generated/ManifestTypes";

const useAttributeMetadata = (context: ComponentFramework.Context<IInputs>, tableName: string, columnName: string) => {
    const [attributeMetadata, setAttributeMetadata] = React.useState<any>();
    React.useEffect(() => {
        context.utils.getEntityMetadata(tableName, [columnName]).then((metadata) => {
            setAttributeMetadata(metadata);
        });
    }, [context, tableName, columnName]);

    return {attributeMetadata};
}