
<template>
    <FieldContainer v-bind="$attrs" :label="label" :description="description"  :setting="setting" :instancepath="instancepath" :error="error" #default="slotprops">
        <InputNumber class="simpleapp-inputfield" 
            :inputId="slotprops.uuid"
            v-model="modelValue"    
            :path="setting.instancepath"
            v-bind="$attrs"
         ></InputNumber>
    </FieldContainer>
</template>
<script lang="ts" setup>
import {computed,watch,ref} from 'vue'
import InputNumber from 'primevue/inputnumber';
import FieldContainer from './SimpleFieldContainer.vue'
const props = defineProps<{
    label?:string,
    description?:string,
    setting:any
    error?:string,
    instancepath?:string,
}>()
const modelValue =defineModel()
</script>
