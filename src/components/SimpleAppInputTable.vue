<template>
    <DataTable v-bind="$attrs" stripedRows class="simpleapp-datatable editable-cells-table " :value="modelValue">
    <template #empty> <div class="text-center">No record found.</div> </template>
    <template #header >
        <div>
            <button icon="pi pi-plus" @click="addNew()" class="simpleapp-datatable-add" type="button">Add</button>
        </div>
    </template>
        <Column v-for="(col,index) in columns" :field="col.field" :style="col.style" :header="camelCaseToWords(col.title??'')">            
            <template #body="{ data, field,index }">                                
                <SimpleAppDynamicInput v-if="modelValue" :instancepath="getInstancePath(index,field)" :setting="getChildFieldSetting(field)" v-model="modelValue[index][field]" :getAutocomplete="getAutocomplete" :hidelabel="true" />                
            </template>
        </Column>
        <Column v-if="!readonly">
            <template #body="{data,field,index}">
                <button class="simpleapp-inputtable-delrow button-danger" @click="deleteRow(index)" type="button">X</button>
            </template>
        </Column>
    </DataTable>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {camelCaseToWords} from '../helper'
import type {InputTableColumn} from '../type'
const props = defineProps<{
    columns:InputTableColumn[],
    setting:any,
    getField:Function,
    getAutocomplete:Function, readonly?:boolean
}>()


//{path: '#/properties/details', instancepath: '/details', fieldsetting: {…}, modelObject: Proxy(Object), apiObj: INVApi, …}
const modelValue = defineModel<any[]>()
    
    
const fieldsetting = props.setting.fieldsetting

const readonly = ref(false)
if(props.setting.readonly!==undefined ){
    readonly.value = props.setting.readonly
}
if(props.readonly!==undefined ){
    readonly.value = props.readonly
}
const columns = ref(props.columns)
for(let i=0;i<props.columns.length;i++){
    if(columns.value[i].title ===undefined){
        columns.value[i].title=columns.value[i].field
    }
}
const getChildFieldSetting=(field:string)=>{
    return props.getField(`${props.setting.path}/items/properties/${field}`)
}
const getInstancePath=(index:number,field:string)=>{
    return `${props.setting.instancepath}/${index}/${field}`
}

const deleteRow=(index: number)=>{
    if(modelValue.value){
        modelValue.value.splice(index,1)
    }    
}
const addNew = () => {
    const field = props.setting.path.split('/').at(-1)    
    props.setting.document[`add${field}`]()
}
/** 
 * 1. support array with field to label
 * 2. auto add edit button
 * 3. option readonly or not readonly
 * 4. 
 */

</script>
