<template>
    <DataTable v-bind="$attrs" class="simpleapp-datatable" :value="valueModel">
        <Column v-for="(col,index) in columns" :field="col" :header="col"></Column>            
    </DataTable>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const props = defineProps<{columns:string[],setting:any}>()
const valueModel = defineModel<Object[]>()
</script>