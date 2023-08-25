<template>
    <div v-if="schema" class="field-container flex-1">
        <label :for="uuid">{{ fieldlabel }} <span v-if="props.setting.isrequired && fieldlabel" class="text-red-600">*</span></label>
        <slot name="default" :uuid="uuid"></slot>
        <small v-if="error" class="input-error">{{ error }}</small>
        <small v-else >{{ fielddesc }}</small>
    </div>
    <div v-else class="field-container flex-1">
        <label class="text-red-600">wrong path in getField()</label>
        <div class="text-red-600">{{ props.setting.path }}</div>
    </div>
</template>
<script setup lang="ts">
import {computed,watch} from 'vue'
import {v4 as uuidv4} from 'uuid';
import {ref} from 'vue'
const uuid =  uuidv4();
const fieldlabel = ref('')
const fielddesc = ref('')
let instancepath = ref('')
const props = defineProps<{
    label?: string,
    refto?: string,
    description?: string,
    instancepath?:string,
    // error?:string,
    setting:any
}>()

// console.log('props.setting',props.setting.fieldsetting)
let schema:any 
if(props.setting.fieldsetting && props.setting.fieldsetting.type){
    
    schema = props.setting.fieldsetting
    // console.log("schema setting",props.setting,schema)
    if(props?.instancepath) instancepath.value =props.instancepath
    else if(props.setting?.instancepath) instancepath.value = props.setting.instancepath
    else instancepath.value='/unknown'


    if(props.label)fieldlabel.value = props.label 
    else if (schema.title ) fieldlabel.value=schema.title
    else fieldlabel.value=instancepath.value
    
    if(props.description)fielddesc.value = props.description 
    else if (schema?.description != 'undefined') fielddesc.value=schema.description
    else fielddesc.value=''

   

}
const errormsg = computed(()=>{
    
    props.setting.errors[instancepath.value]
})
const error = ref("")
watch(props.setting.errors,(newvalue,oldvalue)=>{
    //it is array
    if(newvalue[instancepath.value]){
        const errlist:any[] = newvalue[instancepath.value]
        for(let i=0;i<errlist.length;i++){
            error.value += errlist[i].message +','
        }
        
    }else{
        error.value=''
    }
    // console.log("validation result",props.setting.instancepath,)
    // error.value = newvalue[props.setting.instancepath].message
})

</script>