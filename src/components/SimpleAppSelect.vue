
<template>
    <FieldContainer v-bind="$attrs" v-model="modelValue" :label="label" :description="description" :setting="setting" :instancepath="instancepath" :error="error" #default="slotprops">        
        <Dropdown v-model="modelValue" 
        class="simpleapp-inputfield"
        :inputId="slotprops.uuid"   
        v-bind="$attrs"
        optionValue="value"
        optionLabel="label"
        :path="setting.instancepath"
        :options="options"
          />        
    </FieldContainer>
</template>
<script lang="ts" setup>
import {computed,watch,ref} from 'vue'
import Dropdown from 'primevue/dropdown';
import FieldContainer from './SimpleFieldContainer.vue'
import {prepareList,simpleArrayToObject} from '../helper'
import type {ListOptionType} from '../type'
import type { JSONSchema7 } from 'json-schema';
const modelValue = defineModel()
const props = defineProps<{
    label?:string,    
    description?:string,
    error?:string,
    setting:any,
    optionLabel?:string,
    optionValue?:string,
    instancepath?:string,
    options?:any[]
}>()

const optionValue = props.optionValue ?? 'value' 
const optionLabel  = props.optionLabel ?? 'label' 
const options = prepareList('oneOf',props.setting.fieldsetting,optionLabel,optionValue,props.options,)

</script>