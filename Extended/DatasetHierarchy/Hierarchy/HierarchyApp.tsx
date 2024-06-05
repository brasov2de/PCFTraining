import * as React from 'react';
import {Tree, TreeNode} from 'react-organizational-chart';
import { IHierarchyRecord, ISpecialStyle } from './Types';
import Card from './Card';

export interface IHierarchyAppProps {   
    //navigation: ComponentFramework.Navigation;
    dataset: ComponentFramework.PropertyTypes.DataSet;    
    parentEntityId: string;    
    allocatedWidth: number;
    icon?:string;    
    backgroundColor?: string;    
    color?: string;    
    cardWidth: number;
}

const fallbackStyles = {
    icon: "OpenFolderHorizontal",
    backgroundColor: "transparent",
    color : "black"
}

export const HierarchyApp = ({dataset, 
            parentEntityId,  
            allocatedWidth, icon, backgroundColor, color, cardWidth}: IHierarchyAppProps) : React.JSX.Element  => {
    const width = allocatedWidth ? `${allocatedWidth}px` : "100%";    
    const entityName = dataset.getTargetEntityType();
    const [root, setRoot] = React.useState<IHierarchyRecord>({
        id: parentEntityId,
        title: "",
        subtitle: "",
        entityName: entityName, 
        parentId: "",
        children: []
    })

    React.useEffect(() => {
        if(dataset.filtering.getFilter()==null && parentEntityId!=null) {                    
            dataset.filtering.clearFilter();

            dataset.filtering.setFilter({filterOperator: 0, conditions: [{
                conditionOperator: 76 //under
                , attributeName: `${dataset.getTargetEntityType()}id`, 
                value: parentEntityId}]});                                                       
            dataset.refresh();                  
        }
        else{
            if(!dataset.loading){
                const recs = createRecordsMap(dataset.sortedRecordIds, dataset.records, entityName);
                arrayToHierarchy(root, "lookupToParent", recs, ["title", "subtitle"], entityName);
                setRoot({...root});
            }
        }            
    }, [dataset, parentEntityId]);

    const sStyle =  {icon: icon ?? "OpenFolderHorizontal", backgroundColor: backgroundColor ?? "transparent", color: color ?? "black"}  ?? fallbackStyles;    

/*    const clickCallback = (id: string, entityName: string) => {
       navigation.openForm({entityName: entityName, entityId: id, openInNewWindow: true, width: allocatedWidth ?? 1000, windowPosition: 1});       
    }
    */

    function renderReccursive(node : IHierarchyRecord) : React.JSX.Element {
        return (<TreeNode 
                    label={<Card 
                            title={node?.title ?? ""} 
                            subtitle={node?.subtitle ?? ""} 
                            icon={sStyle.icon}
                            backgroundColor={sStyle.backgroundColor}
                            color={sStyle.color}
                            width={cardWidth}
                            id={node.id}
                            entityName={node.entityName}
                           // onClick={clickCallback}
                            ></Card>} >
                    {
                    node.children.map((child : IHierarchyRecord) => {
                        return renderReccursive(child);
                        })
                    }                       
                </TreeNode>
        )
    }

    return (
       <div className='Dianamics_Hierarchy' style={{width: width}}>
        <Tree label={<Card 
                title={root?.title ?? ""} 
                subtitle={root?.subtitle ?? ""} 
                icon={sStyle?.icon}
                backgroundColor={sStyle?.backgroundColor}
                color={sStyle?.color}
                id={parentEntityId}
                entityName={entityName}
                width={cardWidth}
                ></Card>}   
        lineWidth={'2px'}
        lineColor={sStyle?.color}
        lineHeight="50px"               
        lineBorderRadius={'10px'}>
            {
                root && dataset.loading===false && dataset.filtering!=null
                ? root.children.map((child : IHierarchyRecord) => {
                    const specialStyles = sStyle ?? fallbackStyles;
                    return renderReccursive(child);
                })
                : null
            }
        </Tree>
        </div>
    );
};


function arrayToHierarchy(currentElement : IHierarchyRecord,  lookupHierarchy: string, allChilds: ComponentFramework.WebApi.Entity[], attributeNames: string[], entityName: string): void{
    currentElement.children = allChilds
            .filter((x) => x["parentId"] == currentElement.id)
            .map((x) => {
                return {
                    id: x.id,
                    title: x.title,
                    subtitle: x.subtitle,
                    parentId: x["parentId"] ?? "",
                    entityName: entityName,
                    children: []
                }
            });
    currentElement.children.forEach((x: IHierarchyRecord) => {
        arrayToHierarchy(x, lookupHierarchy, allChilds, attributeNames, entityName);
    });
}


function createRecordsMap(sortedRecordsIds: string[], records: { [id: string]: ComponentFramework.WebApi.Entity }, entityName: string): IHierarchyRecord[] {
    return sortedRecordsIds.map((id) => {           
        const x = records[id];
        return {
            id: x.getRecordId(),
            title: x[`title`],
            subtitle: x[`subtitle`],            
            parentId: x[`lookupToParent`]?.id?.guid ?? "",
            entityName : entityName,           
            children: []
        }
    });
}