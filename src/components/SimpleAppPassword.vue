<template>
    <FieldContainer :refto="id" :label="label" :description="description" :schema="schema" :error="error">
       <InputText class="input-component" 
            v-model="inputvalue"    
            @input="onchange"           
            v-bind="$attrs"
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
    setting:any
}>()
const inputvalue = ref(props.modelValue)
const schema = ref(props.setting)
const label = props.setting.path

const emits = defineEmits(['update:modelValue'])
const onchange=(e:any)=>{    
    emits('update:modelValue',e.target.value)
}

watch(props ,(after,before)=>{
    inputvalue.value=after.modelValue
})
</script>