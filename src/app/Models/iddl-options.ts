export interface IddlOptions {
    uniqueKey?: any,
    isMultiValued ?:boolean,
    isSearchable?:boolean,
    isResettable?:boolean,
    items:{}[] | string[],


}

export interface Iitems{
    id:number,
    name:string
}