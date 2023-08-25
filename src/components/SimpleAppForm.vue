<template>
    <slot name="header"><h3>{{ title }}</h3></slot>
    <slot  name="default" :getField="getField"></slot>
</template>
<script setup lang="ts">
import {computed,watch,ref} from 'vue'
import {SimpleAppClient} from '@simitgroup/simpleapp-client'

    const props = defineProps<{
        title?:string,
        schema:any,
        data:any,
        document:SimpleAppClient<any,any>
    }>()
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
            modelField: 'email',
            isrequired: getIsRequired(schema,path),
            errors: props.document.getErrors()
        }
    }
//    "schemaPath": "#/properties/email/format",

    const getModelValue=(data:any,path:string)=>{

    }
    const getIsRequired=(schema:any,path:string)=>{
        let paths = path.replace('#/','').split('/')
        const fieldname = paths[paths.length-1]
        paths = paths.slice(0, -2);    
        let tmp = schema

        try{
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
    let paths = path.replace('#/','').split('/')    
    let tmp = schema
    let instancepath=''
    try{
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
   const getPathObject=(schema:any,path:string)=>{
    let paths = path.replace('#/','').split('/')    
    let tmp = schema
    // console.log("path",path)
    try{
        for(let i=0;i<paths.length;i++){
            tmp = tmp[paths[i]]
            // console.log(i,tmp)
        }
        // console.log('final ',path,tmp)

        return tmp
    }catch(err:any){
        console.error(err.message)
    }    
   }
</script>