import type { JSONSchema7,JSONSchema7Definition } from 'json-schema';
export type ListOptionType = {
    value?: string
    label?: string
}
export type SimpleAppFieldSetting= {
    path: string,
    instancepath: string,
    fieldsetting:JSONSchema7,
    modelObject: any,
    modelField: string,
    isrequired: boolean,
    // errors: props.document.getErrors()
}
// x.fieldsetting.pro