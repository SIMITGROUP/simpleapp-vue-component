<template>
    <FieldContainer v-bind="$attrs" :label="label" :description="description" :setting="setting" :instancepath="instancepath" :error="error" #default="slotprops">        
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
    </FieldContainer>
</template>
<script lang="ts" setup>

import {computed,watch,ref} from 'vue'
import AutoComplete from 'primevue/autocomplete';
import FieldContainer from './SimpleFieldContainer.vue'
import {prepareList} from '../helper'
import type {SimpleAppFieldSetting,ListOptionType} from '../type'
import type { JSONSchema7 } from 'json-schema';
type autocompletetype={[key:string]:any}
const props = defineProps<{
    label?:string,    
    description?:string,
    error?:string,
    setting:SimpleAppFieldSetting,
    instancepath?:string
    optionLabel:string
}>()
const modelValue = defineModel<autocompletetype>()
const labelfield = props.optionLabel
let tmp:autocompletetype={} 
Object.assign(tmp,modelValue.value)
const selecteditem=ref(tmp)

if(!selecteditem.value[labelfield]){    
    selecteditem.value[labelfield]=''
}



watch(modelValue,(newvalue:autocompletetype)=>{
    selecteditem.value=newvalue
    if(typeof newvalue[props.optionLabel] == 'undefined'){
        selecteditem.value[props.optionLabel]=''
    }
})

if(props.setting.fieldsetting && props.setting.fieldsetting.format){    
    const formatarr=props.setting.fieldsetting.format.split(':')    
}


const pickValue = (event:any)=>{
    console.log("pick value",event.value)
    if(typeof event.value.query == 'undefined'){
        modelValue.value=event.value
    }
}

const onblur = ()=>{
    selecteditem.value={...modelValue.value}
    console.log(selecteditem.value)
    if(typeof selecteditem.value[labelfield]=='undefined'){
        selecteditem.value[labelfield]=''
    }
    // console.log("selecteditem.value",selecteditem.value)
}
</script>