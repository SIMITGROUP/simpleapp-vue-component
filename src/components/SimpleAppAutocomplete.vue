<template>
  <FieldContainer v-bind="$attrs" v-model="modelValue" :label="label" :description="description" :setting="setting" :instancepath="instancepath" :error="error" #default="slotprops">        
     
  <div v-if="componentErr!=''" class="input-error">{{componentErr}}</div>
  <AutoComplete v-else
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
      
        />       
        
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
import * as openapi from '../server/openapi'

type autocompletetype={[key:string]:any}

const props = defineProps<{
  label?:string,    
  description?:string,
  error?:string,
  setting:SimpleAppFieldSetting,
  instancepath?:string
  optionLabel:string,    
  remoteSrc?:any
}>()
interface typefieldsetting extends JSONSchema7 {
  'x-foreignkey'?:string
}
const modelValue = defineModel<autocompletetype>()
const labelfield = props.optionLabel
const list = ref()
const componentErr = ref('')
let tmp:autocompletetype={} 
const fieldsetting:typefieldsetting  = props.setting.fieldsetting 

Object.assign(tmp,modelValue.value)
const selecteditem=ref(tmp)

if(!selecteditem.value[labelfield]){    
  selecteditem.value[labelfield]=''
}

const getListFromAutocompleteApi =  (event:any)=>{    
  const keyword = event.query??''  
  const remoteSrc =  props.remoteSrc
  remoteSrc.autoComplete(keyword).then((res:any)=>{
          list.value = res.data                   
      }).catch((res:any)=>{
          console.error(res)
      })
}

watch(modelValue,(newvalue:autocompletetype)=>{
  selecteditem.value=newvalue
  if(typeof newvalue[props.optionLabel] == 'undefined'){
      selecteditem.value[props.optionLabel]=''
  }
})

if(fieldsetting['x-foreignkey'] == 'undefined'){
  componentErr.value='undefine "x-foreignkey" of this field in jsonschema'
}else if( !props['remoteSrc'] || !props['remoteSrc']['autoComplete']){
  componentErr.value='invalid property "remoteSrc" cause props.remoteSrc.autoComplete(keyword:string) does not exists)'
}else{
  componentErr.value=''
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
const capitalizeFirstLetter = (str: string) => {
  const res = str == '' ? '' : str.slice(0, 1).toUpperCase() + str.slice(1);
  // const res = str;
  return res;
};
</script>