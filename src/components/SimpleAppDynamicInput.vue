<script setup lang="ts">
import type {SimpleAppFieldSetting} from '../type';
import SimpleAppAutocomplete from './SimpleAppAutocomplete.vue';
import SimpleAppText from './SimpleAppText.vue';
import SimpleAppSelect from './SimpleAppSelect.vue';
import type {JSONSchema7} from 'json-schema'
import {watch} from 'vue'
import SimpleAppTextarea from './SimpleAppTextarea.vue';

const props = defineProps<{setting:SimpleAppFieldSetting, getAutocomplete:Function}>()
interface customSchema extends JSONSchema7  {
    'x-foreignkey'?:string
}

// by right use 'customSchema', but been force to use any for avoid some error
const f:any = props.setting.fieldsetting
const modelValue = defineModel()
</script>
<template>    
    <SimpleAppAutocomplete v-if="f['x-foreignkey']" v-model="modelValue" :setting="props.setting" :hidelabel="true" :remote-src="getAutocomplete(f['x-foreignkey'])" optionLabel="label"/>
    <SimpleAppNumber v-else-if="f.type=='number' || f.type=='integer'" v-model="modelValue" :setting="props.setting"  :hidelabel="true"></SimpleAppNumber>
    <SimpleAppSelect v-else-if="f.enum" v-model="modelValue" :setting="props.setting"  :hidelabel="true"></SimpleAppSelect>
    <SimpleAppChip v-else-if="f.type=='array' && f.items && f.items.type=='string'" v-model="modelValue" :setting="props.setting"  :hidelabel="true"></SimpleAppChip>
    <SimpleAppTextarea v-else-if="f.type=='string' && f.format=='x-text'" v-model="modelValue" :setting="props.setting"  :hidelabel="true"></SimpleAppTextarea>
    <SimpleAppText v-else-if="f.type=='string' && f.format" :type="f.format" v-model="modelValue" :setting="props.setting"  :hidelabel="true"></SimpleAppText>
    <SimpleAppText v-else v-model="modelValue" :setting="props.setting"  :hidelabel="true"></SimpleAppText>
</template>