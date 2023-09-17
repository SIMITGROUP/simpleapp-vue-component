<template>
    <DataTable v-bind="$attrs" class="simpleapp-datatable" :value="valueModel">
        <Column v-for="(col,index) in columns" :field="col" :header="camelCaseToWords(col)"></Column>            
    </DataTable>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {camelCaseToWords} from '../helper'
const props = defineProps<{columns:string[]}>()
const valueModel = defineModel<Object[]>()


</script>