<template>
    <form class="simpleapp-form" onsubmit="return false">
        <slot name="header"><h3>{{ title }}</h3></slot>
        <slot  name="default" :data="document.getData()" :getField="getField"></slot>
    </form>
</template>
<script setup lang="ts" >
import type {SimpleAppFieldSetting} from '../type'    
import {SimpleAppClient} from '../SimpleAppClient'
import type { JSONSchema7,JSONSchema7Definition } from 'json-schema';

    const props = defineProps<{
        title?:string,
        document: SimpleAppClient<any,any>
        readonly?:boolean
    }>()
    if(!props.document){
        throw "undefine SimpleAppForm property 'document'"
    }
    // const obj = {schema:props.schema,data: props.schema}
    const getField = (path:string)=>{
        // console.log("simpleform topath",path)
        const data = props.document.getData()
        const schema = props.document.getSchema()
        const fieldsetting = getPathObject(schema,path)
        // console.log("setting",fieldsetting)
        
        
        return {
            path: path,
            instancepath: getInstancePath(schema,path),
            fieldsetting: fieldsetting,
            modelObject: data,
            document: props.document,
            apiObj:props.document.getApi(),
            modelField: 'email',
            isrequired: getIsRequired(schema,path),
            errors: props.document.getErrors(),
            readonly: props.readonly
        } as SimpleAppFieldSetting
    }

    //    "schemaPath": "#/properties/email/format",

    const getModelValue=(data:any,path:string)=>{

    }
    const getIsRequired=(schema:any,path:string)=>{
        if(!path){
            console.error('unknown path')
            return 'xx'
        }

        try{
            let paths = path.replace('#/','').split('/')
            const fieldname = paths[paths.length-1]
            paths = paths.slice(0, -2);    
            let tmp = schema
            for(let i=0;i<paths.length;i++){
                tmp = tmp[paths[i]]
                
            }
            if(Array.isArray(tmp['required'])   ) {
                    const arr:string[] = tmp['required']
                    return arr.includes (fieldname)
                }else{
                    return false
                }

            // console.log("get instance path",instancepath)
            
            // return tmp
        }catch(err:any){
            console.error(err.message)
        }
    }
   const getInstancePath=(schema:any,path:string)=>{
    if(!path){
        console.error('unknown path')
        return 'yy'
    }
    try{
        let paths = path.replace('#/','').split('/')    
        let tmp = schema
        let instancepath=''
        for(let i=0;i<paths.length;i++){
            tmp = tmp[paths[i]]
            if(tmp['type'] && paths[i] !='items'){
                instancepath=instancepath+'/'+paths[i]
            }
        }

        // console.log("get instance path",instancepath)
        return instancepath
        // return tmp
    }catch(err:any){
        console.error(err.message)
    }


    // let paths = path.replace('#/','').split('/')    
    // return '/'+paths[1]
   }
   const getPathObject=(schema:JSONSchema7,path:string):JSONSchema7|undefined=>{
    // console.log("path",path)
    if(!path){
        console.error('unknown path')
        return undefined
    }
    try{
        let paths:string[] = path.replace('#/','').split('/')    
        let tmp :JSONSchema7Definition= schema
        // console.log(path)
        for(let i=0;i<paths.length;i++){
            
            //silly code, but it seems require to avoid typescript complaint.
            //ultimately it is to obtain result as "tmp=tmp[path[i]]"
            const key1 = paths[i] as keyof JSONSchema7
            let jsonkey: keyof JSONSchema7 = key1
            let obj:JSONSchema7 = {} as JSONSchema7
            Object.assign(obj,tmp[jsonkey])
            tmp = {...obj}            
        }
        // console.log('final ',path,tmp)
        return tmp
    }catch(err:any){
        console.error(err.message)
        
    }    
   }
</script>