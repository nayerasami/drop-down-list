export interface IddlOptions {
    uniqueKey?: keyof Iitems| string,
    isMultiValued ?:boolean,
    isSearchabl?:boolean,
    isResettable?:boolean,
    // items:any[],


}

export interface Iitems {
id:number,
name:string

}
