export interface IHierarchyRecord {
    id: string;
    title: string;
    subtitle: string;   
    parentId: string;
    entityName : string;
    //isGroup: x.isRoot && x.isRoot == "1",
    children: IHierarchyRecord[];
}

export interface ISpecialStyle {
    icon: string;
    backgroundColor: string; 
    color: string;
}