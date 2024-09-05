export interface IddlOptions {
    uniqueKey?: keyof any,
    isMultiValued ?:boolean,
    isSearchable?:boolean,
    isResettable?:boolean,
    // items:any[],
    showKey?:any,
    searchKey?:any,
    baseUrl?:string,
    limit?:number,
    page?:number
    validators? :any
    optionsArr?:Iitems[],
    label?:string,
    name?:string,
    defaultTitle?: string,
    multiSelectValidators?:any
    singleSelectValidators?:any
}

export interface Iitems {
id:number,
title:string,
code:string
}
