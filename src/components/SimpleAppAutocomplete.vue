<template>
    <FieldContainer v-bind="$attrs" :label="label" :description="description" :setting="setting" :instancepath="instancepath" :error="error" #default="slotprops">        
       
        <div v-if="listApi">
            listapi
        <AutoComplete  
        class="simpleapp-inputfield"
        :inputId="slotprops.uuid"   
        v-model="selecteditem"
        v-bind="$attrs"        
        :optionLabel="optionLabel"
        :path="setting.instancepath"   
        @blur="onblur"
        @item-select="pickValue"
        @complete="getListFromAutocompleteApi"
        :suggestions="list"
        forceSelection
        dropdown
          /> 
        </div>
        
        <div v-else    >
            no listapi
        <AutoComplete 
        class="simpleapp-inputfield"
        :inputId="slotprops.uuid"   
        v-model="selecteditem"
        v-bind="$attrs"        
        :optionLabel="optionLabel"
        :path="setting.instancepath"   
        @blur="onblur"
        @item-select="pickValue"
        forceSelection
        dropdown
          />      
        </div>    
    </FieldContainer>
</template>
<script lang="ts" setup>

import {computed,watch,ref} from 'vue'
import AutoComplete from 'primevue/autocomplete';
import FieldContainer from './SimpleFieldContainer.vue'
import {prepareList} from '../helper'
import type {SimpleAppFieldSetting,ListOptionType} from '../type'
import {SimpleAppClient} from '../SimpleAppClient'
import type { JSONSchema7 } from 'json-schema';
type autocompletetype={[key:string]:any}
const props = defineProps<{
    label?:string,    
    description?:string,
    error?:string,
    setting:SimpleAppFieldSetting,
    instancepath?:string
    optionLabel:string,
    listApi?: any,
}>()
const modelValue = defineModel<autocompletetype>()
const labelfield = props.optionLabel
const list = ref()
let tmp:autocompletetype={} 
Object.assign(tmp,modelValue.value)
const selecteditem=ref(tmp)

if(!selecteditem.value[labelfield]){    
    selecteditem.value[labelfield]=''
}
const getListFromAutocompleteApi = ((event:any)=>{    
    const keyword = event.query??''  
    console.log(event)
    if(props.listApi){
        props.listApi.autoComplete(keyword).then((res:any)=>{
            list.value = res.data       
        })    
    }
})

console.log("props.listApi",props.listApi)
watch(modelValue,(newvalue:autocompletetype)=>{
    selecteditem.value=newvalue
    if(typeof newvalue[props.optionLabel] == 'undefined'){
        selecteditem.value[props.optionLabel]=''
    }
})

if(props.setting.fieldsetting && props.setting.fieldsetting.format){
    console.log("Format:",props.instancepath,props.setting)   
    const pathitems = props.setting.path.split('/')
    const fieldname = pathitems[pathitems.length-1]
    
}


const pickValue = (event:any)=>{
    if(typeof event.value.query == 'undefined'){
        modelValue.value=event.value
    }
}

const onblur = ()=>{
    selecteditem.value={...modelValue.value}
    if(typeof selecteditem.value[labelfield]=='undefined'){
        selecteditem.value[labelfield]=''
    }
    // console.log("selecteditem.value",selecteditem.value)
}
</script>