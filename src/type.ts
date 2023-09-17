import type { JSONSchema7,JSONSchema7Definition } from 'json-schema';
export type ListOptionType = {
    value?: string
    label?: string
}
export enum InputTableColumnType  {
    'field'='field',
    'button'='button',
    'checkbox'='checkbox',
    'renderer'='renderer'
}
export type InputTableColumn={
    type:InputTableColumnType,
    title?:string
    field?:string
    renderer?:Function
    style?:string
    readonly?:boolean
}
export type SimpleAppFieldSetting= {
    path: string,
    instancepath: string,
    fieldsetting:JSONSchema7,
    modelObject: any,
    modelField: string,
    isrequired: boolean,
    readonly?:boolean
    // errors: props.document.getErrors()
}
// x.fieldsetting.pro