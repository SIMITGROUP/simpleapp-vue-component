<template>
    <DataTable v-bind="$attrs" class="simpleapp-datatable editable-cells-table " :value="modelValue" 
    
    >
        <Column v-for="(col,index) in columns" :field="col.field" :style="col.style" :header="camelCaseToWords(col.title??'')">            
            <template #body="{ data, field,index }">                                
                <SimpleAppDynamicInput v-if="modelValue" :instancepath="getInstancePath(index,field)" :setting="getChildFieldSetting(field)" v-model="modelValue[index][field]" :getAutocomplete="getAutocomplete" :hidelabel="true" />                
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
const props = defineProps<{columns:InputTableColumn[],setting:any,getField:Function,getAutocomplete:Function}>()


//{path: '#/properties/details', instancepath: '/details', fieldsetting: {…}, modelObject: Proxy(Object), apiObj: INVApi, …}
const modelValue = defineModel()
    
const fieldsetting = props.setting.fieldsetting
const columns = ref(props.columns)
for(let i=0;i<props.columns.length;i++){
    if(columns.value[i].title ===undefined){
        columns.value[i].title=columns.value[i].field
    }
}
const afterEdit=(a:any)=>{
    console.log("After edit",a)
}
const getChildFieldSetting=(field:string)=>{
    return props.getField(`${props.setting.path}/items/properties/${field}`)
}
const getInstancePath=(index:number,field:string)=>{
    return `${props.setting.instancepath}/${index}/${field}`
}
/** 
 * 1. support array with field to label
 * 2. auto add edit button
 * 3. option readonly or not readonly
 * 4. 
 */

</script>
