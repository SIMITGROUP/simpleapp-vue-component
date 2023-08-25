
<template>
    <FieldContainer :refto="id" :label="label" :description="description" :setting="setting" :error="error" :instancepath="instancepath">
        <Listbox class="input-component" 
            v-model="inputvalue"            
            v-bind="$attrs"
            :options="alloptions"
            @change="onchange"
            optionLabel="name"
            multiple
         ></Listbox>         
    </FieldContainer>
</template>
<script lang="ts" setup>
import {computed,watch,ref} from 'vue'
import Listbox from 'primevue/listbox';
import FieldContainer from './SimpleFieldContainer.vue'
const props = defineProps<{
    label?:string,
    id?:string,
    description?:string,
    modelValue?:string[],
    setting?:any,
    instancepath:string,
    error?:string
}>()
const inputvalue = ref(props.modelValue)
const alloptions = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);


const emits = defineEmits(['update:modelValue'])
const onchange=(e:any)=>{    
    let selected:string[]=[]
    for(let i=0; i<e.value.length;i++){
        selected.push(e.value[i].code)
    }
    emits('update:modelValue',selected)
}
</script>