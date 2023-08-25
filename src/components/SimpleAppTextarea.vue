
<template>
    <FieldContainer :refto="id" :label="label" :description="description" :setting="setting" :error="error">
        <Textarea class="input-component" 
            v-model="inputvalue"    
            @change="onchange"
            v-bind="$attrs"
         ></Textarea>         
    </FieldContainer>
</template>
<script lang="ts" setup>
import {computed,watch,ref} from 'vue'
import Textarea from 'primevue/textarea';
import FieldContainer from './SimpleFieldContainer.vue'
const props = defineProps<{
    label?:string,
    id?:string,
    description?:string,
    modelValue?:string,
    setting?:any,
    error?:string
}>()
const inputvalue = ref(props.modelValue)
const emits = defineEmits(['update:modelValue'])
const onchange=(e:any)=>{    
    emits('update:modelValue',e.target.value)
}
</script>