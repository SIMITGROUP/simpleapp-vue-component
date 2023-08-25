
<template>
    <FieldContainer :refto="id" :label="label" :description="description" :setting="setting" :instancepath="instancepath" :error="error" #default="slotprops">
        <InputText class="input-component" 
            :id="slotprops.uuid"
            v-model="inputvalue"    
            @input="onchange"           
            v-bind="$attrs"
            :path="setting.instancepath"
         ></InputText>         
    </FieldContainer>
</template>
<script lang="ts" setup>
import {computed,watch,ref} from 'vue'
import InputText from 'primevue/inputtext';
import FieldContainer from './SimpleFieldContainer.vue'
const props = defineProps<{
    label?:string,
    id?:string,
    description?:string,
    modelValue?:string,
    error?:string,
    setting:any,
    instancepath?:string,
}>()
const inputvalue = ref(props.modelValue)

const emits = defineEmits(['update:modelValue'])
const onchange=(e:any)=>{    
    emits('update:modelValue',e.target.value)
}


watch(props ,(after,before)=>{
    // console.log("B4",before,"after",after)
    inputvalue.value=after.modelValue
})
</script>