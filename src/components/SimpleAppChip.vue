
<template>
    <FieldContainer :refto="id" :label="label" :description="description" :setting="setting" :error="error">
        <Chips class="input-component flex flex-row justify-stretch" 
            v-model="inputvalue"    
            
            @update:model-value="onchange"
            v-bind="$attrs"
         ></Chips>         
    </FieldContainer>
</template>
<script lang="ts" setup>
import {computed,watch,ref} from 'vue'
import Chips from 'primevue/chips';
import FieldContainer from './SimpleFieldContainer.vue'
const props = defineProps<{
    label?:string,
    id?:string,
    description?:string,
    modelValue?:string[],
    setting?:any,
    error?:string
}>()
const inputvalue = ref(props.modelValue)
const emits = defineEmits(['update:modelValue'])
const onchange=(data:string[])=>{    
    let set = [...new Set(data)];
    inputvalue.value=set
    emits('update:modelValue',set)
}
watch(props ,(after,before)=>{
    inputvalue.value=after.modelValue
})
</script>