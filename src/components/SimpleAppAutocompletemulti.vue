<template>
    <FieldContainer v-bind="$attrs" v-model="modelValue" :label="label" :description="description" :setting="setting" :instancepath="instancepath" :error="error" #default="slotprops">        
        <AutoComplete         
        class="simpleapp-inputfield"
        :inputId="slotprops.uuid"   
        v-model="selecteditem"
        v-bind="$attrs"        
        @item-unselect="deleteValue"
        :path="setting.instancepath"   
        @blur="onblur"
        @item-select="pickValue"
        forceSelection
        multiple
        
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

const props = defineProps<{
    label?:string,    
    description?:string,
    error?:string,
    setting:SimpleAppFieldSetting,
    instancepath?:string,        
    displayText?:string
}>()
const modelValue = defineModel<any[]>()
const selecteditem=ref(modelValue.value)

if(props.setting.fieldsetting && props.setting.fieldsetting.format){    
    const formatarr=props.setting.fieldsetting.format.split(':')    
}
watch(modelValue,(newvalue)=>selecteditem.value=newvalue)
const deleteValue = (event:any)=>{
    modelValue.value = selecteditem.value
    console.log(selecteditem.value)
    // if(typeof event.value.query == 'undefined' && typeof modelValue.value != 'undefined'){

    //     for(let i=0;i< modelValue.value.length;i++){
    //         if(event.value.ic == modelValue.value[i].ic){
                
    //             // modelValue.value =
    //             modelValue.value.slice(i,0)
    //             //  delete modelValue.value[i]
    //             // console.log("sliced ",slicedvalue)
    //             console.log("Delete item ",i, event.value,modelValue.value)
    //         }
    //     }
    // }
}

const pickValue = (event:any)=>{
    if(typeof modelValue.value == 'undefined'){
        modelValue.value=[]        
    }
    if(typeof event.value.query == 'undefined'){        
        modelValue.value.push(event.value)
        console.log("pick value",modelValue.value)
    }
}

const onblur = ()=>{
    selecteditem.value=modelValue.value
}
</script>