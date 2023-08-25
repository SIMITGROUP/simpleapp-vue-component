
<template>
    <FieldContainer :refto="id" :label="label" :description="description"  :setting="setting" :instancepath="instancepath" :error="error">
        <InputNumber class="input-component" :inputId="id"
            v-model="inputvalue"    
            @input="onInput"
            @update:modelValue="inputvalue = $event"
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
    id?:string,
    description?:string,
    modelValue?:number,
    setting:any
    error?:string,
    instancepath?:string,
}>()
const inputvalue = ref(props.modelValue)
watch(props ,(after,before)=>{
    inputvalue.value=after.modelValue
})
const emits = defineEmits(['update:modelValue'])
const onInput=(e:any)=>{    
    inputvalue.value=e.value
    emits('update:modelValue',e.value)
}
</script>